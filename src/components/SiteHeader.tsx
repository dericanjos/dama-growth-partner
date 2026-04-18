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

const PARCERIA_URL = "https://parceria.grupodama.com.br";

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--navy)]/92 backdrop-blur-md border-b border-[color-mix(in_oklab,var(--gold)_18%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-dama flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className="group flex items-center gap-3 leading-none shrink-0"
          onClick={() => setOpen(false)}
          aria-label="Grupo DAMA — Início"
        >
          <img
            src={damaLogo}
            alt="Logo Grupo DAMA"
            width={56}
            height={56}
            className="h-12 w-12 md:h-14 md:w-14 object-contain"
          />
          <span className="hidden lg:inline-block border-l border-[color-mix(in_oklab,var(--gold)_30%,transparent)] pl-3 text-[10px] uppercase tracking-[0.28em] text-white/70">
            Grupo<br />DAMA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="text-sm text-white/80 transition-colors hover:text-white"
              activeProps={{ className: "text-white font-medium" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={PARCERIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !py-2.5 !px-4 !text-[13px] whitespace-nowrap"
          >
            Seja um Parceiro <span aria-hidden>→</span>
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
        className={`md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } fixed inset-0 top-16 bg-[var(--navy-dark)] transition-opacity duration-300`}
      >
        <div className="container-dama flex flex-col gap-1 pt-8">
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
        </div>
      </div>
    </header>
  );
}
