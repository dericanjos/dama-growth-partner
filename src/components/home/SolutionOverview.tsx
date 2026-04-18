import { Link } from "@tanstack/react-router";
import { ArrowRight, Headset, LineChart, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    icon: Headset,
    title: "Time Comercial",
    text: "Profissionais treinados que atendem, qualificam e agendam seus pacientes. De nada adianta atrair se ninguém converte. Nosso time atua na linha de frente com empatia, técnica de vendas consultivas e acompanhamento de cada lead.",
  },
  {
    icon: LineChart,
    title: "Growth Marketing",
    text: "Crescimento orientado por dados. Análise de métricas, funis de conversão, testes e otimizações contínuas. Cada decisão é baseada em números, não em achismo.",
  },
  {
    icon: Target,
    title: "Marketing 360",
    text: "Gestão de tráfego pago, presença digital, reputação online e estratégias que colocam seu consultório na frente de quem já procura o que você oferece.",
  },
];

export function SolutionOverview() {
  return (
    <section id="solucao" className="bg-[var(--cream)] pb-28 pt-4 md:pb-36">
      <div className="container-dama">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Nossa Solução</span>
          <h2 className="heading-display mt-4 text-3xl md:text-[2.5rem]">
            O que fazemos pelos médicos parceiros
          </h2>
        </Reveal>

        <div className="card-dama mt-12 overflow-hidden p-2 md:p-4">
          <div className="grid divide-y divide-[var(--border)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 100}
                className="p-7 md:p-9"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold-soft)] text-[var(--navy)]">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-xl text-[var(--navy)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200} className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-serif text-lg italic text-[var(--text-secondary)] md:text-xl">
            “Time comercial sem marketing é operação sem combustível. Marketing
            sem time comercial é investimento jogado fora. A DAMA integra os dois.”
          </p>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            to="/solucao"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
          >
            Entenda em detalhe
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
