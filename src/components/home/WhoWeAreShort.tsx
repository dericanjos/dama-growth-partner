import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function WhoWeAreShort() {
  return (
    <section className="bg-[var(--cream)] py-24 md:py-32">
      <div className="container-dama max-w-3xl">
        <Reveal>
          <div className="badge-pill-light">
            <span className="badge-pill-dot" />
            O que é o Grupo DAMA
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.5rem]">
            Não somos uma agência. Somos um ecossistema completo de soluções inteligentes para médicos.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 space-y-5 text-[15px] leading-[1.85] text-[var(--text-secondary)]">
          <p>
            O Grupo DAMA nasceu ao percebermos que muitos médicos extremamente
            competentes estavam sobrecarregados, desvalorizados e presos à
            instabilidade não por falta de capacidade técnica, mas pela ausência
            de uma estrutura comercial e estratégica dentro dos seus consultórios.
          </p>
          <p>
            Fundado por Jéssica Anjos, o Grupo DAMA é um ecossistema de soluções
            criado para médicos que desejam crescer com previsibilidade,
            sustentabilidade e qualidade de vida através de método, dados e
            processos à prova de crises.
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-10">
          <Link
            to="/sobre"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
          >
            Conheça nossa história
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
