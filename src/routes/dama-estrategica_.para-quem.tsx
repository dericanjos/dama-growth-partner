import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ORGANIZACAO } from "@/config/organizacao";

const PARENT_URL = `${ORGANIZACAO.site}/dama-estrategica`;
const PAGE_URL = `${PARENT_URL}/para-quem`;

const TITLE = "Para quem esta operação foi construída | DAMA Estratégica";
const DESCRIPTION =
  "Os critérios de entrada da operação comercial da DAMA, e os critérios de recusa. A operação é seletiva, e dizer não faz parte do método.";

const WEBPAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${PARENT_URL}#service` },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${ORGANIZACAO.site}/` },
    { "@type": "ListItem", position: 2, name: "O que fazemos", item: `${ORGANIZACAO.site}/solucao` },
    { "@type": "ListItem", position: 3, name: "DAMA Estratégica", item: PARENT_URL },
    {
      "@type": "ListItem",
      position: 4,
      name: "Para quem esta operação foi construída",
      item: PAGE_URL,
    },
  ],
};

export const Route = createFileRoute("/dama-estrategica_/para-quem")({
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
      { type: "application/ld+json", children: JSON.stringify(WEBPAGE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(BREADCRUMB_JSONLD) },
    ],
  }),
  component: ParaQuemPage,
});

const FOI = [
  <>
    O médico, dentista ou profissional de saúde{" "}
    <strong className="text-[var(--navy)]">dono de consultório ou clínica particular</strong>,
    que responde pelo próprio crescimento
  </>,
  <>
    Quem <strong className="text-[var(--navy)]">já tem demanda</strong> e não tem
    estrutura para sustentá-la, e percebe que o que chega não vira agenda na proporção
    que deveria
  </>,
  <>
    Quem <strong className="text-[var(--navy)]">já investiu em marketing</strong> e viu o
    investimento não se converter, e desconfia que o problema não estava no volume
  </>,
  <>
    Quem tem <strong className="text-[var(--navy)]">receita particular a proteger</strong>,
    ainda que conviva com convênio
  </>,
  <>
    Quem aceita <strong className="text-[var(--navy)]">olhar os próprios números</strong> e
    tomar decisão a partir deles, inclusive quando o número desmente a intuição
  </>,
];

const NAO_FOI = [
  <>
    Quem espera <strong className="text-[var(--navy)]">terceirizar a responsabilidade</strong>{" "}
    e não participar. A operação exige o médico em pontos definidos, e sem ele o método
    não roda
  </>,
  <>
    Quem quer <strong className="text-[var(--navy)]">resultado sem método</strong>, ou quer
    que alguém garanta um número em um prazo
  </>,
  <>
    Quem opera <strong className="text-[var(--navy)]">cem por cento por convênio</strong> e
    ainda não tem receita particular a proteger. Nesse caso a operação não tem onde atuar
  </>,
  <>
    Quem procura <strong className="text-[var(--navy)]">volume de leads</strong>. A
    operação existe para converter e reter o que chega, não para inflar o topo
  </>,
  <>
    Quem espera que a DAMA <strong className="text-[var(--navy)]">contorne norma do CFM</strong>.
    Conformidade não é preferência, é limite
  </>,
];

function Lista({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-6 space-y-4 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ParaQuemPage() {
  return (
    <>
      <section className="surface-dark relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-3xl">
          <nav aria-label="Trilha de navegação" className="text-xs text-white/60">
            <ol className="flex list-none flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link to="/solucao" className="hover:text-white">
                  O que fazemos
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link to="/dama-estrategica" className="hover:text-white">
                  DAMA Estratégica
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-white/80">Para quem esta operação foi construída</li>
            </ol>
          </nav>

          <h1 className="heading-display mt-8 text-[30px] leading-[1.15] text-white md:text-[46px]">
            A operação é seletiva. Dizer não faz parte do método.
          </h1>
          <p className="mt-7 text-[16px] leading-[1.85] text-white/75 md:text-[17px]">
            Nem todo consultório precisa de uma operação comercial, e nem todo momento é o
            momento certo. Esta página existe para você descobrir isso antes da primeira
            conversa, e não depois de um contrato assinado.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 md:py-24">
        <div className="container-dama mx-auto max-w-3xl">
          <Reveal>
            <h2 className="heading-display text-[24px] leading-[1.25] text-[var(--navy)] md:text-[34px]">
              Foi construída para
            </h2>
            <Lista items={FOI} />
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="heading-display text-[24px] leading-[1.25] text-[var(--navy)] md:text-[34px]">
              Não foi construída para
            </h2>
            <Lista items={NAO_FOI} />
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="heading-display text-[24px] leading-[1.25] text-[var(--navy)] md:text-[34px]">
              Por que a operação recusa
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                Aceitar um consultório que não está no momento certo custa caro para os
                dois lados. Para o médico, é investimento que não encontra estrutura para
                render. Para a DAMA, é uma operação que não pode dar certo ocupando o
                lugar de uma que poderia.
              </p>
              <p>
                Por isso o primeiro passo não é uma proposta. É um diagnóstico: olhar os
                seus números junto com você e dizer, com clareza, se este é o momento. A
                conversa em que se diz não é mais barata agora do que depois.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="heading-display text-[24px] leading-[1.25] text-[var(--navy)] md:text-[34px]">
              O que acontece se for o momento
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              <p>
                O diagnóstico vira o ponto de partida da implantação, e a construção
                começa por um cronograma com dono e prazo em cada etapa.
              </p>
              <p>
                <Link
                  to="/dama-estrategica/como-funciona"
                  className="font-medium text-[var(--navy)] underline-offset-4 hover:underline"
                >
                  Como funciona a implantação <span aria-hidden>→</span>
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-dark relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-2xl text-center">
          <Reveal>
            <a
              href="https://comercial.grupodamahealth.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Solicitar diagnóstico da operação <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
