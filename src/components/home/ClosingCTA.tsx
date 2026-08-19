import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import damaQueen from "@/assets/dama-queen.webp";

export function ClosingCTA() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-dama relative max-w-3xl text-center">
        <Reveal>
          <img
            src={damaQueen}
            alt=""
            aria-hidden
            width={64}
            height={109}
            loading="lazy"
            decoding="async"
            className="mx-auto mb-8 h-16 w-auto select-none md:h-20"
            style={{ filter: "drop-shadow(0 8px 24px rgba(232,184,74,0.35))" }}
          />
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Crescimento previsível exige mais do que marketing.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70 md:text-lg">
            Exige uma operação estratégica preparada para gerar e sustentar os
            seus resultados no longo prazo.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/60 md:text-lg">
            O Grupo DAMA Health é uma Operação Comercial Estratégica para
            Médicos. Estrutura, método e dados para consultórios particulares.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link to="/contato" className="btn-gold">
            Falar com a DAMA <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
