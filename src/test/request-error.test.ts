import { afterEach, describe, expect, it, vi } from "vitest";
import { notFound, redirect } from "@tanstack/react-router";
import { handleRequestError } from "../lib/request-error";

afterEach(() => vi.restoreAllMocks());

describe("Request error handling", () => {
  it("preserves the login redirect and its return destination", () => {
    const response = redirect({ to: "/login", search: { redirect: "/admin/documentacao" } });
    expect(response.status).toBe(307);
    let caught: unknown;
    try { handleRequestError(response); } catch (error) { caught = error; }
    expect(caught).toBe(response);
    expect(response.options.search).toEqual({ redirect: "/admin/documentacao" });
  });

  it("preserves intentional HTTP responses including their headers", () => {
    const response = new Response(null, { status: 303, headers: { Location: "/login" } });
    let caught: unknown;
    try { handleRequestError(response); } catch (error) { caught = error; }
    expect(caught).toBe(response);
    expect(response.headers.get("Location")).toBe("/login");
  });

  it("preserves not-found and HTTP status errors", () => {
    for (const original of [notFound(), Object.assign(new Error("Forbidden"), { statusCode: 403 })]) {
      let caught: unknown;
      try { handleRequestError(original); } catch (error) { caught = error; }
      expect(caught).toBe(original);
    }
  });

  it("logs unexpected failures and returns an uncached 500 response", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const failure = new Error("Unexpected failure");
    const response = handleRequestError(failure);
    expect(response.status).toBe(500);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(log).toHaveBeenCalledWith(failure);
  });
});