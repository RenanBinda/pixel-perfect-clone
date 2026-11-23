import { Link } from "@tanstack/react-router";
import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useAuth, authStore } from "@/lib/auth-store";

const nav = [
  { label: "Curso", to: "/curso" },
  { label: "Iniciativas", to: "/iniciativas" },
  { label: "Comunidade", to: "/comunidade" },
  { label: "Sobre", to: "/sobre" },
  { label: "Ajuda", to: "/ajuda" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { usuario, status } = useAuth();

  // Só marcamos como "montado" após o primeiro render no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Só consideramos autenticado após montar (evita hydration mismatch)
  const isAuthenticated =
    mounted && status === "authenticated" && Boolean(usuario);

  const isPlatformAdmin =
    mounted &&
    (usuario?.papelSistema === "admin" || usuario?.papelSistema === "master");

  // Fecha menu mobile ao clicar fora / Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Fecha menu do usuário ao clicar fora / Esc
  useEffect(() => {
    if (!userMenuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setUserMenuOpen(false);
    const onClick = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [userMenuOpen]);

  // Bloqueia scroll do body quando menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleLogout() {
    setUserMenuOpen(false);
    await authStore.signOut();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-soft/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="CEURS – página inicial" className="shrink-0">
          <Logo size="lg" />
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex gap-8 text-sm font-semibold text-ink">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  className="relative py-1 transition-colors hover:text-teal focus-visible:text-teal"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {isPlatformAdmin && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  <Link to="/admin">Admin</Link>
                </Button>
              )}

              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-label={`Menu de ${usuario?.nome}`}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-secondary-foreground transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-orange"
                >
                  {usuario?.avatarUrl ? (
                    <img
                      src={usuario.avatarUrl}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    usuario?.iniciais
                  )}
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-line bg-card shadow-card"
                  >
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-sm font-bold text-navy">
                        {usuario?.nome}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {usuario?.email}
                      </p>
                      {usuario?.papelSistema && (
                        <p className="mt-1 inline-block rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal">
                          {usuario.papelSistema}
                        </p>
                      )}
                    </div>
                    <ul className="p-1">
                      <li>
                        <Link
                          to="/conta"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-soft"
                          role="menuitem"
                        >
                          <User className="h-4 w-4 text-teal" aria-hidden />
                          Minha conta
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-ink hover:bg-soft"
                          role="menuitem"
                        >
                          <LogOut className="h-4 w-4 text-orange" aria-hidden />
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link to="/solicitar-acesso">Participar</Link>
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div
          ref={menuRef}
          id="menu-movel"
          className="border-t border-line bg-soft md:hidden"
        >
          <nav aria-label="Menu móvel">
            <ul className="container-page flex flex-col py-3">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-semibold text-ink hover:text-teal"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}

              {isPlatformAdmin && (
                <li className="pt-3">
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block py-3 font-semibold text-ink hover:text-teal"
                  >
                    Painel administrativo
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li>
                  <Link
                    to="/conta"
                    onClick={() => setOpen(false)}
                    className="block py-3 font-semibold text-ink hover:text-teal"
                  >
                    Minha conta
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void handleLogout();
                    }}
                    className="block w-full py-3 text-left font-semibold text-ink hover:text-teal"
                  >
                    Sair
                  </button>
                </li>
              )}

              {!isAuthenticated && (
                <li className="pt-3">
                  <Button asChild className="w-full">
                    <Link to="/solicitar-acesso" onClick={() => setOpen(false)}>
                      Participar
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}