import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BLOG_POSTS, formatDateBR } from "@/data/blog";
import { CategoryBadge } from "@/components/CategoryBadge";

export function BlogHighlights() {
  const posts = [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="bg-[var(--cream)] py-24 md:py-32">
      <div className="container-dama">
        <Reveal className="max-w-2xl">
          <div className="badge-pill-light">
            <span className="badge-pill-dot" />
            Do Blog DAMA
          </div>
          <h2 className="heading-display mt-6 text-3xl md:text-[2.5rem]">
            Insights para médicos que pensam como empresários
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="card-dama group flex h-full flex-col p-7 hover:[&]:[transform:translateY(-4px)] hover:[&]:[border-color:color-mix(in_oklab,var(--gold)_50%,var(--border))] hover:[&]:[box-shadow:var(--shadow-gold)]"
              >
                <div className="flex items-center justify-between">
                  <CategoryBadge category={post.category} />
                  <span className="text-[12px] text-[var(--text-muted)]">
                    {formatDateBR(post.date)}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-[19px] font-semibold leading-[1.3] text-[var(--navy)]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-deep)]">
                  Ler artigo →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-12 text-center">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] transition-colors hover:text-[var(--gold-deep)]"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
