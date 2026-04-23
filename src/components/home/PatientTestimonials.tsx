import { Quote, Star, User } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PATIENT_REVIEWS: string[] = [
  "Eu gostei muito do atendimento, até por ter me chamado, o que é difícil de se ver. A compreensão e simpatia, adorável.",
  "Atendimento impecável, super atenciosa e educada. A todo momento preocupada se haviam dúvidas e se podia continuar com o atendimento. Parabéns pela excelente profissional e pelo atendimento.",
  "Claro, eu agradeço o atendimento e a gentileza durante nossa conversa. O cuidado começa a partir do atendimento de vocês, e isso é muito importante para os pacientes. Obrigado.",
  "Quero deixar registrada minha satisfação com a agilidade no atendimento e a segurança que me foi passada. Em um momento como esse onde as incertezas estão me rodeando é muito importante esse diferencial. Sou grata!",
  "Gostei bastante deste primeiro contato, vocês foram bastante atenciosas e me conquistaram com a questão do acolhimento e segurança.",
  "Foi tudo impecável, a gente sente a humanização de vocês nesse primeiro contato! Obrigada.",
  "Achei eficiente, respostas rápidas e super educada, tenho certeza que na parte da consulta vai ser assim também.",
  "O atendimento foi ágil, humanizado, respeitoso e produtivo. A importância desse modelo de atendimento é um diferencial e transfere segurança ao paciente.",
];

export function PatientTestimonials() {
  return (
    <section className="bg-[var(--cream)] pb-24 md:pb-32">
      <div className="container-dama">
        <Reveal className="max-w-2xl">
          <div className="badge-pill-light">
            <span className="badge-pill-dot" />
            Avaliações de Pacientes
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.5rem]">
            E os pacientes? Eles também falam.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--text-secondary)] md:text-base">
            Feedbacks reais de pacientes atendidos pelo time DAMA — antes mesmo
            de chegarem ao consultório do médico parceiro.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PATIENT_REVIEWS.map((text, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 80}
              className="card-dama group flex flex-col p-6 hover:border-[color-mix(in_oklab,var(--gold)_50%,var(--border))]"
            >
              <div className="flex items-center justify-between">
                <Quote
                  className="h-6 w-6 text-[var(--gold)]"
                  strokeWidth={1.5}
                />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                {text}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold-soft)] ring-1 ring-[color-mix(in_oklab,var(--gold)_40%,var(--border))]">
                  <User className="h-5 w-5 text-[var(--gold-deep)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--navy)]">
                    Paciente atendido
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    Feedback verificado
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
