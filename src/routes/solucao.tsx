import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headset, LineChart, Target, ShieldCheck, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Operação Comercial Estratégica para Médicos",
  provider: { "@type": "Organization", name: "Grupo DAMA Health" },
  description:
    "Operação comercial, growth e marketing médico integrados dentro do consultório, com método auditável e indicadores semanais.",
  areaServed: { "@type": "Country", name: "BR" },
  serviceType: "Operação Comercial para Consultórios Médicos",
  audience: { "@type": "Audience", audienceType: "Médicos donos de consultório ou clínica particular" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Frentes da operação DAMA",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Operação Comercial" },
      { "@type": "OfferCatalog", name: "Growth" },
      { "@type": "OfferCatalog", name: "Marketing Médico" },
    ],
  },
};

export const Route = createFileRoute("/solucao")({
  head: () => ({
    meta: [
      { title: "Nossa Solução para Médicos | Grupo DAMA" },
      {
        name: "description",
        content:
          "Conheça a operação integrada do Grupo DAMA: operação comercial estratégica, growth marketing orientado por dados e marketing 360 para consultórios médicos.",
      },
      { property: "og:title", content: "Nossa Solução | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Operação comercial + growth marketing + marketing 360 em uma operação integrada para médicos.",
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
    title: "Operação Comercial",
    label: "Frente 01",
    lead: "Atendimento responde perguntas. Operação comercial conduz pacientes.",
    paragraphs: [
      "É a frente que trabalha dentro da conversa. Cada contato que chega ao consultório passa por um processo desenhado: quem é essa pessoa, o que ela precisa ouvir, qual o próximo passo, e quem garante que esse passo aconteça.",
    ],
    listTitle: "O que essa frente opera no dia a dia",
    deliveries: [
      "Primeiro contato com tempo de resposta medido, não estimado",
      "Condução da conversa até a agenda, sem pressão e sem deixar o paciente no vácuo",
      "Tratamento de objeção com repertório treinado, não com improviso",
      "Follow-up de quem não respondeu, em cadência definida",
      "Confirmação e gestão de no-show, com quem falta sendo chamado de volta",
      "Reativação de quem já foi paciente e parou de voltar",
      "Registro de tudo em CRM, para que a decisão da semana seguinte tenha base",
    ],
    footer:
      "A conformidade com as normas do CFM não é uma camada adicionada no fim. Ela está dentro do roteiro: valores nunca são públicos, o motivo do contato é sempre clínico e nunca promocional, e nenhuma abordagem promete resultado.",
  },
  {
    icon: LineChart,
    title: "Growth",
    label: "Frente 02",
    lead: "É a frente que olha para os números e transforma dado em decisão.",
    paragraphs: [
      "A maioria dos consultórios tem dados e não tem leitura. Sabe quantos pacientes atendeu, não sabe quantos contatos chegaram, quantos viraram agenda, quantos faltaram, quantos voltaram. Sem esses quatro números, qualquer investimento em marketing é aposta.",
    ],
    listTitle: "O que essa frente entrega",
    deliveries: [
      "Diagnóstico do funil real do consultório, do primeiro contato ao retorno",
      "Indicadores acompanhados semanalmente, com o número comparado ao próprio ponto de partida",
      "Identificação de onde a receita está escapando, em qual etapa e em qual volume",
      "Teste e correção de rota, com hipótese declarada antes de mudar",
      "Leitura honesta da evolução, inclusive quando o número piora",
    ],
    footer: null,
  },
  {
    icon: Target,
    title: "Marketing Médico",
    label: "Frente 03",
    lead: "É a frente que gera oportunidade, e ela vem por último de propósito.",
    paragraphs: [
      "Investir em atrair antes de organizar quem recebe é a forma mais cara de descobrir que o problema não era o volume. Por isso, no método da DAMA, o marketing entra quando a operação já sustenta o que ele vai trazer.",
    ],
    listTitle: "O que essa frente cobre",
    deliveries: [
      "Presença digital do consultório, dentro da Resolução CFM 2.336/2023",
      "Conteúdo que constrói autoridade da especialidade, com abordagem sintoma-primeiro",
      "Tráfego pago quando faz sentido, com o custo por paciente agendado medido, não o custo por clique",
      "Material de apoio para a conversa comercial, coerente com o que a operação executa",
    ],
    footer: null,
  },
];

const CAMADAS = [
  {
    title: "A que entra.",
    text: "O contato que chegou e não virou agenda. É a camada mais visível e a mais subestimada: o paciente perguntou, ninguém conduziu, ele foi para o próximo.",
  },
  {
    title: "A que volta.",
    text: "O paciente que já foi atendido e parou de retornar. Não é captação, é continuidade de acompanhamento, e depende de alguém lembrar dele antes de ele lembrar do consultório.",
  },
  {
    title: "A que não escapa.",
    text: "O follow-up que ninguém fez, a objeção que ninguém tratou, a falta que ninguém remarcou. É a camada mais silenciosa, porque nunca aparece em relatório: ninguém registra o paciente que não voltou.",
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
              Operação comercial, growth e marketing médico em uma estrutura só.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-white/75 md:text-[17px]">
            Marketing gera oportunidades. A operação transforma oportunidades em
            receita. Sem operação, o marketing apenas acelera desperdícios. É por
            isso que a DAMA não entrega uma peça isolada: entrega as três frentes
            rodando juntas, dentro do seu consultório, com um método que você
            consegue auditar.
          </p>
        </div>
      </section>

      {/* DISTINÇÃO */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[38px]">
              Antes das três frentes, uma distinção
            </h2>
            <p className="mt-6 font-serif text-[19px] leading-[1.6] text-[var(--navy)] md:text-[22px]">
              Secretária executa tarefas. Agência gera tráfego. Consultoria entrega
              conhecimento. A DAMA constrói infraestrutura.
            </p>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                Essa não é uma diferença de tamanho, é de natureza. Uma secretária
                responde ao que chega. Uma agência aumenta o que chega. Uma
                consultoria explica o que fazer com o que chega. Nenhuma das três
                assume a responsabilidade de conduzir o paciente do primeiro
                contato até a agenda, medir onde ele desistiu e corrigir a rota na
                semana seguinte.
              </p>
              <p>
                Consultórios não crescem porque trabalham mais. Crescem porque
                possuem uma estrutura capaz de sustentar o crescimento.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FRENTES */}
      <section className="bg-[var(--cream)] pb-24 md:pb-32">
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
                      {p.label}
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] leading-[1.15] text-white md:text-[34px]">
                      {p.title}
                    </h2>
                    <p className="mt-5 font-serif text-[16px] leading-[1.6] text-[var(--gold-light)]">
                      {p.lead}
                    </p>
                    {p.paragraphs.map((t) => (
                      <p key={t} className="mt-4 text-[14.5px] leading-[1.75] text-white/70">
                        {t}
                      </p>
                    ))}
                  </div>

                  <div className="p-8 md:p-12">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-deep)]">
                      {p.listTitle}
                    </h3>
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
                    {p.footer ? (
                      <p className="mt-7 border-t border-[var(--gold)]/20 pt-6 text-[14.5px] leading-[1.75] text-[var(--text-secondary)]">
                        {p.footer}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CAMADAS DA RECEITA */}
      <section className="surface-dark relative overflow-hidden py-24 md:py-28">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-4xl">
          <Reveal>
            <h2 className="heading-display text-[26px] md:text-[40px]">
              <span className="gold-text">As três camadas da receita protegida</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/70">
              Receita protegida não é receita nova. É a que já estava ali e não
              chegava até o fim.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CAMADAS.map((c, i) => (
              <Reveal key={c.title} delay={i * 90} className="card-dark p-7">
                <h3 className="font-serif text-[20px] text-[var(--gold-light)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.75] text-white/70">
                  {c.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE NÃO PROMETEMOS */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[38px]">
              O que a DAMA não promete
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p className="font-serif text-[19px] leading-[1.6] text-[var(--navy)] md:text-[21px]">
                Não prometemos resultado. Não datamos resultado. Não garantimos
                número.
              </p>
              <p>
                Resultado não é sorte, é método. E método a DAMA garante: o método
                aplicado, a estrutura rodando, transparência sobre os números e
                correção de rota quando o dado pedir.
              </p>
              <p>
                Se alguém garantir a você um percentual de crescimento em um prazo
                fechado, desconfie. Nem a operação mais bem construída controla a
                decisão do paciente, a sazonalidade da especialidade ou a economia
                do ano.
              </p>
            </div>
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
              Toda a operação (atendimento, comunicação, conteúdo e marketing) é construída dentro das normas do Conselho Federal de Medicina. O médico parceiro dorme tranquilo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FECHO INSTITUCIONAL */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              As três frentes descritas aqui compõem a operação comercial da DAMA, oferecida a
              médicos parceiros em processo seletivo próprio.
            </p>
            <p className="mt-6 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <a
                href="https://comercial.grupodamahealth.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
              >
                Conhecer a operação comercial
              </a>
            </p>
            <p className="mt-3 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <Link
                to="/contato"
                className="text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
              >
                Falar com a DAMA
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

    </>
  );
}
