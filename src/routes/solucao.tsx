import { createFileRoute, Link } from "@tanstack/react-router";
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
      { property: "og:url", content: "https://grupodama.com.br/solucao" },
    ],
    links: [{ rel: "canonical", href: "https://grupodama.com.br/solucao" }],
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
      "Profissionais treinados que atendem, qualificam e agendam. Vender consulta médica é uma especialidade — e ela exige técnica, empatia e processo.",
    deliveries: [
      "Atendimento de leads em WhatsApp, Instagram, Google e telefone",
      "Qualificação e tratamento de objeções com abordagem consultiva",
      "Agendamento, confirmação e reagendamento de consultas",
      "Follow-up de leads não agendados",
      "Reativação de pacientes inativos da base",
      "Controle de faltas e otimização de agenda",
    ],
  },
  {
    icon: LineChart,
    title: "Growth Marketing",
    pitch:
      "Crescimento orientado por dados. Cada decisão é baseada em número, não em achismo. Funil mapeado, métricas semanais, otimizações contínuas.",
    deliveries: [
      "Mapeamento e análise de funil de conversão",
      "Definição de KPIs e dashboards semanais",
      "Testes A/B em campanhas e abordagens comerciais",
      "Análise de ticket médio e taxa de conversão por canal",
      "Reuniões mensais de performance com o médico",
      "Recomendações estratégicas baseadas em dados",
    ],
  },
  {
    icon: Target,
    title: "Marketing 360",
    pitch:
      "Tráfego pago, presença digital, reputação online e SEO local. Colocamos o consultório na frente de quem já procura o que ele oferece.",
    deliveries: [
      "Gestão de tráfego pago (Google, Meta) com criativos próprios",
      "Conteúdo educativo para Instagram dentro das normas do CFM",
      "Otimização de Google Meu Negócio e SEO local",
      "Gestão de reputação online e respostas a avaliações",
      "Identidade visual e padronização da presença digital",
      "Relatórios mensais consolidados",
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
              O que o Grupo DAMA faz pelos médicos parceiros.
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
              “Time comercial sem marketing é operação sem combustível. Marketing sem time comercial é investimento jogado fora. A DAMA integra os dois — e adiciona dados em cima.”
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
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-white px-7 py-3.5 text-sm font-medium text-[var(--navy)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-deep)]"
              >
                Falar com a equipe <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
