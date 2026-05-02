import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import jessicaPhoto from "@/assets/jessica-anjos.png";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDateBR, BLOG_POSTS } from "@/data/blog";
import { listNewsByAuthor, type NewsArticleListItem } from "@/server/news.functions";

const AUTHOR_NAME = "Jéssica Anjos";
const AUTHOR_URL = "https://grupodamahealth.com.br/autor/jessica-anjos";
const AUTHOR_DESC =
  "Jéssica Anjos é a fundadora do Grupo DAMA, empresa que opera a gestão comercial de mais de 90 consultórios médicos em 16 estados do Brasil.";

const BIO_PARAGRAPHS = [
  "Sou Jéssica Anjos, fundadora do Grupo DAMA, a maior operação comercial terceirizada pra consultórios médicos do Brasil. Cristã, leitora voraz e empresária movida por propósito.",
  "Criei a DAMA com uma missão clara: que todo brasileiro tenha acesso a saúde de qualidade. Pra isso, o caminho que enxerguei foi simples mas pouco explorado — médicos excelentes precisavam de uma operação comercial profissional pra que sua excelência clínica chegasse até quem precisa.",
  "Hoje lidero uma operação que atende mais de 90 médicos parceiros em 16+ estados, com mais de 25.000 consultas facilitadas. Cada agenda lotada de um médico parceiro é uma vida impactada — do médico que volta a fazer o que ama com previsibilidade, ao paciente que encontra atendimento de qualidade.",
  "Acredito que empresas se constroem com gente, processo e fé. E que o mercado da saúde no Brasil ainda está no começo de uma transformação profunda — onde gestão profissional e estratégia comercial deixam de ser opcionais e passam a ser parte indissociável da prática médica de excelência.",
];

export const Route = createFileRoute("/autor/jessica-anjos")({
  loader: () => listNewsByAuthor({ data: { author: AUTHOR_NAME } }),
  head: () => ({
    meta: [
      { title: "Jéssica Anjos — Fundadora | Grupo DAMA" },
      { name: "description", content: AUTHOR_DESC },
      { property: "og:title", content: "Jéssica Anjos — Fundadora | Grupo DAMA" },
      { property: "og:description", content: "Conheça a fundadora do Grupo DAMA." },
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
          jobTitle: "Fundadora",
          url: AUTHOR_URL,
          worksFor: {
            "@type": "Organization",
            name: "Grupo DAMA Health",
            url: "https://grupodamahealth.com.br",
          },
          knowsAbout: [
            "Saúde suplementar",
            "Gestão médica",
            "Marketing de consultório",
            "Saúde pública",
          ],
          sameAs: ["https://www.instagram.com/grupodamahealth"],
          description: AUTHOR_DESC,
        }),
      },
    ],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const { items: news } = Route.useLoaderData() as { items: NewsArticleListItem[] };
  const blogPosts = BLOG_POSTS.filter((p) => p.author === AUTHOR_NAME).sort(
    (a, b) => (a.date < b.date ? 1 : -1),
  );

  return (
    <>
      <section className="surface-dark hero-glow relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-2 md:h-36 md:w-36"
            style={{ borderColor: "var(--gold)" }}
          >
            <img
              src={jessicaPhoto}
              alt="Jéssica Anjos, Fundadora do Grupo DAMA"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="heading-display text-[36px] md:text-[52px]">
            <span className="gold-text">Jéssica Anjos</span>
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/60">
            Fundadora · Grupo DAMA
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/grupodamahealth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-[var(--gold)]"
              aria-label="Instagram do Grupo DAMA"
            >
              <Instagram className="h-4 w-4" /> @grupodamahealth
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama mx-auto max-w-[720px]">
          <div className="space-y-5 text-[16px] leading-[1.75] text-[var(--text-primary)] md:text-[17px]">
            {BIO_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <AuthorPublications news={news} blogPosts={blogPosts} />
    </>
  );
}

function AuthorPublications({
  news,
  blogPosts,
}: {
  news: NewsArticleListItem[];
  blogPosts: typeof BLOG_POSTS;
}) {
  return (
    <>
      {news.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--cream)] py-16 md:py-20">
          <div className="container-dama mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <span className="badge-pill-light">
                <span className="badge-pill-dot" /> Notícias
              </span>
              <h2 className="heading-display mt-4 text-[28px] md:text-[34px]">
                {news.length} {news.length === 1 ? "notícia publicada" : "notícias publicadas"}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {news.map((n) => (
                <Link
                  key={n.id}
                  to="/noticias/$slug"
                  params={{ slug: n.slug }}
                  className="card-dama group block overflow-hidden p-0"
                >
                  {n.cover_image && (
                    <img
                      src={n.cover_image}
                      alt={n.cover_image_alt ?? n.title}
                      loading="lazy"
                      decoding="async"
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-3">
                      <CategoryBadge category={n.category} />
                      <span className="text-[12px] text-[var(--text-muted)]">
                        {formatDateBR(n.published_at)}
                      </span>
                    </div>
                    <h3 className="font-serif text-[17px] font-semibold leading-[1.35] text-[var(--navy)] group-hover:text-[var(--gold-deep)]">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {blogPosts.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--cream)] pb-20 pt-16">
          <div className="container-dama mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <span className="badge-pill-light">
                <span className="badge-pill-dot" /> Blog
              </span>
              <h2 className="heading-display mt-4 text-[28px] md:text-[34px]">
                {blogPosts.length} {blogPosts.length === 1 ? "post no blog" : "posts no blog"}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {blogPosts.map((p) => (
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
