import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";

// Mock do TanStack Router
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );
  return {
    ...actual,
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Header", () => {
  it("renderiza a navegação principal", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: /principal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^curso$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /comunidade/i })).toBeInTheDocument();
  });

  it("tem botões de Entrar e Inscrever-se", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /entrar/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: /inscrever-se/i })).toHaveAttribute(
      "href",
      "/solicitar-acesso",
    );
  });

  it("abre e fecha o menu móvel", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /abrir menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    const closeBtn = screen.getByRole("button", { name: /fechar menu/i });
    expect(closeBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /menu móvel/i })).toBeInTheDocument();
  });

  it("fecha o menu ao pressionar Esc", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: /abrir menu/i }));
    expect(screen.getByRole("navigation", { name: /menu móvel/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("navigation", { name: /menu móvel/i }),
    ).not.toBeInTheDocument();
  });
});