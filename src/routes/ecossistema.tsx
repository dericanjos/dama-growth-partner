import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ORGANIZACAO } from "@/config/organizacao";

const PAGE_URL = `${ORGANIZACAO.site}/ecossistema`;

const WEBPAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Ecossistema | Grupo DAMA Health",
  description:
    "As frentes do Grupo DAMA Health: operação comercial, Escola DAMA e conteúdo. O que é cada uma e para quem.",
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${ORGANIZACAO.site}/#website` },
  about: { "@id": `${ORGANIZACAO.site}/#organization` },
};

const ITEMLIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#frentes`,
  name: "Frentes do Grupo DAMA Health",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Grupo DAMA Health",
      url: ORGANIZACAO.site,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "DAMA, a operação comercial",
      url: "https://comercial.grupodamahealth.com.br",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Escola DAMA",
      url: `${ORGANIZACAO.site}/escola`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Conteúdo",
      url: `${ORGANIZACAO.site}/noticias`,
    },
  ],
};

export const Route = createFileRoute("/ecossistema")({
  head: () => ({
    meta: [
      { title: "Ecossistema | Grupo DAMA Health" },
      {
        name: "description",
        content:
          "As frentes do Grupo DAMA Health: operação comercial, Escola DAMA e conteúdo. O que é cada uma e para quem.",
      },
      { property: "og:title", content: "Ecossistema | Grupo DAMA Health" },
      {
        property: "og:description",
        content:
          "As frentes do Grupo DAMA Health: operação comercial, Escola DAMA e conteúdo. O que é cada uma e para quem.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(WEBPAGE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(ITEMLIST_JSONLD) },
    ],
  }),
  component: EcossistemaPage,
});

const linkClass =
  "text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]";

function EcossistemaPage() {
  return (
    <>
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container-dama mx-auto max-w-4xl">
          <span className="eyebrow">Ecossistema</span>
          <h1 className="heading-display mt-4 text-[32px] leading-[1.12] md:text-[52px]">
            <span className="gold-text">Uma marca, três frentes, públicos diferentes.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.8] text-white/75 md:text-[17px]">
            O Grupo DAMA Health opera em frentes distintas, com públicos distintos. Esta página
            existe para deixar claro o que é cada uma, para quem serve e onde ela mora. Se você
            chegou aqui procurando alguma delas, o caminho está abaixo.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl space-y-12 md:space-y-16">
          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[34px]">
              Grupo DAMA Health
            </h2>
            <p className="mt-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              A entidade institucional. É o guarda-chuva de todas as frentes, e é onde ficam a
              categoria que a DAMA fundou, o método, os valores, as pessoas e o conteúdo que
              publicamos sobre o mercado médico.
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Onde:</strong>{" "}
              grupodamahealth.com.br, este site.
            </p>
            <p className="mt-1 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Para quem:</strong> qualquer pessoa
              que queira entender quem é a DAMA.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[34px]">
              DAMA · a operação comercial
            </h2>
            <p className="mt-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              O núcleo. A operação comercial estratégica que assume a frente comercial do
              consultório do médico parceiro, com método, indicadores e estrutura própria. É
              seletiva e opera dentro de um processo de entrada próprio.
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Onde:</strong>{" "}
              <a
                href="https://comercial.grupodamahealth.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                comercial.grupodamahealth.com.br
              </a>
            </p>
            <p className="mt-1 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Para quem:</strong> médico, dentista
              ou profissional de saúde dono de consultório ou clínica particular.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[34px]">
              Escola DAMA
            </h2>
            <p className="mt-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              A vertical educacional. Forma profissionais de atendimento do mercado médico com o
              mesmo método que a operação executa. Enquanto a operação assume a frente comercial de
              fora para dentro, a Escola forma quem já está na recepção, para que a estrutura exista
              de dentro.
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Onde:</strong>{" "}
              <Link to="/escola" className={linkClass}>
                grupodamahealth.com.br/escola
              </Link>{" "}
              para conhecer,{" "}
              <a
                href="https://escola.grupodamahealth.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                escola.grupodamahealth.com.br
              </a>{" "}
              para a formação.
            </p>
            <p className="mt-1 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Para quem:</strong> profissionais de
              saúde que querem formar a equipe que já têm, e profissionais de atendimento que querem
              construir carreira nesta posição.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[34px]">
              Conteúdo
            </h2>
            <p className="mt-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]">
              Notícias diárias sobre regulação, convênio e operação de consultório, análises no blog
              e um glossário do mercado médico. É a frente que não vende nada: existe para que quem
              opera consultório tenha onde entender o que muda.
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Onde:</strong>{" "}
              <Link to="/noticias" className={linkClass}>
                /noticias
              </Link>
              ,{" "}
              <Link to="/blog" className={linkClass}>
                /blog
              </Link>
              ,{" "}
              <Link to="/glossario" className={linkClass}>
                /glossario
              </Link>
              ,{" "}
              <Link to="/faq" className={linkClass}>
                /faq
              </Link>
              .
            </p>
            <p className="mt-1 text-[15.5px] leading-[1.85] text-[var(--text-secondary)]">
              <strong className="font-serif text-[var(--navy)]">Para quem:</strong> qualquer pessoa
              que opere ou trabalhe em consultório particular.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-dark relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50" aria-hidden />
        <div className="container-dama relative mx-auto max-w-3xl text-center">
          <p className="font-serif text-[19px] leading-[1.65] text-white/85 md:text-[24px]">
            As frentes não competem entre si. Resolvem momentos diferentes do mesmo problema: um
            consultório que cresce mais rápido do que a estrutura que o sustenta.
          </p>
        </div>
      </section>
    </>
  );
}
