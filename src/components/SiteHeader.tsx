import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import damaLogo from "@/assets/dama-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Quem Somos" },
  { to: "/solucao", label: "Nossa Solução" },
  { to: "/metodo", label: "Método" },
  { to: "/blog", label: "Blog" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contato", label: "Contato" },
] as const;

const PARCERIA_URL =
  "https://wa.me/5521959214292?text=" +
  encodeURIComponent(
    "Olá, Jessica! Vim do site do Grupo DAMA e gostaria de saber mais sobre os serviços e como funciona a parceria.",
  );

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        </nav>

        <div className="hidden md:block shrink-0">
          <a
            href={PARCERIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !px-2.5 !py-2 !text-xs whitespace-nowrap min-[900px]:!px-3 lg:!px-4 lg:!text-sm"
          >
            <span className="hidden min-[900px]:inline">Seja um </span>
            Parceiro <span aria-hidden>→</span>
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
          <a
            href={PARCERIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3.5 text-base font-medium text-[var(--navy)]"
          >
            Seja um Parceiro <span aria-hidden>→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
