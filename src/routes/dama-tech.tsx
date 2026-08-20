import { breadcrumbJsonLd } from "@/config/breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ORGANIZACAO } from "@/config/organizacao";

const PAGE_URL = `${ORGANIZACAO.site}/dama-tech`;

const TITLE = "DAMA Tech | A plataforma que sustenta a operação DAMA";
const DESCRIPTION =
  "A Plataforma de Atendimento DAMA é a infraestrutura da operação comercial dentro do consultório, com o método D.A.M.A embutido na rotina.";

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Plataforma de Atendimento DAMA",
  url: PAGE_URL,
  provider: { "@id": `${ORGANIZACAO.site}/#organization` },
  description:
    "A Plataforma de Atendimento DAMA é a infraestrutura da operação comercial dentro do consultório, com o método D.A.M.A embutido na rotina de quem atende.",
  areaServed: { "@type": "Country", name: "BR" },
  serviceType: "Plataforma de atendimento comercial para consultórios médicos",
  audience: {
    "@type": "Audience",
    audienceType: "Consultórios que operam com a estrutura da DAMA",
  },
};

export const Route = createFileRoute("/dama-tech")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd("DAMA Tech", "/dama-tech")) },
    ],
  }),
  component: DamaTechPage,
});

const H2 = "heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]";
const H3 = "heading-display text-[20px] leading-[1.25] text-[var(--navy)] md:text-[24px]";
const BODY = "mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]";

const LIST_ITEMS = [
  ["O primeiro contato", "com tempo de resposta medido, não estimado"],
  ["A condução da conversa", "até a agenda, com o histórico do paciente visível para quem está atendendo"],
  ["O follow-up", "de quem não respondeu, em cadência definida, sem depender de memória"],
  ["A confirmação e a gestão de falta", "com quem não veio entrando de volta na fila"],
  ["A reativação", "de quem já foi paciente e parou de voltar"],
  ["O registro de tudo", "para que o número da semana seguinte tenha base"],
];

function DamaTechPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Vertical de Tecnologia
          </span>
          <h1 className="heading-display text-[34px] leading-[1.1] md:text-[56px]">
            <span className="gold-text">A infraestrutura da operação, em produto.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-white/75 md:text-[17px]">
            A DAMA opera consultórios todos os dias. A DAMA Tech é o que sustenta essa
            operação por dentro. Não é software de gestão genérico e não pretende ser:
            é a infraestrutura da própria DAMA, com o método embutido na rotina de quem
            atende.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl space-y-14">
          <Reveal>
            <h2 className={H2}>Plataforma de Atendimento DAMA</h2>
            <div className={BODY}>
              <p>
                É onde o método D.A.M.A deixa de ser conceito e vira rotina.
              </p>
              <p>
                Cada contato que chega ao consultório entra na plataforma com um
                processo definido: quem é essa pessoa, em que etapa ela está, qual o
                próximo passo e quem é responsável por ele. Nada depende de alguém
                lembrar.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h3 className={H3}>O que a plataforma organiza</h3>
            <ul className="mt-6 space-y-3 text-[16px] leading-[1.6] text-[var(--text-secondary)]">
              {LIST_ITEMS.map(([label, rest]) => (
                <li key={label} className="flex gap-2">
                  <span className="text-[var(--gold-deep)]" aria-hidden>•</span>
                  <span>
                    <strong className="text-[var(--navy)]">{label}</strong>, {rest}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className={H2}>Por que ela existe</h2>
            <div className={BODY}>
              <p>
                Ferramenta genérica organiza tarefa. O que faltava era organizar{" "}
                <strong className="text-[var(--navy)]">decisão</strong>.
              </p>
              <p>
                A maior parte do que escapa em um consultório não escapa por falta de
                sistema: escapa porque ninguém definiu o que fazer quando o paciente
                perguntou o preço e sumiu, quando faltou, quando disse que ia pensar. A
                plataforma existe para que esse "o que fazer" esteja escrito e aconteça,
                todo dia, com ou sem a pessoa mais experiente da equipe presente.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>Conformidade dentro da ferramenta, não em volta dela</h2>
            <div className={BODY}>
              <p>
                As regras do CFM não são uma camada adicionada no fim. Estão dentro do
                processo: valores nunca são públicos, o motivo do contato é sempre
                clínico e nunca promocional, e nenhum roteiro promete resultado.
              </p>
              <p>
                Dado de paciente é dado sensível. A plataforma trata assim.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>O que a plataforma não é</h2>
            <div className={BODY}>
              <p>
                Não é sistema de gestão de clínica, não substitui prontuário e não faz
                agendamento por conta própria. É a camada comercial: o que acontece entre
                o primeiro contato do paciente e a consulta acontecer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FECHO E CHAMADA */}
      <section className="surface-dark relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-serif text-[19px] leading-[1.65] text-white/85 md:text-[23px]">
              A Plataforma de Atendimento é usada hoje dentro da operação DAMA, e evolui
              junto com ela.
            </p>
            <Link to="/contato" className="btn-gold mt-9">
              Falar sobre a DAMA Tech <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
