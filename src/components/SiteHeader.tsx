import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import damaLogo from "@/assets/dama-logo.webp";

const QUEM_SOMOS_LINKS = [
  { to: "/sobre", label: "A DAMA" },
  { to: "/metodo", label: "O Método D.A.M.A" },
  { to: "/faq", label: "Perguntas Frequentes" },
] as const;

const VERTICAL_LINKS = [
  { to: "/dama-estrategica", label: "DAMA Estratégica" },
  { to: "https://escoladama.com.br", label: "DAMA Escola", external: true },
  { to: "/dama-tech", label: "DAMA Tech" },
] as const;

type NavItem = { to: string; label: string; external?: boolean };


const PARCERIA_URL = "https://comercial.grupodamahealth.com.br";

/**
 * O CTA do cabeçalho depende da rota. Só a vertical comercial
 * (/dama-estrategica e suas subpáginas) serve CTA de compra; o núcleo
 * institucional serve um convite de conversa.
 */
function headerCta(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const comercial = path === "/dama-estrategica" || path.startsWith("/dama-estrategica/");
  return comercial
    ? { label: "Seja Parceiro", href: PARCERIA_URL, external: true as const }
    : { label: "Falar com a DAMA", href: "/contato", external: false as const };
}

function HeaderCta({
  pathname,
  className,
  onNavigate,
}: {
  pathname: string;
  className: string;
  onNavigate?: () => void;
}) {
  const cta = headerCta(pathname);
  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {cta.label} <span aria-hidden>&rarr;</span>
      </a>
    );
  }
  return (
    <Link to={cta.href} onClick={onNavigate} className={className}>
      {cta.label} <span aria-hidden>&rarr;</span>
    </Link>
  );
}

const TRIGGER_CLASS =
  "inline-flex items-center gap-1 whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] transition-colors hover:text-white";

/**
 * Dropdown de navegação desktop. O item principal é um link clicável que
 * também abre o submenu no hover.
 * Os links ficam SEMPRE no DOM (SSR e crawler). A visibilidade é só por CSS.
 */
function DesktopDropdown({
  id,
  label,
  to,
  links,
  active,
}: {
  id: string;
  label: string;
  to: string;
  links: readonly NavItem[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onFocus={openNow}
    >
      <Link
        to={to}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(false)}
        className={`${TRIGGER_CLASS} ${active ? "text-white font-medium" : "text-white/80"}`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </Link>

      <ul
        id={id}
        role="menu"
        aria-hidden={!open}
        className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 min-w-[13rem] list-none rounded-md border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[var(--navy)] py-2 shadow-xl transition-opacity duration-150 ${
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <li key={link.to} role="none">
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener"
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.to}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                activeProps={{ className: "text-[var(--gold)] font-medium" }}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}

      </ul>
    </div>
  );
}

/**
 * Accordion mobile. O item principal navega; a seta abre o submenu.
 * Links sempre no DOM, visibilidade só por CSS.
 */
function MobileAccordion({
  id,
  label,
  to,
  links,
  active,
  onNavigate,
}: {
  id: string;
  label: string;
  to: string;
  links: readonly NavItem[];
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <div className="flex w-full items-center justify-between">
        <Link
          to={to}
          onClick={onNavigate}
          className={`flex-1 py-4 text-lg ${active ? "text-[var(--gold)]" : "text-white/85"}`}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-label={`${open ? "Fechar" : "Abrir"} submenu de ${label}`}
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center text-white/70"
        >
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </div>
      <ul
        id={id}
        aria-hidden={!open}
        className={`list-none overflow-hidden pl-4 transition-all duration-200 ${
          open
            ? "visible max-h-96 pb-3 opacity-100"
            : "invisible max-h-0 pb-0 opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <li key={link.to}>
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener"
                tabIndex={open ? 0 : -1}
                onClick={onNavigate}
                className="block py-2.5 text-base text-white/75"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.to}
                tabIndex={open ? 0 : -1}
                onClick={onNavigate}
                className="block py-2.5 text-base text-white/75"
                activeProps={{ className: "text-[var(--gold)]" }}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}

      </ul>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const verticalActive = VERTICAL_LINKS.some((link) => pathname.startsWith(link.to));
  const quemSomosActive = QUEM_SOMOS_LINKS.some((link) => pathname.startsWith(link.to));
  const fazemosActive = verticalActive || pathname.startsWith("/solucao");

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
          aria-label="Grupo DAMA · Início"
        >
          <img
            src={damaLogo}
            alt="Logo Grupo DAMA"
            width={96}
            height={96}
            loading="eager"
            fetchPriority="high"
            decoding="async"
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
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] text-white/80 transition-colors hover:text-white"
            activeProps={{ className: "text-white font-medium" }}
          >
            Início
          </Link>

          <DesktopDropdown
            id="desktop-quem-somos-menu"
            label="Quem Somos"
            to="/sobre"
            links={QUEM_SOMOS_LINKS}
            active={quemSomosActive}
          />

          <DesktopDropdown
            id="desktop-verticals-menu"
            label="O que fazemos"
            to="/solucao"
            links={VERTICAL_LINKS}
            active={fazemosActive}
          />

          <Link
            to="/noticias"
            className="whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] text-white/80 transition-colors hover:text-white"
            activeProps={{ className: "text-white font-medium" }}
          >
            Notícias
          </Link>

          <Link
            to="/blog"
            className="whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] text-white/80 transition-colors hover:text-white"
            activeProps={{ className: "text-white font-medium" }}
          >
            Blog
          </Link>

          <Link
            to="/contato"
            className="whitespace-nowrap text-[clamp(0.78rem,1.55vw,0.95rem)] text-white/80 transition-colors hover:text-white"
            activeProps={{ className: "text-white font-medium" }}
          >
            Contato
          </Link>
        </nav>

        <div className="hidden md:block shrink-0">
          <HeaderCta
            pathname={pathname}
            className="btn-gold !px-3 !py-2 !text-xs whitespace-nowrap lg:!px-4 lg:!text-sm"
          />
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
          <Link
            to="/"
            activeOptions={{ exact: true }}
            onClick={() => setOpen(false)}
            className="border-b border-white/5 py-4 text-lg text-white/85"
            activeProps={{ className: "text-[var(--gold)]" }}
          >
            Início
          </Link>

          <MobileAccordion
            id="mobile-quem-somos-submenu"
            label="Quem Somos"
            to="/sobre"
            links={QUEM_SOMOS_LINKS}
            active={quemSomosActive}
            onNavigate={() => setOpen(false)}
          />

          <MobileAccordion
            id="mobile-verticals-submenu"
            label="O que fazemos"
            to="/solucao"
            links={VERTICAL_LINKS}
            active={fazemosActive}
            onNavigate={() => setOpen(false)}
          />

          <Link
            to="/noticias"
            onClick={() => setOpen(false)}
            className="border-b border-white/5 py-4 text-lg text-white/85"
            activeProps={{ className: "text-[var(--gold)]" }}
          >
            Notícias
          </Link>

          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="border-b border-white/5 py-4 text-lg text-white/85"
            activeProps={{ className: "text-[var(--gold)]" }}
          >
            Blog
          </Link>

          <Link
            to="/contato"
            onClick={() => setOpen(false)}
            className="border-b border-white/5 py-4 text-lg text-white/85"
            activeProps={{ className: "text-[var(--gold)]" }}
          >
            Contato
          </Link>

          <HeaderCta
            pathname={pathname}
            onNavigate={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3.5 text-base font-medium text-[var(--navy)]"
          />
        </nav>
      </div>
    </header>
  );
}
