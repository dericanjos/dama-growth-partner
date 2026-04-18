import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { BLOG_CATEGORIES, BLOG_POSTS, formatDateBR } from "@/data/blog";
import { CategoryBadge } from "@/components/CategoryBadge";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Grupo DAMA — Insights para Médicos que Pensam como Empresários" },
      {
        name: "description",
        content:
          "Artigos sobre crescimento de consultório, marketing médico ético, gestão comercial e tendências do mercado de saúde. Conteúdo exclusivo do Grupo DAMA.",
      },
      { property: "og:title", content: "Blog | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "Insights para médicos que pensam como empresários. Crescimento, marketing e mercado.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [active, setActive] = useState<"Todos" | (typeof BLOG_CATEGORIES)[number]>("Todos");

  const posts = useMemo(() => {
    const list = active === "Todos" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [active]);

  return (
    <>
      {/* Header */}
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container-dama text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Blog DAMA
          </span>
          <h1 className="heading-display text-[44px] md:text-[64px]">
            <span className="gold-text">Blog</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.7] text-white/70">
            Insights para médicos que pensam como empresários.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-8">
        <div className="container-dama flex flex-wrap items-center justify-center gap-2.5">
          {(["Todos", ...BLOG_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`filter-pill ${active === cat ? "filter-pill-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de posts */}
      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama">
          {posts.length === 0 ? (
            <p className="py-20 text-center text-[var(--text-muted)]">
              Nenhum artigo nesta categoria ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="card-dama group flex flex-col overflow-hidden hover:[&]:[transform:translateY(-4px)] hover:[&]:[border-color:color-mix(in_oklab,var(--gold)_50%,var(--border))] hover:[&]:[box-shadow:var(--shadow-gold)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--navy-light)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText
                        className="h-12 w-12 text-[color-mix(in_oklab,var(--gold)_60%,transparent)] transition-transform duration-500 group-hover:scale-110"
                        strokeWidth={1.2}
                      />
                    </div>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, transparent 40%, color-mix(in oklab, var(--navy-dark) 50%, transparent) 100%)",
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between">
                      <CategoryBadge category={post.category} />
                      <span className="text-[12px] text-[var(--text-muted)]">
                        {formatDateBR(post.date)}
                      </span>
                    </div>
                    <h2
                      className="font-serif text-[19px] font-semibold leading-[1.3] text-[var(--navy)]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-[14px] leading-[1.65] text-[var(--text-secondary)]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <span className="mt-auto pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                      Ler artigo →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
