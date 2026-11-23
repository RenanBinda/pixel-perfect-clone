import { isNotFound, isRedirect } from "@tanstack/react-router";
import { renderErrorPage } from "./error-page";

/** Preserve framework control flow; only unexpected failures become a 500. */
export function handleRequestError(error: unknown): Response {
  if (
    error instanceof Response ||
    isRedirect(error) ||
    isNotFound(error) ||
    (error != null && typeof error === "object" && "statusCode" in error)
  ) {
    throw error;
  }

  console.error(error);
  return new Response(renderErrorPage(), {
    status: 500,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}