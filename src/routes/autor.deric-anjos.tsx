import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { BLOG_POSTS, formatDateBR } from "@/data/blog";
import { CategoryBadge } from "@/components/CategoryBadge";

const AUTHOR_NAME = "Deric Anjos";
const AUTHOR_URL = "https://grupodamahealth.com.br/autor/deric-anjos";
const AUTHOR_DESC =
  "Deric Anjos é Head de Growth do Grupo DAMA. Formado pela Escola Naval, empresário e estrategista de crescimento para consultórios médicos.";

const BIO_PARAGRAPHS = [
  "Eu me formei na Escola Naval. Passei anos num ambiente onde disciplina, estratégia e execução sob pressão não eram conceitos de livro, eram a rotina. Aprendi a planejar com precisão, liderar equipes e operar em cenários onde margem de erro não existe.",
  "Foi nesse caminho que me descobri empresário.",
  "Em 2024, a Jéssica fundou o Grupo DAMA com uma visão clara: médicos excelentes estavam invisíveis. Tinham formação de ponta, experiência clínica e atendimento de qualidade, mas agenda vazia. O problema nunca foi a competência médica. Era a ausência de uma operação estratégica que transformasse interesse em consulta. Eu entrei pra construir essa operação por dentro.",
  "Comecei pelo tráfego pago. Aprendi a mecânica do Meta Ads e do Google Ads investindo, testando e ajustando na prática. Logo percebi que gerar leads não era suficiente. O gargalo estava no que acontecia depois que o paciente demonstrava interesse. A partir daí, mergulhei no universo de growth: estratégia de aquisição, retenção, posicionamento digital e escalabilidade. Cada consultório que a DAMA atende me ensinou algo novo sobre o que realmente move a agulha na saúde.",
  "Hoje, como Head de Growth, minha função é conectar todas as peças: atração, conversão, retenção e crescimento. A DAMA opera em 16 estados com mais de 90 médicos parceiros, e cada estratégia que publicamos neste blog nasce da experiência real com consultórios reais.",
  "Sou movido por aprendizado. Leio vorazmente sobre marketing, vendas, psicologia comportamental e estratégia de negócios. Estudo Inteligência Artificial e Machine Learning porque acredito que o próximo salto do mercado médico vai passar por tecnologia. Mas a base continua sendo humana: entender o paciente, falar a linguagem dele e estar pronto quando ele decide agendar.",
  "Empreender é o que me move. Construir algo que gera impacto real na vida de médicos e pacientes é o que me faz levantar todo dia querendo mais.",
];

export const Route = createFileRoute("/autor/deric-anjos")({
  head: () => ({
    meta: [
      { title: "Deric Anjos — Head de Growth | Grupo DAMA" },
      { name: "description", content: AUTHOR_DESC },
      { property: "og:title", content: "Deric Anjos — Head de Growth | Grupo DAMA" },
      {
        property: "og:description",
        content: "Conheça o profissional por trás dos artigos do blog do Grupo DAMA.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: AUTHOR_URL },
    ],
    links: [
      { rel: "canonical", href: AUTHOR_URL },
      { rel: "alternate", hrefLang: "pt-BR", href: AUTHOR_URL },
      { rel: "alternate", hrefLang: "x-default", href: AUTHOR_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: AUTHOR_NAME,
          jobTitle: "Head de Growth",
          worksFor: {
            "@type": "Organization",
            name: "Grupo DAMA",
            url: "https://grupodamahealth.com.br",
          },
          url: AUTHOR_URL,
          sameAs: ["https://www.instagram.com/dericanjos/"],
          description:
            "Head de Growth do Grupo DAMA. Formado pela Escola Naval, empresário e estrategista de crescimento para consultórios médicos. Responsável pela estratégia de growth de 90+ médicos parceiros em 16 estados.",
        }),
      },
    ],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const posts = BLOG_POSTS.filter((p) => p.author === AUTHOR_NAME).sort(
    (a, b) => (a.date < b.date ? 1 : -1),
  );

  return (
    <>
      {/* Header navy */}
      <section className="surface-dark hero-glow relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-2 md:h-36 md:w-36"
               style={{ borderColor: "var(--gold)" }}>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
              alt="Deric Anjos, Head de Growth do Grupo DAMA"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="heading-display text-[36px] md:text-[52px]">
            <span className="gold-text">Deric Anjos</span>
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/60">
            Head de Growth · Grupo DAMA
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/dericanjos/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-[var(--gold)]"
              aria-label="Instagram de Deric Anjos"
            >
              <Instagram className="h-4 w-4" /> @dericanjos
            </a>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama mx-auto max-w-[720px]">
          <div className="space-y-5 text-[16px] leading-[1.75] text-[var(--text-primary)] md:text-[17px]">
            {BIO_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Artigos */}
      {posts.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--cream)] pb-20">
          <div className="container-dama mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <span className="badge-pill-light">
                <span className="badge-pill-dot" /> Publicações
              </span>
              <h2 className="heading-display mt-4 text-[28px] md:text-[34px]">
                Artigos escritos por Deric Anjos
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="card-dama group p-6"
                >
                  <CategoryBadge category={p.category} />
                  <h3 className="mt-4 font-serif text-[18px] font-semibold leading-[1.35] text-[var(--navy)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {formatDateBR(p.date)}
                  </p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                    Ler →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
