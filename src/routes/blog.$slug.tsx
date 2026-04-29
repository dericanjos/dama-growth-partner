import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import {
  formatDateBR,
  getPostBySlug,
  getRelatedPosts,
  readingTimeMinutes,
} from "@/data/blog";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ShareButtons } from "@/components/ShareButtons";
import { ForumSection } from "@/components/forum/ForumSection";
import { getForumQuestionsForSlug } from "@/server/forum-read.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    const { questions } = await getForumQuestionsForSlug({
      data: { slug: params.slug },
    });
    return { post, questions };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Artigo | Blog — Grupo DAMA" }] };
    const { post } = loaderData;
    const desc = post.excerpt.slice(0, 155);
    const url = `https://grupodamahealth.com.br/blog/${post.slug}`;
    const authorName = post.author ?? "Deric Anjos";
    const titleText = post.seoTitle ?? post.title;
    return {
      meta: [
        { title: `${titleText} | Grupo DAMA` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.coverImage
          ? [
              { property: "og:image", content: post.coverImage },
              { name: "twitter:image", content: post.coverImage },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: post.date },
        { property: "article:author", content: authorName },
        { property: "article:section", content: post.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: desc,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: authorName,
              jobTitle: "Head de Growth",
              url: "https://grupodamahealth.com.br/autor/deric-anjos",
              worksFor: {
                "@type": "Organization",
                name: "Grupo DAMA",
              },
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
            image: post.coverImage ? [post.coverImage] : undefined,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: post.category,
            ...(loaderData.questions && loaderData.questions.length > 0
              ? {
                  mentions: loaderData.questions
                    .filter((q) => q.answers.length > 0)
                    .slice(0, 10)
                    .map((q) => ({
                      "@type": "Question",
                      name: q.question_text,
                      text: q.question_text,
                      dateCreated: q.created_at,
                      author: q.user?.name
                        ? { "@type": "Person", name: q.user.name }
                        : undefined,
                      answerCount: q.answers.length,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: q.answers[0].answer_text,
                        dateCreated: q.answers[0].created_at,
                        author: q.answers[0].user?.name
                          ? { "@type": "Person", name: q.answers[0].user.name }
                          : undefined,
                      },
                    })),
                }
              : {}),
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
                name: "Blog",
                item: "https://grupodamahealth.com.br/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: url,
              },
            ],
          }),
        },
        ...(post.faqSchema && post.faqSchema.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.faqSchema.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <section className="surface-dark hero-glow relative flex min-h-[70vh] items-center pt-24">
      <div className="container-dama text-center">
        <h1 className="heading-display text-4xl">
          <span className="gold-text">Artigo não encontrado</span>
        </h1>
        <p className="mt-4 text-white/70">O conteúdo que você procura pode ter sido movido.</p>
        <Link to="/blog" className="btn-gold mt-8">
          Voltar ao Blog
        </Link>
      </div>
    </section>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const minutes = readingTimeMinutes(post.content);
  const related = getRelatedPosts(post.slug, post.category, 3);
  const url =
    typeof window !== "undefined" ? window.location.href : `https://grupodamahealth.com.br/blog/${post.slug}`;

  return (
    <>
      {/* Header navy */}
      <section className="surface-dark hero-glow relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-dama mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <CategoryBadge category={post.category} />
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/60">
              <Clock className="h-3.5 w-3.5" /> {minutes} min de leitura
            </span>
          </div>
          <h1 className="heading-display text-[32px] md:text-[44px]">
            <span className="gold-text">{post.title}</span>
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-white/55">
            {post.author ? <>Por {post.author} · Head de Growth · </> : null}
            {formatDateBR(post.date)}
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="bg-[var(--cream)] py-16 md:py-20">
        <article className="container-dama mx-auto max-w-[720px]">
          {post.coverImage && (
            <div className="mb-10 h-64 w-full overflow-hidden rounded-[14px] md:h-80">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                width={800}
                height={450}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          {/* Quick Answer Block */}
          <aside
            className="mb-10 rounded-[12px] border-l-[3px] p-6 md:p-7"
            style={{
              background: "var(--navy-light)",
              borderLeftColor: "var(--gold)",
            }}
          >
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              Resposta rápida
            </div>
            <p className="text-[15px] leading-[1.65] text-white/85 md:text-[16px]">
              {post.quickAnswer}
            </p>
          </aside>

          <MarkdownContent content={post.content} />

          <div className="mt-12 border-t border-[var(--border)] pt-8">
            <ShareButtons title={post.title} url={url} />
          </div>

          {/* CTA */}
          <div
            className="mt-12 rounded-[14px] border p-8 text-center md:p-10"
            style={{
              background:
                "linear-gradient(180deg, var(--navy-light) 0%, var(--navy) 100%)",
              borderColor: "color-mix(in oklab, var(--gold) 28%, transparent)",
            }}
          >
            <h3 className="font-serif text-[24px] font-semibold text-white md:text-[28px]">
              Quer aplicar essas estratégias no seu consultório?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-white/70">
              Conheça a parceria que coloca um time comercial inteiro a operar pelo seu consultório.
            </p>
            <a
              href="https://comercial.grupodamahealth.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-7"
            >
              Conhecer a Parceria DAMA →
            </a>
          </div>
        </article>
      </section>

      {/* Leia também */}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--cream)] pb-20">
          <div className="container-dama mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="heading-display text-[24px] md:text-[28px] text-[var(--navy)]">
                Leia também
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="card-dama group block overflow-hidden p-0"
                >
                  {p.coverImage && (
                    <img
                      src={p.coverImage}
                      alt={p.coverImageAlt ?? p.title}
                      width={400}
                      height={144}
                      loading="lazy"
                      decoding="async"
                      className="h-36 w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <CategoryBadge category={p.category} />
                    <h3 className="mt-3 font-serif text-[16px] font-semibold leading-[1.4] text-[var(--navy)] transition-colors group-hover:text-[var(--gold-deep)]">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
