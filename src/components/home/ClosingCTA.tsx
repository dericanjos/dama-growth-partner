import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const WA_URL =
  "https://wa.me/5521959214292?text=" +
  encodeURIComponent(
    "Olá, Jessica! Vim do site do Grupo DAMA e gostaria de saber mais sobre os serviços e como funciona a parceria."
  );

const PARCERIA_URL = "https://comercial.grupodamahealth.com.br";

export function ClosingCTA() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-dama relative max-w-3xl text-center">
        <Reveal>
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Crescimento previsível exige mais do que marketing.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70 md:text-lg">
            Exige uma operação estratégica preparada para gerar e sustentar os
            seus resultados no longo prazo.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/60 md:text-lg">
            Descubra como a DAMA pode alavancar o seu faturamento ainda esse ano.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href={PARCERIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Conhecer a operação <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Falar com o especialista <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
