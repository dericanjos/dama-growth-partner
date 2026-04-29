import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDateBR } from "@/data/blog";
import { getNewsArticleBySlug } from "@/server/news.functions";

function getAuthorMeta(author: string): { jobTitle: string; url: string } {
  if (author === "Deric Anjos") {
    return {
      jobTitle: "Head de Growth",
      url: "https://grupodamahealth.com.br/autor/deric-anjos",
    };
  }
  if (author === "Jéssica Anjos") {
    return {
      jobTitle: "Fundadora",
      url: "https://grupodamahealth.com.br/sobre",
    };
  }
  return {
    jobTitle: "Equipe DAMA",
    url: "https://grupodamahealth.com.br/sobre",
  };
}

function plainExcerpt(text: string, max = 155) {
  const plain = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>~\-]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? `${plain.slice(0, max).trim()}…` : plain;
}

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ params }) => {
    const { article } = await getNewsArticleBySlug({
      data: { slug: params.slug },
    });
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Notícia | Grupo DAMA" }] };
    const { article } = loaderData;
    const desc = plainExcerpt(article.content, 155);
    const url = `https://grupodamahealth.com.br/noticias/${article.slug}`;
    return {
      meta: [
        { title: `${article.title} | Notícias — Grupo DAMA` },
        { name: "description", content: desc },
        { property: "og:title", content: article.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(article.cover_image
          ? [
              { property: "og:image", content: article.cover_image },
              { name: "twitter:image", content: article.cover_image },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
        { property: "article:author", content: article.author },
        { property: "article:published_time", content: article.published_at },
        { property: "article:section", content: article.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: desc,
            datePublished: article.published_at,
            dateModified: article.published_at,
            articleSection: article.category,
            image: article.cover_image ? [article.cover_image] : undefined,
            author: {
              "@type": "Person",
              name: article.author,
              jobTitle: getAuthorMeta(article.author).jobTitle,
              url: getAuthorMeta(article.author).url,
            },
            publisher: {
              "@type": "Organization",
              name: "Grupo DAMA",
              url: "https://grupodamahealth.com.br",
              logo: {
                "@type": "ImageObject",
                url: "https://grupodamahealth.com.br/favicon.png",
              },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            isBasedOn: article.source_url ?? undefined,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://grupodamahealth.com.br/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Notícias",
                item: "https://grupodamahealth.com.br/noticias",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: url,
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="surface-dark hero-glow relative flex min-h-[70vh] items-center pt-24">
      <div className="container-dama text-center">
        <h1 className="heading-display text-4xl">
          <span className="gold-text">Notícia não encontrada</span>
        </h1>
        <p className="mt-4 text-white/70">
          Esta notícia pode ter sido removida ou ainda não foi publicada.
        </p>
        <Link to="/noticias" className="btn-gold mt-8">
          Ver todas as notícias
        </Link>
      </div>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="surface-dark hero-glow relative flex min-h-[70vh] items-center pt-24">
      <div className="container-dama text-center">
        <h1 className="heading-display text-4xl">
          <span className="gold-text">Erro ao carregar a notícia</span>
        </h1>
        <p className="mt-4 text-white/70">{error.message}</p>
        <Link to="/noticias" className="btn-gold mt-8">
          Voltar para Notícias
        </Link>
      </div>
    </section>
  ),
  component: NewsArticlePage,
});

function NewsArticlePage() {
  const { article } = Route.useLoaderData();
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://grupodamahealth.com.br/noticias/${article.slug}`;

  return (
    <>
      <section className="surface-dark hero-glow relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <CategoryBadge category={article.category} />
            <span className="text-xs uppercase tracking-[0.14em] text-white/60">
              {formatDateBR(article.published_at)}
            </span>
          </div>
          <h1 className="heading-display text-[32px] md:text-[44px]">
            <span className="gold-text">{article.title}</span>
          </h1>
          {article.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-[16px] italic text-white/75">
              {article.subtitle}
            </p>
          )}
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-white/55">
            Por {article.author} · {getAuthorMeta(article.author).jobTitle}
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16 md:py-20">
        <article className="container-dama mx-auto max-w-[720px]">
          {article.cover_image && (
            <div className="mb-10 h-64 w-full overflow-hidden rounded-[14px] md:h-80">
              <img
                src={article.cover_image}
                alt={article.cover_image_alt ?? article.title}
                width={800}
                height={450}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <MarkdownContent content={article.content} />

          {/* Fonte oficial */}
          <aside
            className="mt-12 rounded-[12px] border-l-[3px] p-6"
            style={{
              background: "color-mix(in oklab, var(--navy) 4%, var(--cream))",
              borderLeftColor: "var(--gold)",
            }}
          >
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
              📋 Fonte oficial
            </div>
            <p className="text-[14.5px] leading-[1.65] text-[var(--navy)]/85">
              Esta análise foi escrita com base em informação publicada por:{" "}
              {article.source_url ? (
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--gold-deep)] underline-offset-2 hover:underline"
                >
                  {article.source_name}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <strong className="font-semibold text-[var(--navy)]">
                  {article.source_name}
                </strong>
              )}
            </p>
          </aside>

          <div className="mt-10 border-t border-[var(--border)] pt-8">
            <ShareButtons title={article.title} url={url} />
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/noticias"
              className="text-sm font-medium text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
            >
              ← Voltar para todas as notícias
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
