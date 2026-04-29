import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Newspaper } from "lucide-react";
import { NEWS_CATEGORIES, NEWS_ITEMS } from "@/data/news";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDateBR } from "@/data/blog";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias Médicas | Grupo DAMA" },
      {
        name: "description",
        content:
          "Acompanhe as principais notícias do mundo médico: regulamentações do CFM, congressos, pesquisas e tendências do mercado de saúde no Brasil.",
      },
      { property: "og:title", content: "Notícias Médicas | Grupo DAMA" },
      {
        property: "og:description",
        content:
          "As principais atualizações do mundo da saúde, curadas pela equipe DAMA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://grupodamahealth.com.br/noticias" },
    ],
    links: [{ rel: "canonical", href: "https://grupodamahealth.com.br/noticias" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [active, setActive] = useState<"Todas" | (typeof NEWS_CATEGORIES)[number]>("Todas");

  const items = useMemo(() => {
    const list = active === "Todas" ? NEWS_ITEMS : NEWS_ITEMS.filter((n) => n.category === active);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [active]);

  return (
    <>
      <section className="surface-dark hero-glow relative pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container-dama text-center">
          <span className="badge-pill mb-6">
            <span className="badge-pill-dot" /> Curadoria DAMA
          </span>
          <h1 className="heading-display text-[40px] md:text-[60px]">
            <span className="gold-text">Notícias Médicas</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.7] text-white/70">
            As principais atualizações do mundo da saúde, curadas pela equipe DAMA.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-8">
        <div className="container-dama flex flex-wrap items-center justify-center gap-2.5">
          {(["Todas", ...NEWS_CATEGORIES] as const).map((cat) => (
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

      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama mx-auto max-w-3xl">
          {items.length === 0 ? (
            <p className="py-16 text-center text-[var(--text-muted)]">
              Nenhuma notícia nesta categoria.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((n, i) => (
                <li key={i}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-dama group flex flex-col gap-4 p-5 hover:[&]:[transform:translateY(-2px)] hover:[&]:[border-color:color-mix(in_oklab,var(--gold)_55%,var(--border))] hover:[&]:[box-shadow:var(--shadow-gold)] md:flex-row md:items-center md:gap-6 md:p-6"
                  >
                    <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-[10px] bg-[var(--navy-light)] md:h-20 md:w-32">
                      <Newspaper
                        className="h-7 w-7 text-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
                        strokeWidth={1.4}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <CategoryBadge category={n.category} />
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--gold-deep)]">
                          {n.source}
                        </span>
                        <span className="text-[12px] text-[var(--text-muted)]">
                          {formatDateBR(n.date)}
                        </span>
                      </div>
                      <h2 className="flex items-start gap-2 font-serif text-[18px] font-semibold leading-[1.35] text-[var(--navy)] transition-colors group-hover:text-[var(--gold-deep)]">
                        <span>{n.title}</span>
                        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
                      </h2>
                      <p
                        className="mt-2 text-[14px] leading-[1.6] text-[var(--text-secondary)]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {n.summary}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-10 text-center text-xs text-[var(--text-muted)]">
            Curadoria editorial. Os links levam às fontes originais. O Grupo DAMA não se
            responsabiliza pelo conteúdo de terceiros.
          </p>
        </div>
      </section>
    </>
  );
}
