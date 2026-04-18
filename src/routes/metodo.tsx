import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Megaphone, CalendarCheck, Activity } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método D.A.M.A | Diagnosticar, Atrair, Marcar, Acompanhar" },
      {
        name: "description",
        content:
          "Método D.A.M.A — a filosofia proprietária do Grupo DAMA. Quatro pilares que transformam consultórios em operações previsíveis.",
      },
      { property: "og:title", content: "Método D.A.M.A | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Diagnosticar, Atrair, Marcar, Acompanhar — o método que guia a operação DAMA.",
      },
    ],
  }),
  component: MethodPage,
});

const STEPS = [
  {
    letter: "D",
    icon: Search,
    title: "Diagnosticar",
    paragraphs: [
      "Antes de investir um centavo em mídia ou contratar uma única pessoa, mapeamos a operação inteira: como funciona a agenda, quem atende os contatos, qual o tempo médio de resposta, qual a taxa de conversão por canal, qual o ticket médio, quais especialidades performam mais.",
      "Identificamos onde o faturamento está vazando. Quase sempre o problema não é a falta de pacientes — é a perda silenciosa em pontos invisíveis para quem está dentro da operação no dia a dia.",
      "Esse diagnóstico é o que dá direção a tudo o que vem depois. Sem ele, qualquer ação é tiro no escuro.",
    ],
  },
  {
    letter: "A",
    icon: Megaphone,
    title: "Atrair",
    paragraphs: [
      "Com o diagnóstico em mãos, ativamos as alavancas certas para o momento do consultório: tráfego pago bem segmentado, presença digital consistente, SEO local, conteúdo estratégico que educa e posiciona autoridade.",
      "O objetivo não é gerar volume vazio. É atrair pacientes qualificados — pessoas que têm a queixa que o médico trata, condição financeira para a consulta particular e disposição real para agendar.",
      "Cada peça publicada respeita 100% as normas do CFM. Marketing médico ético não é uma limitação — é o caminho.",
    ],
  },
  {
    letter: "M",
    icon: CalendarCheck,
    title: "Marcar",
    paragraphs: [
      "Aqui entra o time comercial. Cada lead que chega é atendido por profissionais treinados em vendas consultivas para o contexto médico — não atendentes genéricos com script de e-commerce.",
      "Resposta rápida, escuta atenta, qualificação técnica, tratamento de objeções com empatia, apresentação de valor antes do preço, fechamento da consulta com data e hora.",
      "Cada lead vira uma oportunidade real. Cada agendamento é confirmado. Cada não-comparecimento gera uma tentativa de reagendamento. Nada se perde por desatenção.",
    ],
  },
  {
    letter: "A",
    icon: Activity,
    title: "Acompanhar",
    paragraphs: [
      "Crescimento monitorado é crescimento sustentável. Acompanhamos métricas semanais, fazemos follow-up de leads não agendados, reativamos pacientes inativos da base, reduzimos faltas com lembretes inteligentes.",
      "Reuniões mensais com o médico transformam dados em decisão: o que escalar, o que cortar, onde dobrar a aposta.",
      "Não abandonamos o consultório com um relatório. Andamos junto, mês após mês, ajustando rota até a meta virar realidade.",
    ],
  },
];

function MethodPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Método Proprietário
          </span>
          <h1 className="heading-display text-[44px] leading-[1.05] md:text-[80px]">
            <span className="gold-text">Método D.A.M.A</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.7] text-white/80 md:text-[19px]">
            Crescimento previsível não é sorte. É método.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal className="space-y-6 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
            <p>
              O Método D.A.M.A é a filosofia que guia cada decisão dentro da operação. Não é um framework genérico copiado de livro de marketing — é a forma como aprendemos a operar consultórios médicos depois de mais de 90 parcerias e centenas de milhares de interações com pacientes reais.
            </p>
            <p>
              São quatro pilares — Diagnosticar, Atrair, Marcar e Acompanhar — que se aplicam em ciclo, não em linha reta. A operação roda continuamente: diagnostica, atrai, marca, acompanha, e o aprendizado de cada ciclo alimenta o próximo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CIRCULAR DIAGRAM */}
      <section className="bg-[var(--cream)] pb-20 md:pb-28">
        <div className="container-dama">
          <Reveal>
            <div className="card-dama relative mx-auto max-w-2xl px-6 py-12 md:py-16">
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                {STEPS.map((s) => (
                  <div
                    key={s.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--gold)]/40 bg-[var(--gold-soft)] font-serif text-5xl text-[var(--gold-deep)] md:h-24 md:w-24 md:text-6xl">
                      {s.letter}
                    </div>
                    <div className="mt-3 font-serif text-[18px] text-[var(--navy)] md:text-[20px]">
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                <span className="h-px w-10 bg-[var(--gold)]/40" />
                Ciclo contínuo
                <span className="h-px w-10 bg-[var(--gold)]/40" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEPS DETAILED */}
      <section className="bg-[var(--cream)] pb-24 md:pb-32">
        <div className="container-dama mx-auto max-w-3xl space-y-10 md:space-y-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article
                className="card-dama p-8 md:p-12"
                style={{ borderLeft: "4px solid var(--gold)" }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] font-serif text-3xl text-[var(--gold)]">
                    {s.letter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                      <s.icon className="h-3.5 w-3.5" />
                      Etapa {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] leading-[1.15] text-[var(--navy)] md:text-[34px]">
                      {s.title}
                    </h2>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
                  {s.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark relative overflow-hidden py-24 md:py-28">
        <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <h2 className="heading-display text-[28px] md:text-[42px]">
            <span className="gold-text">Quer aplicar o Método no seu consultório?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
            Conheça a parceria que coloca o Método D.A.M.A operando dentro do seu consultório, todos os dias.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://parceria.grupodama.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Conhecer a Parceria <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Falar com a equipe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
