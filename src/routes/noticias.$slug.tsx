import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDateBR, BLOG_POSTS } from "@/data/blog";
import {
  getNewsArticleBySlug,
  listRelatedNews,
  type FaqEntry,
  type NewsArticleListItem,
} from "@/server/news.functions";

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
      url: "https://grupodamahealth.com.br/autor/jessica-anjos",
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

const SITE_URL = "https://grupodamahealth.com.br";
const PUBLISHER_LOGO = `${SITE_URL}/assets/dama-logo.png`;

function toAbsoluteUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${path}`;
}

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ params }) => {
    const { article } = await getNewsArticleBySlug({
      data: { slug: params.slug },
    });
    if (!article) throw notFound();
    const { items: related } = await listRelatedNews({
      data: {
        slug: article.slug,
        category: article.category,
        tags: article.tags ?? [],
        limit: 3,
      },
    });
    return { article, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Notícia | Grupo DAMA" }] };
    const { article } = loaderData;
    const desc =
      (article.meta_description && article.meta_description.trim()) ||
      plainExcerpt(article.content, 155);
    const url = `${SITE_URL}/noticias/${article.slug}`;
    const seoTitle = article.seo_title || article.title;
    const absoluteImage = toAbsoluteUrl(article.cover_image);
    const authorMeta = getAuthorMeta(article.author);
    const tags = article.tags ?? [];
    const faq = (article.faq ?? []) as FaqEntry[];

    const scripts: Array<{ type: string; children: string }> = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: desc,
          image: absoluteImage ? [absoluteImage] : undefined,
          datePublished: article.published_at,
          dateModified: article.published_at,
          articleSection: article.category,
          keywords: tags.length > 0 ? tags.join(", ") : undefined,
          author: {
            "@type": "Person",
            name: article.author,
            jobTitle: authorMeta.jobTitle,
            url: authorMeta.url,
          },
          publisher: {
            "@type": "Organization",
            name: "Grupo Dama Health",
            logo: {
              "@type": "ImageObject",
              url: PUBLISHER_LOGO,
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
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Notícias", item: `${SITE_URL}/noticias` },
            { "@type": "ListItem", position: 3, name: article.title, item: url },
          ],
        }),
      },
    ];

    if (faq.length > 0) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((entry) => ({
            "@type": "Question",
            name: entry.q,
            acceptedAnswer: { "@type": "Answer", text: entry.a },
          })),
        }),
      });
    }

    return {
      meta: [
        { title: seoTitle },
        { name: "description", content: desc },
        { property: "og:title", content: article.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: desc },
        ...(absoluteImage
          ? [
              { property: "og:image", content: absoluteImage },
              { name: "twitter:image", content: absoluteImage },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
        { property: "article:author", content: authorMeta.url },
        { property: "article:published_time", content: article.published_at },
        { property: "article:modified_time", content: article.published_at },
        { property: "article:section", content: article.category },
        ...(tags.length > 0
          ? [{ name: "keywords", content: tags.join(", ") }]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
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
  const { article, related } = Route.useLoaderData();
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `${SITE_URL}/noticias/${article.slug}`;
  const tags = article.tags ?? [];

  return (
    <>
      {/* React 19 hoists these into <head> — bypasses meta dedup so all article:tag entries render */}
      {tags.map((tag: string, idx: number) => (
        <meta key={`article-tag-${idx}`} property="article:tag" content={tag} />
      ))}

      <section className="surface-dark hero-glow relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama mx-auto max-w-3xl">
          {/* Breadcrumb visível */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center justify-center gap-1.5 text-[12px] uppercase tracking-[0.14em] text-white/55"
          >
            <Link to="/" className="hover:text-[var(--gold-light)]">
              Início
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
            <Link to="/noticias" className="hover:text-[var(--gold-light)]">
              Notícias
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
            <span
              className="max-w-[260px] truncate normal-case tracking-normal text-white/75 md:max-w-[420px]"
              aria-current="page"
              title={article.title}
            >
              {article.title}
            </span>
          </nav>

          <div className="mb-6 flex items-center justify-center gap-3 text-center">
            <CategoryBadge category={article.category} />
            <span className="text-xs uppercase tracking-[0.14em] text-white/60">
              {formatDateBR(article.published_at)}
            </span>
          </div>
          <h1 className="heading-display text-center text-[32px] md:text-[44px]">
            <span className="gold-text">{article.title}</span>
          </h1>
          {article.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] italic text-white/75">
              {article.subtitle}
            </p>
          )}
          <p className="mt-6 text-center text-sm uppercase tracking-[0.18em] text-white/55">
            Por {article.author} · {getAuthorMeta(article.author).jobTitle}
          </p>

          {tags.length > 0 && (
            <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
              {tags.map((tag: string) => (
                <li key={tag}>
                  <span
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-white/75"
                  >
                    #{tag}
                  </span>
                </li>
              ))}
            </ul>
          )}
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

          {tags.length > 0 && (
            <div className="mt-10">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                Tópicos
              </div>
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <li key={`bottom-${tag}`}>
                    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] font-medium text-[var(--navy)]">
                      #{tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(() => {
            const latestBlog = [...BLOG_POSTS]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .slice(0, 2);
            if (latestBlog.length === 0) return null;
            return (
              <aside className="mt-10 rounded-[12px] border border-[var(--border)] bg-white p-6">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                  📖 No blog
                </div>
                <ul className="space-y-2">
                  {latestBlog.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="text-[14.5px] font-medium text-[var(--navy)] underline-offset-2 hover:text-[var(--gold-deep)] hover:underline"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            );
          })()}

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

      {related.length > 0 && (
        <section className="border-t border-[var(--border)] bg-white py-16 md:py-20">
          <div className="container-dama mx-auto max-w-5xl">
            <h2 className="mb-8 font-serif text-[24px] font-semibold text-[var(--navy)] md:text-[28px]">
              Notícias relacionadas
            </h2>
            <ul className="grid grid-cols-1 gap-5">
              {related.map((n: NewsArticleListItem) => (
                <li key={n.id}>
                  <Link
                    to="/noticias/$slug"
                    params={{ slug: n.slug }}
                    className="group flex flex-col gap-4 overflow-hidden rounded-[12px] border border-[var(--border)] bg-white transition-all hover:-translate-y-[2px] hover:border-[color-mix(in_oklab,var(--gold)_55%,var(--border))] hover:shadow-[var(--shadow-gold)] sm:flex-row"
                  >
                    {n.cover_image && (
                      <div className="h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
                        <img
                          src={n.cover_image}
                          alt={n.cover_image_alt ?? n.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-center p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <CategoryBadge category={n.category} />
                        <span className="text-[12px] text-[var(--text-muted)]">
                          {formatDateBR(n.published_at)}
                        </span>
                      </div>
                      <h3 className="font-serif text-[17px] font-semibold leading-[1.35] text-[var(--navy)] transition-colors group-hover:text-[var(--gold-deep)] md:text-[18px]">
                        {n.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
