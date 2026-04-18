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
            Quem é o Grupo DAMA
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.5rem]">
            Não somos agência. Não somos terceirização avulsa.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 space-y-5 text-[15px] leading-[1.85] text-[var(--text-secondary)]">
          <p>
            A DAMA nasceu da convicção de que médicos não deveriam precisar
            escolher entre cuidar de pacientes e cuidar do negócio. Fundada por
            Jéssica Anjos, a empresa começou como um time de atendimento
            comercial e evoluiu para uma operação integrada que já atendeu mais
            de 90 médicos em 16 estados.
          </p>
          <p>
            Somos o time que opera a frente comercial do seu consultório como se
            fosse nosso — com método, dados e atendimento humanizado.
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
