import { breadcrumbJsonLd } from "@/config/breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ORGANIZACAO } from "@/config/organizacao";

const PAGE_URL = `${ORGANIZACAO.site}/solucao`;

const TITLE = "O que fazemos | As três verticais do Grupo DAMA Health";
const DESCRIPTION =
  "DAMA Estratégica, DAMA Escola e DAMA Tech: as três verticais do Grupo DAMA Health, o que é cada uma e para quem serve.";

const WEBPAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${ORGANIZACAO.site}/#website` },
  about: { "@id": `${ORGANIZACAO.site}/#organization` },
};

const ITEMLIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#verticais`,
  name: "Verticais do Grupo DAMA Health",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "DAMA Estratégica",
      url: `${ORGANIZACAO.site}/dama-estrategica`,
    },
    { "@type": "ListItem", position: 2, name: "DAMA Escola", url: "https://escoladama.com.br" },
    { "@type": "ListItem", position: 3, name: "DAMA Tech", url: `${ORGANIZACAO.site}/dama-tech` },
  ],
};

export const Route = createFileRoute("/solucao")({
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
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd("O que fazemos", "/solucao")) },
      { type: "application/ld+json", children: JSON.stringify(WEBPAGE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(ITEMLIST_JSONLD) },
    ],
  }),
  component: SolutionPage,
});

const H2 = "heading-display text-[26px] leading-[1.2] text-[var(--navy)] md:text-[36px]";
const BODY = "mt-6 space-y-5 text-[16px] leading-[1.85] text-[var(--text-secondary)]";
const LINK =
  "text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-ink)]";

function SolutionPage() {
  return (
    <>
      {/* HERO */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-dama mx-auto max-w-4xl text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> O que fazemos
          </span>
          <h1 className="heading-display text-[34px] leading-[1.1] md:text-[56px]">
            <span className="gold-text">
              Uma marca, três verticais, públicos diferentes.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-white/75 md:text-[17px]">
            O Grupo DAMA Health opera em três verticais, com públicos distintos e
            produtos distintos. Esta página existe para deixar claro o que é cada uma
            e para quem serve.
          </p>
        </div>
      </section>

      {/* AS TRÊS VERTICAIS */}
      <section className="bg-[var(--cream)] py-24 md:py-28">
        <div className="container-dama mx-auto max-w-3xl space-y-14">
          <Reveal>
            <h2 className={H2}>DAMA Estratégica</h2>
            <div className={BODY}>
              <p>
                A operação comercial estratégica. Assume a frente comercial do
                consultório do médico parceiro, com método, indicadores e estrutura
                própria, reunindo operação comercial, growth e marketing médico. É o
                núcleo, e é seletivo.
              </p>
              <p>
                <strong className="text-[var(--navy)]">Para quem:</strong> médico,
                dentista ou profissional de saúde dono de consultório ou clínica
                particular.
              </p>
              <p>
                <Link to="/dama-estrategica" className={LINK}>
                  Conhecer a DAMA Estratégica
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>DAMA Escola</h2>
            <div className={BODY}>
              <p>
                A vertical educacional. Forma profissionais de atendimento do mercado
                médico com o mesmo método que a operação executa. Enquanto a operação
                assume a frente comercial de fora para dentro, a Escola forma quem já
                está na recepção, para que a estrutura exista de dentro.
              </p>
              <p>
                <strong className="text-[var(--navy)]">Para quem:</strong>{" "}
                profissionais de saúde que querem formar a equipe que já têm, e
                profissionais de atendimento que querem construir carreira nesta
                posição.
              </p>
              <p>
                <a
                  href="https://escoladama.com.br"
                  target="_blank"
                  rel="noopener"
                  className={LINK}
                >
                  Conhecer a DAMA Escola
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className={H2}>DAMA Tech</h2>
            <div className={BODY}>
              <p>
                A vertical de tecnologia. É a infraestrutura da operação transformada
                em produto: a plataforma que sustenta o atendimento comercial dentro do
                consultório, com o método embutido na rotina de quem atende.
              </p>
              <p>
                <strong className="text-[var(--navy)]">Para quem:</strong> consultórios
                que operam com a estrutura da DAMA.
              </p>
              <p>
                <Link to="/dama-tech" className={LINK}>
                  Conhecer a DAMA Tech
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="font-serif text-[19px] leading-[1.6] text-[var(--navy)] md:text-[22px]">
              As verticais não competem entre si. Resolvem momentos diferentes do
              mesmo problema: um consultório que cresce mais rápido do que a
              estrutura que o sustenta.
            </p>
          </Reveal>
        </div>
      </section>

      {/* O QUE NÃO PROMETEMOS */}
      <section className="bg-[var(--cream)] pb-24 md:pb-28">
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
    </>
  );
}
