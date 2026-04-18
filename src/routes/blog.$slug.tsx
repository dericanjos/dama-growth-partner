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

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Artigo | Blog — Grupo DAMA" }] };
    const { post } = loaderData;
    const desc = post.excerpt.slice(0, 160);
    return {
      meta: [
        { title: `${post.title} | Blog — Grupo DAMA` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
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
    typeof window !== "undefined" ? window.location.href : `https://grupodama.com.br/blog/${post.slug}`;

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
            Publicado em {formatDateBR(post.date)}
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="bg-[var(--cream)] py-16 md:py-20">
        <article className="container-dama mx-auto max-w-[720px]">
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
              href="https://parceria.grupodama.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-7"
            >
              Conhecer a Parceria DAMA →
            </a>
          </div>
        </article>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--cream)] pb-20">
          <div className="container-dama">
            <div className="mb-8 text-center">
              <span className="badge-pill-light">
                <span className="badge-pill-dot" /> Continue lendo
              </span>
              <h2 className="heading-display mt-4 text-[28px] md:text-[34px]">
                Outros artigos sobre {post.category.toLowerCase()}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
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
                  <p className="mt-3 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                    {p.excerpt.slice(0, 110)}…
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
