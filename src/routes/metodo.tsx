import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Megaphone, CalendarCheck, Activity } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o Método D.A.M.A?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Método D.A.M.A é a filosofia proprietária do Grupo DAMA composta por 4 pilares: Diagnosticar, Atrair, Marcar e Acompanhar.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona a operação comercial da DAMA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Grupo DAMA integra time comercial, growth marketing e marketing 360 numa operação que funciona como extensão do consultório do médico.",
      },
    },
  ],
};

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
      { property: "og:url", content: "https://grupodamahealth.com.br/metodo" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/metodo" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
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
      "Antes de qualquer estratégia, analisamos profundamente a operação do seu consultório. Agenda, atendimento, taxa de conversão, posicionamento, processos comerciais, retenção de pacientes e indicadores financeiros são avaliados para identificar exatamente onde estão os gargalos que limitam o seu crescimento.",
      "Acreditamos que crescimento sem diagnóstico gera desperdício. Por isso, o Método D.A.M.A começa entendendo o cenário real da operação para construir decisões estratégicas baseadas em dados, previsibilidade e oportunidades concretas de melhoria.",
    ],
  },
  {
    letter: "A",
    icon: Megaphone,
    title: "Atrair",
    paragraphs: [
      "Após identificar os gargalos da operação, estruturamos a captação estratégica de pacientes através de marketing médico, posicionamento digital, tráfego pago, SEO local, branding e produção de conteúdo alinhado à percepção de valor do médico.",
      "O objetivo não é apenas gerar volume, mas atrair pacientes mais qualificados e alinhados ao perfil do seu consultório. A atração precisa acontecer de forma inteligente para alimentar a operação comercial com oportunidades reais de conversão.",
    ],
  },
  {
    letter: "M",
    icon: CalendarCheck,
    title: "Marcar",
    paragraphs: [
      "Lead sem conversão não traz faturamento. Seguidores em Instagram é métrica de vaidade. Por isso, o time comercial da DAMA atua diretamente na linha de frente do atendimento, conduzindo cada paciente com comunicação estratégica através de um atendimento humanizado e técnicas consultivas de conversão.",
      "Nosso foco é transformar interesse em agendamento através de processos claros, acompanhamento estruturado e redução das perdas comerciais que normalmente acontecem dentro da operação do consultório.",
    ],
  },
  {
    letter: "A",
    icon: Activity,
    title: "Acompanhar",
    paragraphs: [
      "Crescimento sustentável exige acompanhamento contínuo. Monitoramos métricas, analisamos indicadores estratégicos e realizamos ajustes constantes na operação para aumentar previsibilidade, retenção de pacientes e performance comercial.",
      "Mais do que executar processos, acompanhamos a evolução do consultório de forma ativa, garantindo que marketing, comercial e growth continuem operando de maneira integrada, inteligente e sustentável no longo prazo.",
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
            Mais do que um método de atendimento, um sistema operacional construído para transformar relacionamento em crescimento previsível através de processos à prova de crises.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal className="space-y-6 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
            <p>
              O Método D.A.M.A é a filosofia que guia cada decisão dentro da operação. Não é um framework genérico copiado de livro de marketing. É a forma como aprendemos a operar consultórios médicos depois de mais de 90 parcerias e centenas de milhares de interações com pacientes reais.
            </p>
            <p>
              São quatro pilares (Diagnosticar, Atrair, Marcar e Acompanhar) que se aplicam em ciclo, não em linha reta. A operação roda continuamente: diagnostica, atrai, marca, acompanha, e o aprendizado de cada ciclo alimenta o próximo.
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
            <span className="gold-text">Quer o Método D.A.M.A operando no seu consultório?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
            Entenda como estruturamos consultórios para crescerem com previsibilidade e consistência através de processos bem definidos.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href={`https://wa.me/5521959214292?text=${encodeURIComponent("Olá, Jessica! Vim do site do Grupo DAMA e gostaria de saber mais sobre os serviços e como funciona a parceria.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Falar com a equipe <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
