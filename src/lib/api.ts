import type {
  ApiError,
  Kpi,
  MediaItem,
  SolicitacaoAcesso,
  SolicitacaoResposta,
} from "./types";
import {
  getKpiBySlug,
  getMediaBySlug,
  kpis,
  mediaItems,
} from "./mock-data";

/* ============================================================
   CONFIGURAÇÃO
   ============================================================ */

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ??
  "/api";

const IS_DEV = import.meta.env.DEV;

/** Habilita dados mockados quando não há backend configurado. */
const USE_MOCKS = IS_DEV || !import.meta.env.VITE_API_URL;

/** Timeout padrão de requisição (10s). */
const REQUEST_TIMEOUT_MS = 10_000;

/* ============================================================
   EXCEÇÃO DE API
   ------------------------------------------------------------
   Estende Error e implementa ApiError (do types.ts).
   `status` é um campo OPCIONAL e PRÓPRIO desta classe —
   não faz parte do contrato ApiError.
   ============================================================ */

export class ApiException extends Error implements ApiError {
  readonly code: string;
  readonly details?: Record<string, unknown> | undefined;
  readonly status?: number | undefined;

  constructor(params: {
    code: string;
    message: string;
    details?: Record<string, unknown> | undefined;
    status?: number | undefined;
    cause?: unknown;
  }) {
    super(params.message);
    this.name = "ApiException";
    this.code = params.code;
    this.details = params.details;
    this.status = params.status;

    // Preserva a causa original (ES2022)
    if (params.cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = params.cause;
    }
  }
}

/* ============================================================
   TIPOS INTERNOS
   ============================================================ */

type RequestOptions = Omit<RequestInit, "signal"> & {
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
};

/* ============================================================
   HELPERS
   ============================================================ */

function delay<T>(value: T, ms = 350): Promise<T> {
  if (!IS_DEV) return Promise.resolve(value);
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryable(status: number): boolean {
  return status >= 500 && status < 600;
}

function combineSignals(
  timeoutMs: number,
  external?: AbortSignal,
): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new Error("TIMEOUT")),
    timeoutMs,
  );

  const onExternalAbort = () => controller.abort(external?.reason);
  external?.addEventListener("abort", onExternalAbort, { once: true });

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timer);
      external?.removeEventListener("abort", onExternalAbort);
    },
  };
}

/** Extrai um payload de erro legível de uma Response. */
async function parseErrorBody(res: Response): Promise<{
  code?: string | undefined;
  message?: string | undefined;
  details?: Record<string, unknown> | undefined;
}> {
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = (await res.json()) as Record<string, unknown>;
      return {
        code: typeof body["code"] === "string" ? body["code"] : undefined,
        message: typeof body["message"] === "string" ? body["message"] : undefined,
        details:
          body["details"] && typeof body["details"] === "object"
            ? (body["details"] as Record<string, unknown>)
            : undefined,
      };
    } catch {
      // JSON inválido
    }
  }

  try {
    const text = await res.text();
    return { message: text.slice(0, 200) || undefined };
  } catch {
    return {};
  }
}

/* ============================================================
   REQUEST CORE
   ============================================================ */

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    timeout = REQUEST_TIMEOUT_MS,
    retries = 1,
    signal: externalSignal,
    ...fetchOptions
  } = options;

  const url = `${API_URL}${path}`;
  let lastError: ApiException | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const { signal, cleanup } = combineSignals(timeout, externalSignal);

    try {
      const res = await fetch(url, {
        ...fetchOptions,
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(fetchOptions.headers ?? {}),
        },
      });

      if (!res.ok) {
        const body = await parseErrorBody(res);

        const apiErr = new ApiException({
          code: body["code"] ?? `HTTP_${res.status}`,
          message: body["message"] ?? `Erro ${res.status} ao chamar ${path}`,
          details: body["details"],
          status: res.status,
        });

        if (isRetryable(res.status) && attempt < retries) {
          lastError = apiErr;
          await sleep(300 * Math.pow(2, attempt));
          continue;
        }

        throw apiErr;
      }

      if (res.status === 204) return undefined as T;

      return (await res.json()) as T;
    } catch (err) {
      // Re-lança ApiException já formatada
      if (err instanceof ApiException) {
        if (
          err.status !== undefined &&
          isRetryable(err.status) &&
          attempt < retries
        ) {
          lastError = err;
          await sleep(300 * Math.pow(2, attempt));
          continue;
        }
        throw err;
      }

      // Cancelamento / timeout
      if (err instanceof DOMException && err.name === "AbortError") {
        if (externalSignal?.aborted) {
          throw new ApiException({
            code: "REQUEST_ABORTED",
            message: "Requisição cancelada.",
            cause: err,
          });
        }
        throw new ApiException({
          code: "REQUEST_TIMEOUT",
          message: `A requisição excedeu ${timeout}ms. Tente novamente.`,
          cause: err,
        });
      }

      // Erro de rede
      lastError = new ApiException({
        code: "NETWORK_ERROR",
        message:
          err instanceof Error
            ? err.message
            : "Não foi possível conectar ao servidor.",
        cause: err,
      });

      if (attempt < retries) {
        await sleep(300 * Math.pow(2, attempt));
        continue;
      }

      throw lastError;
    } finally {
      cleanup();
    }
  }

  throw (
    lastError ??
    new ApiException({
      code: "UNKNOWN_ERROR",
      message: "Erro desconhecido ao chamar a API.",
    })
  );
}

/* ============================================================
   MÍDIA
   ============================================================ */

export async function fetchMedia(opts?: RequestOptions): Promise<MediaItem[]> {
  if (USE_MOCKS) return delay(mediaItems);
  return request<MediaItem[]>("/midia", opts);
}

export async function fetchMediaBySlug(
  slug: string,
  opts?: RequestOptions,
): Promise<MediaItem> {
  if (USE_MOCKS) {
    const item = getMediaBySlug(slug);
    if (!item) {
      throw new ApiException({
        code: "MEDIA_NOT_FOUND",
        message: `Nenhum item de mídia encontrado para o slug "${slug}".`,
        status: 404,
      });
    }
    return delay(item);
  }

  try {
    return await request<MediaItem>(
      `/midia/${encodeURIComponent(slug)}`,
      opts,
    );
  } catch (err) {
    if (err instanceof ApiException && err.status === 404) {
      throw new ApiException({
        code: "MEDIA_NOT_FOUND",
        message: `Nenhum item de mídia encontrado para o slug "${slug}".`,
        status: 404,
      });
    }
    throw err;
  }
}

/* ============================================================
   ESTATÍSTICAS
   ============================================================ */

export async function fetchKpis(opts?: RequestOptions): Promise<Kpi[]> {
  if (USE_MOCKS) return delay(kpis);
  return request<Kpi[]>("/estatisticas", opts);
}

export async function fetchKpiBySlug(
  slug: string,
  opts?: RequestOptions,
): Promise<Kpi> {
  if (USE_MOCKS) {
    const kpi = getKpiBySlug(slug);
    if (!kpi) {
      throw new ApiException({
        code: "KPI_NOT_FOUND",
        message: `Indicador "${slug}" não encontrado.`,
        status: 404,
      });
    }
    return delay(kpi);
  }

  try {
    return await request<Kpi>(
      `/estatisticas/${encodeURIComponent(slug)}`,
      opts,
    );
  } catch (err) {
    if (err instanceof ApiException && err.status === 404) {
      throw new ApiException({
        code: "KPI_NOT_FOUND",
        message: `Indicador "${slug}" não encontrado.`,
        status: 404,
      });
    }
    throw err;
  }
}

/* ============================================================
   SOLICITAÇÃO DE ACESSO
   ============================================================ */

export async function submitSolicitacaoAcesso(
  data: SolicitacaoAcesso,
  opts?: RequestOptions,
): Promise<SolicitacaoResposta> {
  if (!data.nome?.trim() || !data.email?.trim() || !data.instituicao?.trim()) {
    throw new ApiException({
      code: "INVALID_PAYLOAD",
      message: "Preencha todos os campos obrigatórios.",
      status: 400,
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new ApiException({
      code: "INVALID_EMAIL",
      message: "Informe um e-mail válido.",
      status: 400,
    });
  }

  if (USE_MOCKS) {
    const resposta: SolicitacaoResposta = {
      id: `sol_${Date.now().toString(36)}`,
      status: "recebida",
      mensagem:
        "Solicitação recebida! Analisaremos em até 5 dias úteis e responderemos por e-mail.",
      prazoEstimado: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };
    return delay(resposta, 900);
  }

  return request<SolicitacaoResposta>("/solicitacoes", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts,
  });
}