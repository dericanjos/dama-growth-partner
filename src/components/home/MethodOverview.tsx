import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    letter: "D",
    title: "Diagnosticar",
    text: "Analisamos toda a operação do consultório: atendimento, agenda, conversão, posicionamento e processos. Antes de crescer, identificamos exatamente onde o faturamento está sendo perdido.",
  },
  {
    letter: "A",
    title: "Atrair",
    text: "Estruturamos a presença e a captação do consultório através de tráfego pago, posicionamento, conteúdo estratégico, GEO e SEO local para atrair pacientes mais qualificados.",
  },
  {
    letter: "M",
    title: "Marcar",
    text: "Nosso time comercial conduz cada lead com atendimento humanizado, comunicação empática e técnica consultiva para transformar interesse em agendamento. Além de follow-up, reativação de pacientes e prospecção ativa de pacientes indicados.",
  },
  {
    letter: "A",
    title: "Acompanhar",
    text: "Monitoramos métricas, acompanhamos a operação e ajustamos continuamente os processos para aumentar previsibilidade, retenção e crescimento sustentável.",
  },
];

export function MethodOverview() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 hero-glow opacity-60" aria-hidden />
      <div className="container-dama relative">
        <Reveal className="max-w-2xl">
          <div className="badge-pill">
            <span className="badge-pill-dot" />
            Método Proprietário
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.75rem]">
            <span className="gold-text">Método D.A.M.A</span>
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">
            A filosofia que guia cada decisão dentro da operação.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.title + i}
              delay={i * 100}
              className="card-dark group p-7 hover:border-[var(--gold)]/55"
            >
              <div className="font-serif text-7xl leading-none">
                <span className="gold-text">{s.letter}</span>
              </div>
              <h3 className="mt-6 font-serif text-xl text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-14">
          <Link
            to="/metodo"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
          >
            Conheça o Método
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
