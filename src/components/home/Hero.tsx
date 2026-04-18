import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="surface-dark hero-glow relative overflow-hidden pt-28 md:pt-36">
      <div className="container-dama relative grid min-h-[90vh] items-center pb-20 md:pb-28">
        <div className="max-w-3xl">
          <div className="reveal reveal-in flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--gold)]" />
            <span className="eyebrow">Operação Comercial para Médicos</span>
          </div>

          <h1 className="heading-display mt-6 text-4xl text-white md:text-5xl lg:text-6xl">
            A operação que cuida do crescimento do seu consultório{" "}
            <span className="italic text-[var(--gold-light)]">por inteiro</span>.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            O Grupo DAMA integra time comercial, growth marketing e tecnologia em
            uma parceria exclusiva para médicos que querem crescer com consistência.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#solucao"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3.5 text-sm font-medium text-[var(--navy)] transition-all hover:bg-[var(--gold-light)] hover:shadow-[var(--shadow-gold)]"
            >
              Conheça nossa solução <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Falar com a equipe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hairline transition */}
      <div className="absolute inset-x-0 bottom-0 h-px hairline-gold opacity-50" aria-hidden />
    </section>
  );
}
