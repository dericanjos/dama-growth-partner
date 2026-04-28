import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Headset, LineChart, Target, ShieldCheck, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Operação Comercial Estratégica para Médicos",
  provider: { "@type": "Organization", name: "Grupo DAMA" },
  description:
    "Time comercial, growth marketing e marketing 360 integrados para consultórios médicos",
  areaServed: { "@type": "Country", name: "BR" },
  serviceType: "Operação Comercial para Consultórios Médicos",
};

export const Route = createFileRoute("/solucao")({
  head: () => ({
    meta: [
      { title: "Nossa Solução | Grupo DAMA — Time Comercial, Growth, Marketing 360" },
      {
        name: "description",
        content:
          "Conheça a operação integrada do Grupo DAMA: time comercial estratégico, growth marketing orientado por dados e marketing 360 para consultórios médicos.",
      },
      { property: "og:title", content: "Nossa Solução | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Time comercial + growth marketing + marketing 360 em uma operação integrada para médicos.",
      },
      { property: "og:url", content: "https://grupodamahealth.com.br/solucao" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/solucao" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
    ],
  }),
  component: SolutionPage,
});

const PILLARS = [
  {
    icon: Headset,
    title: "Time Comercial",
    pitch:
      "Profissionais treinados que atendem, qualificam e agendam seus pacientes. De nada adianta atrair se ninguém converte. Nosso time atua na linha de frente com empatia, técnica de vendas consultivas e acompanhamento de cada lead através do nosso método D.A.M.A.",
    deliveries: [
      "Atendimento humanizado de leads em WhatsApp para agendamento de consultas e avaliações",
      "Qualificação e tratamento de objeções com abordagem consultiva",
      "Follow-up de leads não agendados",
      "Reativação de pacientes inativos da base",
      "Prospecção ativa de pacientes indicados",
    ],
  },
  {
    icon: LineChart,
    title: "Growth",
    pitch:
      "Estruturamos o crescimento do seu consultório através de uma solução completa baseada em estudo e análise de dados para criação de processos e alavancas. Nosso growth conecta marketing, comercial, gestão e tecnologia para aumentar conversão, retenção e recorrência de pacientes, construindo uma operação preparada para crescer de forma sustentável no longo prazo e à prova de crises.",
    deliveries: [
      "Estruturação de funis, processos comerciais e estratégias de crescimento",
      "Desenvolvimento de planos de acompanhamento e recorrência para pacientes",
      "Mapeamento da jornada do paciente e otimização de conversão",
      "Definição de KPIs, metas e dashboards de performance",
      "Análise contínua de dados, métricas e indicadores estratégicos",
      "Reuniões periódicas de (re)alinhamento, performance e tomada de decisão",
    ],
  },
  {
    icon: Target,
    title: "Marketing Médico",
    pitch:
      "Posicionamos o médico de forma estratégica para atrair os pacientes certos. Conteúdo, tráfego pago, SEO, branding e autoridade trabalhando juntos para gerar reconhecimento e demanda de novas oportunidades diariamente.",
    deliveries: [
      "Gestão estratégica de tráfego pago (Google e Meta Ads) com criativos autorais e campanhas orientadas por performance",
      "Planejamento e produção de conteúdo para Instagram alinhado às diretrizes do CFM",
      "Otimização de Google Meu Negócio e estratégias de SEO local para aumento de visibilidade",
      "Gestão de reputação online, avaliações e fortalecimento da autoridade digital",
      "Padronização da identidade visual e posicionamento estratégico da marca médica",
      "Relatórios gerenciais e acompanhamento contínuo de métricas e performance",
    ],
  },
];

function SolutionPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Nossa Solução
          </span>
          <h1 className="heading-display text-[34px] leading-[1.1] md:text-[56px]">
            <span className="gold-text">
              O que fazemos pelos nossos médicos parceiros.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-white/75 md:text-[17px]">
            Uma operação integrada em três frentes. Não é agência. Não é terceirização avulsa. É o time que opera o crescimento do seu consultório.
          </p>
        </div>
      </section>

      {/* PILLARS DETAILED */}
      <section className="bg-[var(--cream)] py-24 md:py-32">
        <div className="container-dama mx-auto max-w-5xl space-y-10 md:space-y-14">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card-dama overflow-hidden">
                <div className="grid md:grid-cols-[1fr_1.3fr]">
                  <div
                    className="relative flex flex-col justify-center p-8 md:p-12"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%)",
                    }}
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_14%,transparent)] text-[var(--gold-light)]">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <div className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-light)]">
                      Pilar {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] leading-[1.15] text-white md:text-[34px]">
                      {p.title}
                    </h2>
                    <p className="mt-5 text-[14.5px] leading-[1.75] text-white/70">
                      {p.pitch}
                    </p>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                      O que está incluído
                    </div>
                    <ul className="mt-6 space-y-4">
                      {p.deliveries.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold-deep)]">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          <span className="text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTEGRATION QUOTE */}
      <section className="bg-[var(--cream)] pb-24 md:pb-32">
        <div className="container-dama mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-serif text-[22px] italic leading-[1.5] text-[var(--navy)] md:text-[28px]">
              “Marketing gera oportunidades. O comercial transforma interesse em faturamento. O growth organiza toda a operação para sustentar o seu crescimento no longo prazo. É assim que a DAMA opera.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* CFM */}
      <section className="surface-dark relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_14%,transparent)] text-[var(--gold-light)]">
              <ShieldCheck className="h-8 w-8" strokeWidth={1.6} />
            </div>
            <h2 className="heading-display mt-6 text-[28px] md:text-[40px]">
              <span className="gold-text">100% em conformidade com o CFM.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-white/70 md:text-base">
              Toda a operação — atendimento, comunicação, conteúdo e marketing — é construída dentro das normas do Conselho Federal de Medicina. O médico parceiro dorme tranquilo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="heading-display text-[28px] md:text-[40px]">
              Quer essa operação no seu consultório?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-[var(--text-secondary)] md:text-base">
              A parceria DAMA é exclusiva e seletiva. Conheça os critérios e as condições.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <a
                href={`https://wa.me/5521959214292?text=${encodeURIComponent("Olá, Jessica! Vim do site do Grupo DAMA e gostaria de saber mais sobre os serviços e como funciona a parceria.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Falar com a equipe <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
