import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const PARCERIA_URL = "https://comercial.grupodamahealth.com.br";
const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31b1d445-4e56-411d-ab3f-2948c07f7b3b/id-preview-0bff959b--2e798cd7-2d1d-4ad2-916f-065fb6ba88f2.lovable.app-1776559781456.png";

type FaqItem = { id: string; q: string; a: string };

const FAQS: FaqItem[] = [
  {
    id: "ia-pessoas",
    q: "O atendimento aos meus pacientes é feito por IA ou por pessoas?",
    a: "Pessoas, sempre. O time comercial da DAMA é formado por profissionais treinados pra atender cada paciente com escuta real, linguagem natural e técnica de venda consultiva. Aqui não tem chatbot, não tem resposta automática genérica e o atendimento humano não é delegado pra IA em nenhum momento. O paciente do nosso parceiro precisa sentir, já na primeira mensagem no WhatsApp, o mesmo cuidado que teria dentro do consultório.",
  },
  {
    id: "preco",
    q: "Quanto custa a parceria?",
    a: "Cada parceria é montada de forma personalizada, então o investimento varia bastante. Depende do estágio em que o consultório está hoje, da especialidade, do volume de pacientes que a estrutura precisa atender e dos pilares que entram na operação (Time Comercial, Growth, Marketing Médico ou os três juntos). Por isso a gente não trabalha com tabela fixa: o valor é apresentado dentro da reunião de diagnóstico, depois que conhecemos o cenário real do seu consultório. A reunião é gratuita e dá pra agendar pelo botão Seja Parceiro.",
  },
  {
    id: "tempo-resultado",
    q: "Em quanto tempo eu vejo resultado?",
    a: "Resposta honesta: depende. E qualquer empresa que prometer prazo fixo, na real, tá te enganando. O que dá pra garantir é o ritmo do método. Em geral os primeiros impactos aparecem já nas primeiras semanas, com queda de no-show e melhora na conversão dos leads. Os resultados mais estruturais, tipo aumento previsível de faturamento e construção de recorrência, costumam consolidar entre 3 e 12 meses. Esse ritmo varia conforme especialidade, região, ticket médio e o volume de pacientes que sua estrutura aguenta atender bem.",
  },
  {
    id: "especialidades",
    q: "Vocês atendem qualquer especialidade?",
    a: "Sim. A gente já atende parceiros de várias especialidades: cardiologia, pediatria, neurocirurgia, psiquiatria, reumatologia, dermatologia, entre outras. O método D.A.M.A. (Diagnosticar, Atrair, Marcar, Acompanhar) se adapta ao perfil clínico de cada um. Na reunião de diagnóstico a gente já mapeia como a estrutura se ajusta à sua especialidade e ao seu ticket médio.",
  },
  {
    id: "estados",
    q: "Vocês operam em qualquer estado do Brasil?",
    a: "Sim. A operação é toda digital e hoje a gente atende parceiros em mais de 16 estados, tanto em capitais e regiões metropolitanas quanto no interior. O atendimento ao paciente é feito remotamente pela equipe DAMA, e o agendamento entra direto na agenda do consultório do parceiro, não importa em qual cidade do Brasil ele esteja.",
  },
  {
    id: "time-fixo",
    q: "Quem vai cuidar do meu consultório? Pessoa fixa ou time rotativo?",
    a: "Cada parceiro tem um time dedicado com pontos de contato fixos e responsáveis claros por área. A DAMA não opera no modelo de plantão onde qualquer atendente pega qualquer caso. Os profissionais que cuidam do seu consultório conhecem sua especialidade, o tom de voz da sua marca, os procedimentos que você oferece e as particularidades do dia a dia. É justamente isso que separa uma operação estratégica de uma terceirização avulsa.",
  },
  {
    id: "diferenca-agencia",
    q: "Qual a diferença entre o Grupo DAMA e uma agência de marketing comum?",
    a: "A diferença está numa palavra: completude. Agência de marketing trabalha uma fatia da operação, geralmente tráfego pago ou presença digital, e devolve cliques pra você se virar com eles. A DAMA é uma solução completa, que opera de forma integrada todas as frentes que decidem o crescimento real de um consultório: Time Comercial humanizado, Growth orientado por dados, Marketing Médico estratégico e Tecnologia exclusiva, tudo amarrado pelo método D.A.M.A. Marketing sem comercial é dinheiro jogado fora. Comercial sem marketing é operação sem combustível. E os dois sem método viram tiro no escuro. Tentar resolver tudo isso contratando agência, closer freelancer e consultor de growth separadamente também não funciona, porque cada um otimiza pelo resultado dele e ninguém otimiza pelo seu. A DAMA é a operação inteira do crescimento do seu consultório dentro de uma única estrutura. Não somos agência. Somos o ecossistema completo.",
  },
  {
    id: "qualidade-atendimento",
    q: "Como sei que o atendimento aos meus pacientes vai manter a qualidade que eu construí?",
    a: "A gente cuida disso em três frentes que andam juntas. Primeiro, o treinamento: o time DAMA passa por imersão no método D.A.M.A. antes de assumir qualquer parceria, com scripts adaptados à sua especialidade e ao tom da sua marca. Depois vem a auditoria contínua dos atendimentos, feita por cliente oculto, escuta de chamadas e revisão das conversas. Por último, você tem visibilidade dos atendimentos em tempo real e canal direto com quem está cuidando do seu consultório no dia a dia. Como referência, num teste de cliente oculto recente, o atendimento de um dos nossos parceiros foi avaliado como o melhor entre todos os consultórios testados.",
  },
  {
    id: "cfm",
    q: "A operação da DAMA é compatível com as normas do CFM?",
    a: "Sim. Toda a operação do Grupo DAMA roda 100% dentro das resoluções do Conselho Federal de Medicina, e isso vale pra comunicação, atendimento, captação de pacientes e gestão de marketing médico. Seguimos integralmente as regras sobre publicidade médica (Resolução CFM 1974/2011 e suas atualizações), uso de imagem, depoimentos de pacientes e divulgação de procedimentos. Cada peça de comunicação criada pra um parceiro passa por validação ética antes de ir ao ar.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://grupodamahealth.com.br/" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://grupodamahealth.com.br/faq" },
  ],
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes (FAQ) | Grupo DAMA" },
      {
        name: "description",
        content:
          "Tire as principais dúvidas sobre o Grupo DAMA: como funciona, preço, especialidades atendidas, qualidade do atendimento, normas do CFM e mais.",
      },
      { property: "og:title", content: "Perguntas Frequentes (FAQ) | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Tire as principais dúvidas sobre o Grupo DAMA: como funciona, preço, especialidades atendidas, qualidade do atendimento, normas do CFM e mais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://grupodamahealth.com.br/faq" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Grupo DAMA" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Perguntas Frequentes (FAQ) | Grupo DAMA" },
      {
        name: "twitter:description",
        content:
          "Tire as principais dúvidas sobre o Grupo DAMA: como funciona, preço, especialidades, CFM e mais.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/faq" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(FAQ_SCHEMA) },
      { type: "application/ld+json", children: JSON.stringify(BREADCRUMB_SCHEMA) },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  return (
    <>
      <section className="surface-dark pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="container-dama max-w-3xl">
          <span className="eyebrow">FAQ</span>
          <h1 className="heading-display mt-4 text-4xl text-white md:text-5xl">
            Perguntas Frequentes
          </h1>
          <p className="mt-5 max-w-2xl text-white/65">
            As respostas que médicos empresários mais buscam antes de fechar parceria com a DAMA.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama max-w-[720px]">
          <ul className="flex flex-col gap-3">
            {FAQS.map((f) => {
              const isOpen = openId === f.id;
              return (
                <li
                  key={f.id}
                  id={f.id}
                  className="card-dama overflow-hidden scroll-mt-28"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${f.id}`}
                    onClick={() => setOpenId(isOpen ? "" : f.id)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6"
                  >
                    <span className="font-serif text-lg font-semibold text-[var(--navy)] md:text-xl">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--gold-soft)] text-[var(--navy)] transition-transform"
                    >
                      {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${f.id}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-[15px] leading-relaxed text-[var(--text-secondary)] md:px-6">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 rounded-xl border border-[color-mix(in_oklab,var(--navy)_15%,transparent)] bg-white p-8 text-center md:p-10">
            <h2 className="font-serif text-2xl text-[var(--navy)] md:text-3xl">
              Não encontrou sua dúvida aqui?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--text-secondary)]">
              Fale direto com a nossa equipe. A reunião de diagnóstico é gratuita e tira todas as
              dúvidas que você ainda tem.
            </p>
            <div className="mt-6">
              <a
                href={PARCERIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Quero ser parceiro <span aria-hidden>→</span>
              </a>
            </div>
            <p className="mt-5 text-sm text-[var(--text-muted)]">
              Prefere outro canal?{" "}
              <Link
                to="/contato"
                className="text-[var(--navy)] underline-offset-4 hover:underline"
              >
                Veja todos os canais de contato
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
