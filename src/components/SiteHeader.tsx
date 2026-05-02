import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import damaLogo from "@/assets/dama-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Quem Somos" },
  { to: "/solucao", label: "Nossa Solução" },
  { to: "/metodo", label: "Método" },
] as const;

const CONTENT_LINKS = [
  { to: "/blog", label: "Blog" },
  { to: "/noticias", label: "Notícias" },
] as const;

const PARCERIA_URL = "https://comercial.grupodamahealth.com.br";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [mobileContentOpen, setMobileContentOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const contentActive = pathname.startsWith("/blog") || pathname.startsWith("/noticias");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close dropdown on outside click / escape
  useEffect(() => {
    if (!contentOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setContentOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContentOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [contentOpen]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setContentOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setContentOpen(false), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 md:h-auto ${
        open ? "h-dvh overflow-y-auto" : ""
      } ${
        scrolled || open
          ? "bg-[var(--navy)] border-b border-[color-mix(in_oklab,var(--gold)_18%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-dama flex h-20 items-center justify-between gap-3 md:h-24 lg:h-28">
        <Link
          to="/"
          className="group flex items-center gap-3 leading-none shrink-0"
          onClick={() => setOpen(false)}
          aria-label="Grupo DAMA — Início"
        >
          <img
            src={damaLogo}
            alt="Logo Grupo DAMA"
            width={96}
            height={96}
            className="h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] lg:h-24 lg:w-24 object-contain"
          />
          <span className="hidden xl:inline-block border-l border-[color-mix(in_oklab,var(--gold)_30%,transparent)] pl-3 text-[10px] uppercase tracking-[0.28em] text-white/70">
            Grupo
            <br />
            DAMA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-[clamp(0.45rem,1.15vw,1.75rem)] md:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] text-white/80 transition-colors hover:text-white"
              activeProps={{ className: "text-white font-medium" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Conteúdo dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={contentOpen}
              onClick={() => setContentOpen((v) => !v)}
              className={`inline-flex items-center gap-1 whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] transition-colors hover:text-white ${
                contentActive ? "text-white font-medium" : "text-white/80"
              }`}
            >
              Conteúdo
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  contentOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            {contentOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 min-w-[10rem] rounded-md border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[var(--navy)] py-2 shadow-xl"
              >
                {CONTENT_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    role="menuitem"
                    onClick={() => setContentOpen(false)}
                    className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    activeProps={{ className: "text-[var(--gold)] font-medium" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contato"
            className="whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] text-white/80 transition-colors hover:text-white"
            activeProps={{ className: "text-white font-medium" }}
          >
            Contato
          </Link>
        </nav>

        <div className="hidden md:block shrink-0">
          <a
            href={PARCERIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !px-3 !py-2 !text-xs whitespace-nowrap lg:!px-4 lg:!text-sm"
          >
            Seja Parceiro <span aria-hidden>→</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden bg-[var(--navy)] transition-all duration-300 ${
          open ? "pointer-events-auto block opacity-100" : "pointer-events-none hidden opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="container-dama flex min-h-[calc(100dvh-5rem)] flex-col gap-1 pb-12 pt-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-4 text-lg text-white/85"
              activeProps={{ className: "text-[var(--gold)]" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Conteúdo accordion (mobile) */}
          <div className="border-b border-white/5">
            <button
              type="button"
              aria-expanded={mobileContentOpen}
              aria-controls="mobile-content-submenu"
              onClick={() => setMobileContentOpen((v) => !v)}
              className={`flex w-full items-center justify-between py-4 text-lg ${
                contentActive ? "text-[var(--gold)]" : "text-white/85"
              }`}
            >
              <span>Conteúdo</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  mobileContentOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {mobileContentOpen && (
              <div id="mobile-content-submenu" className="pb-3 pl-4">
                {CONTENT_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-base text-white/75"
                    activeProps={{ className: "text-[var(--gold)]" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contato"
            onClick={() => setOpen(false)}
            className="border-b border-white/5 py-4 text-lg text-white/85"
            activeProps={{ className: "text-[var(--gold)]" }}
          >
            Contato
          </Link>

          <a
            href={PARCERIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3.5 text-base font-medium text-[var(--navy)]"
          >
            Seja Parceiro <span aria-hidden>→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
