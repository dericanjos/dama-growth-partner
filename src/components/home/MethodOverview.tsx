import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    letter: "D",
    title: "Diagnosticar",
    text: "Mapeamos a operação: agenda, atendimento, funil de conversão, ticket médio. Identificamos onde o faturamento está vazando antes de investir um centavo.",
  },
  {
    letter: "A",
    title: "Atrair",
    text: "Ativamos as alavancas certas: tráfego pago, presença digital, SEO, conteúdo estratégico. Pacientes qualificados, não volume vazio.",
  },
  {
    letter: "M",
    title: "Marcar",
    text: "Nosso time comercial entra em campo: aborda, qualifica, argumenta e agenda. Cada lead vira uma oportunidade real de consulta.",
  },
  {
    letter: "A",
    title: "Acompanhar",
    text: "Follow-up, reativação de inativos, redução de faltas, análise semanal de métricas. Crescimento monitorado, não abandonado.",
  },
];

export function MethodOverview() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 hero-glow opacity-60" aria-hidden />
      <div className="container-dama relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Método Proprietário</span>
          <h2 className="heading-display mt-4 text-3xl text-[var(--gold)] md:text-[2.5rem]">
            Método D.A.M.A
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
              <div className="font-serif text-6xl leading-none text-[var(--gold)]">
                {s.letter}
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
