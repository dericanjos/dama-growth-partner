import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/glossario")({
  head: () => ({
    meta: [
      { title: "Glossário de Operação Comercial Médica | Grupo DAMA" },
      {
        name: "description",
        content:
          "Glossário completo de termos de operação comercial para consultórios médicos: lead, conversão, no-show, follow-up, CPA, ROAS, E-E-A-T e mais.",
      },
      { property: "og:title", content: "Glossário de Operação Comercial Médica" },
      {
        property: "og:description",
        content:
          "Termos essenciais de operação comercial para consultórios médicos.",
      },
      { property: "og:url", content: "https://grupodamahealth.com.br/glossario" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/glossario" }],
  }),
  component: GlossarioPage,
});

type Term = { id: string; name: string; description: string };

const TERMS: Term[] = [
  {
    id: "operacao-comercial-medica",
    name: "Operação Comercial Médica",
    description:
      "Conjunto de processos que cobre desde o primeiro contato de um paciente até a consulta confirmada, incluindo atendimento de leads, qualificação, agendamento, confirmação, follow-up e reativação de pacientes inativos. Diferente de marketing (que atrai) e de secretariado (que informa), a operação comercial converte.",
  },
  {
    id: "lead",
    name: "Lead",
    description:
      "Paciente potencial que demonstrou interesse no consultório, seja mandando mensagem pelo WhatsApp, preenchendo formulário no site, ligando ou interagindo nas redes sociais. Todo lead é uma oportunidade de consulta.",
  },
  {
    id: "taxa-de-conversao",
    name: "Taxa de Conversão",
    description:
      "Percentual de leads que efetivamente agendam consulta. Se 100 leads chegam e 20 agendam, a taxa de conversão é 20%. Consultórios sem processo comercial operam com taxas entre 5% e 10%. Com processo estruturado, a taxa pode ultrapassar 25%.",
  },
  {
    id: "no-show",
    name: "No-Show (Falta)",
    description:
      "Quando o paciente agenda consulta e não comparece sem avisar. A taxa média de no-show em consultórios brasileiros varia entre 20% e 30%. Cada falta representa receita perdida e custo fixo desperdiçado.",
  },
  {
    id: "follow-up",
    name: "Follow-Up",
    description:
      "Contato de acompanhamento com pacientes que demonstraram interesse mas não agendaram na primeira interação. A maioria das conversões em vendas consultivas acontece entre o segundo e o sétimo contato.",
  },
  {
    id: "qualificacao-de-lead",
    name: "Qualificação de Lead",
    description:
      "Processo de entender se o paciente tem perfil, necessidade e condições pra agendar consulta. Leads qualificados têm maior probabilidade de comparecer e se tornar pacientes recorrentes.",
  },
  {
    id: "ticket-medio",
    name: "Ticket Médio",
    description:
      "Valor médio que cada paciente gera por consulta ou procedimento. É uma das métricas mais importantes pra calcular o retorno de investimentos em marketing e operação comercial.",
  },
  {
    id: "cpa",
    name: "CPA (Custo por Aquisição)",
    description:
      "Quanto custa, em média, pra transformar um lead em paciente na cadeira. Se o consultório investe R$3.000 em marketing e conquista 15 pacientes novos, o CPA é R$200.",
  },
  {
    id: "roas",
    name: "ROAS (Return on Ad Spend)",
    description:
      "Retorno sobre investimento em anúncios. Um ROAS de 5:1 significa que pra cada R$1 investido em anúncio, o consultório faturou R$5 em consultas.",
  },
  {
    id: "trafego-pago",
    name: "Tráfego Pago",
    description:
      "Estratégia de investir em plataformas de anúncio (Google Ads, Meta Ads) pra colocar o consultório na frente de pacientes que estão pesquisando ou navegando online. Diferente do tráfego orgânico, gera resultado imediato.",
  },
  {
    id: "trafego-organico",
    name: "Tráfego Orgânico (SEO)",
    description:
      "Visitantes que chegam ao site do consultório através de resultados não pagos do Google. Construído por conteúdo otimizado, blog e presença no Google Meu Negócio. Demora mais pra gerar resultado, mas é gratuito e contínuo.",
  },
  {
    id: "google-meu-negocio",
    name: "Google Meu Negócio",
    description:
      "Ferramenta gratuita do Google que permite cadastrar o consultório e exibir informações nos resultados de busca e no Google Maps. É o primeiro passo de presença digital pra qualquer consultório.",
  },
  {
    id: "e-e-a-t",
    name: "E-E-A-T",
    description:
      "Experience, Expertise, Authoritativeness, Trustworthiness. Critérios que o Google usa pra avaliar a qualidade de conteúdo, especialmente em saúde (YMYL). Sites com autor identificado, fontes confiáveis e experiência comprovada ranqueiam melhor.",
  },
  {
    id: "ymyl",
    name: "YMYL (Your Money or Your Life)",
    description:
      "Categoria do Google pra conteúdo que pode impactar a saúde, finanças ou segurança do usuário. Sites médicos são YMYL e passam por avaliação mais rigorosa de qualidade.",
  },
  {
    id: "lista-de-espera-ativa",
    name: "Lista de Espera Ativa",
    description:
      "Lista de pacientes que querem consulta mas não encontraram horário. Quando um cancelamento acontece, a equipe contacta imediatamente quem está na lista. Transforma cancelamento em atendimento.",
  },
  {
    id: "reativacao-de-pacientes",
    name: "Reativação de Pacientes",
    description:
      "Processo de contactar pacientes que já vieram ao consultório mas não retornaram. É a fonte de receita mais barata que existe: o paciente já conhece o médico e já confia.",
  },
  {
    id: "funil-de-conversao",
    name: "Funil de Conversão",
    description:
      "Representação das etapas que o paciente percorre desde o primeiro contato até a consulta realizada. Cada etapa tem uma taxa de conversão, e identificar onde os pacientes 'escapam' é fundamental pra otimizar o processo.",
  },
  {
    id: "taxa-de-retorno",
    name: "Taxa de Retorno",
    description:
      "Percentual de pacientes que voltam pra uma segunda consulta ou mais. Consultórios com processo de reativação têm taxas de retorno significativamente maiores.",
  },
  {
    id: "confirmacao-em-dois-estagios",
    name: "Confirmação em Dois Estágios",
    description:
      "Processo de confirmar consulta em dois momentos: 48 horas antes (pra identificar cancelamentos e preencher com lista de espera) e 2 horas antes (lembrete final com endereço e instruções).",
  },
  {
    id: "metodo-dama",
    name: "Método D.A.M.A",
    description:
      "Framework proprietário do Grupo DAMA pra estruturar a operação comercial de consultórios médicos. As letras representam as 4 etapas do processo: Diagnosticar, Atrair, Marcar e Acompanhar.",
  },
];

function GlossarioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossário de Operação Comercial Médica",
    description:
      "Termos essenciais de operação comercial para consultórios médicos",
    url: "https://grupodamahealth.com.br/glossario",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `https://grupodamahealth.com.br/glossario#${t.id}`,
      name: t.name,
      description: t.description,
      inDefinedTermSet: "https://grupodamahealth.com.br/glossario",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="surface-dark hero-glow relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Referência
          </span>
          <h1 className="heading-display text-[36px] md:text-[56px]">
            <span className="gold-text">Glossário</span> de Operação Comercial Médica
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-white/70">
            Os 20 termos que todo médico empresário precisa dominar pra entender
            crescimento de consultório, marketing médico e gestão de pacientes.
          </p>
        </div>
      </section>

      {/* Index of terms */}
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-8">
        <div className="container-dama mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-2">
            {TERMS.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--gold)] hover:text-[var(--navy)]"
              >
                {t.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama mx-auto max-w-3xl">
          <dl className="space-y-10">
            {TERMS.map((t) => (
              <div
                key={t.id}
                id={t.id}
                className="scroll-mt-28 border-b border-[var(--border)] pb-8 last:border-0"
              >
                <dt className="font-serif text-[22px] font-semibold text-[var(--navy)] md:text-[26px]">
                  {t.name}
                </dt>
                <dd className="mt-3 text-[16px] leading-[1.75] text-[var(--text-secondary)]">
                  {t.description}
                </dd>
              </div>
            ))}
          </dl>

          {/* CTA */}
          <div
            className="mt-16 rounded-[14px] border p-8 text-center md:p-10"
            style={{
              background:
                "linear-gradient(180deg, var(--navy-light) 0%, var(--navy) 100%)",
              borderColor: "color-mix(in oklab, var(--gold) 28%, transparent)",
            }}
          >
            <h2 className="font-serif text-[24px] font-semibold text-white md:text-[28px]">
              Quer entender como esses conceitos se aplicam ao seu consultório?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-white/70">
              Conheça como a DAMA trabalha a operação comercial de médicos
              parceiros em 16 estados.
            </p>
            <a
              href="https://comercial.grupodamahealth.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-7"
            >
              Conhecer a Parceria DAMA →
            </a>
            <div className="mt-4">
              <Link
                to="/blog"
                className="text-xs uppercase tracking-[0.16em] text-[var(--gold)] hover:text-[var(--gold-light)]"
              >
                Ler artigos do blog →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
