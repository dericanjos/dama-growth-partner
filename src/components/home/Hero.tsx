import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="surface-dark hero-glow relative overflow-hidden">
      {/* Decorative crown / orb — sutil, atrás do conteúdo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[120%]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 30%, color-mix(in oklab, var(--gold) 8%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="container-dama relative flex flex-col items-center justify-center pb-20 pt-28 text-center md:pb-24 md:pt-36">
        {/* Badge */}
        <div className="badge-pill">
          <span className="badge-pill-dot" />
          Operação Comercial para Médicos
        </div>

        {/* Title */}
        <h1 className="heading-display mt-8 max-w-5xl text-[2.6rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[5rem]">
          <span className="gold-text">
            A operação que cuida do crescimento do seu consultório por inteiro.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          O Grupo DAMA integra{" "}
          <span className="font-semibold text-[var(--gold-light)]">
            time comercial
          </span>
          ,{" "}
          <span className="font-semibold text-[var(--gold-light)]">
            growth marketing
          </span>{" "}
          e{" "}
          <span className="font-semibold text-[var(--gold-light)]">
            tecnologia avançada
          </span>{" "}
          em uma parceria exclusiva para médicos que querem crescer sua
          autoridade e faturamento com previsibilidade e sustentabilidade.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#solucao" className="btn-gold group">
            <MessageCircle className="h-4 w-4" />
            Conheça nossa solução
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            Falar com a equipe <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="mt-20 flex h-10 w-6 items-start justify-center rounded-full border border-white/15 pt-2 opacity-60"
        >
          <span className="h-2 w-[2px] animate-pulse rounded-full bg-[var(--gold)]" />
        </div>
      </div>
    </section>
  );
}
