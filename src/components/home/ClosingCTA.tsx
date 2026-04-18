import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function ClosingCTA() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-dama relative max-w-3xl text-center">
        <Reveal>
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Quer conhecer nossa parceria?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
            Conheça como o Grupo DAMA pode operar a frente comercial do seu
            consultório — ou fale diretamente com nossa equipe.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="https://parceria.grupodama.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-7 py-3.5 text-sm font-medium text-[var(--navy)] transition-all hover:bg-[var(--gold-light)] hover:shadow-[var(--shadow-gold)]"
          >
            Conhecer a Parceria <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Falar com a equipe <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
