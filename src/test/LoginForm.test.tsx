import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/login/LoginForm";

// Mock do TanStack Router (usado dentro do componente)
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );
  return {
    ...actual,
    useRouter: () => ({ navigate: vi.fn(), invalidate: vi.fn() }),
    useNavigate: () => vi.fn(),
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("LoginForm", () => {
  const onForgot = vi.fn();

  it("renderiza campos de e-mail e senha", () => {
    render(<LoginForm onForgot={onForgot} />);
    expect(screen.getByLabelText(/e-mail institucional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar na plataforma/i })).toBeInTheDocument();
  });

  it("mostra erro quando e-mail está vazio", async () => {
    const user = userEvent.setup();
    render(<LoginForm onForgot={onForgot} />);

    await user.click(screen.getByRole("button", { name: /entrar na plataforma/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/informe seu e-mail/i);
  });

  it("mostra erro quando e-mail é inválido", async () => {
    const user = userEvent.setup();
    render(<LoginForm onForgot={onForgot} />);

    await user.type(screen.getByLabelText(/e-mail/i), "invalido");
    await user.type(screen.getByLabelText(/senha/i), "123456");
    await user.click(screen.getByRole("button", { name: /entrar na plataforma/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/e-mail não reconhecido/i);
  });

  it("mostra erro quando senha é curta", async () => {
    const user = userEvent.setup();
    render(<LoginForm onForgot={onForgot} />);

    await user.type(screen.getByLabelText(/e-mail/i), "teste@exemplo.com");
    await user.type(screen.getByLabelText(/senha/i), "123");
    await user.click(screen.getByRole("button", { name: /entrar na plataforma/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/pelo menos 6 caracteres/i);
  });

  it("alterna visibilidade da senha", async () => {
    const user = userEvent.setup();
    render(<LoginForm onForgot={onForgot} />);

    const senha = screen.getByLabelText(/senha/i) as HTMLInputElement;
    expect(senha.type).toBe("password");

    const toggle = screen.getByRole("button", { name: /mostrar senha/i });
    await user.click(toggle);

    expect(senha.type).toBe("text");
    expect(screen.getByRole("button", { name: /ocultar senha/i })).toBeInTheDocument();
  });

  it("chama onForgot ao clicar em 'Esqueci minha senha'", async () => {
    const user = userEvent.setup();
    render(<LoginForm onForgot={onForgot} />);

    await user.click(screen.getByRole("button", { name: /esqueci minha senha/i }));
    expect(onForgot).toHaveBeenCalledTimes(1);
  });

  it("mostra mensagem de sucesso em submit válido", async () => {
    const user = userEvent.setup();
    render(<LoginForm onForgot={onForgot} />);

    await user.type(screen.getByLabelText(/e-mail/i), "teste@exemplo.com");
    await user.type(screen.getByLabelText(/senha/i), "123456");
    await user.click(screen.getByRole("button", { name: /entrar na plataforma/i }));

    // Aguarda o setTimeout interno (900ms)
    const msg = await screen.findByText(/backend python validará/i, undefined, {
      timeout: 2000,
    });
    expect(msg).toBeInTheDocument();
  });
});