import { createFileRoute, Link } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDateBR } from "@/data/blog";
import { listPublishedNews, type NewsArticleListItem } from "@/lib/news.functions";
import { z } from "zod";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const NEWS_CATEGORIES = [
  "Regulação",
  "Políticas Públicas",
  "Política de Saúde",
  "Saúde Suplementar",
  "Vigilância Sanitária",
  "Planos de Saúde",
  "Classe Médica",
  "Mercado",
  "Tecnologia",
  "Geral",
] as const;

const SITE_URL = "https://grupodamahealth.com.br";

function pageUrl(page: number, cat?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (cat) params.set("cat", cat);
  const qs = params.toString();
  return `${SITE_URL}/noticias${qs ? `?${qs}` : ""}`;
}

function pagePath(page: number, cat?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (cat) params.set("cat", cat);
  const qs = params.toString();
  return `/noticias${qs ? `?${qs}` : ""}`;
}

const searchSchema = z.object({
  page: z.coerce.number().int().min(1).max(500).optional(),
  cat: z.string().min(1).max(80).optional(),
});

export const Route = createFileRoute("/noticias/")({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search }) => ({ page: search.page, cat: search.cat }),
  loader: ({ deps }): Promise<{
    items: NewsArticleListItem[];
    total: number;
    page: number;
    pageSize: number;
  }> =>
    listPublishedNews({
      data: { page: deps.page ?? 1, category: deps.cat ?? null },
    }),
  head: ({ loaderData }) => {
    const page = loaderData?.page ?? 1;
    const pageSize = loaderData?.pageSize ?? 10;
    const total = loaderData?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const title =
      page > 1
        ? `Notícias Médicas · Página ${page} · Grupo DAMA Health`
        : "Notícias Médicas | Grupo DAMA";
    const description =
      page > 1
        ? `Página ${page} do acervo de notícias médicas do Grupo DAMA, com análise de regulação, saúde suplementar e mercado médico.`
        : "Análise e contexto das notícias mais relevantes do mundo médico. Fontes oficiais: CFM, Ministério da Saúde, ANVISA, ANS, AMB.";
    const canonical = pageUrl(page);
    const links: Array<{ rel: string; href: string }> = [
      { rel: "canonical", href: canonical },
    ];
    if (page > 1) links.push({ rel: "prev", href: pageUrl(page - 1) });
    if (page < totalPages) links.push({ rel: "next", href: pageUrl(page + 1) });
    const items = loaderData?.items ?? [];
    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: canonical,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Thing",
        name: "Notícias do mercado médico brasileiro, regulação e saúde suplementar",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: (page - 1) * pageSize + i + 1,
          url: `${SITE_URL}/noticias/${item.slug}`,
          name: item.title,
        })),
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(collectionSchema) },
      ],
    };
  },

  component: NewsPage,
});

function excerpt(text: string, max = 200) {
  const plain = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>~\-]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? `${plain.slice(0, max).trim()}…` : plain;
}

interface LoaderData {
  items: NewsArticleListItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface SearchParams {
  page?: number;
  cat?: string;
}

function NewsPage() {
  const { items, total, page, pageSize } = Route.useLoaderData() as LoaderData;
  const search = Route.useSearch() as SearchParams;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const activeCat = search.cat ?? "Todas";

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
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-white/70">
            Análise e contexto das notícias mais relevantes do mundo médico.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] uppercase tracking-[0.16em] text-white/55">
            Fontes oficiais: CFM · Ministério da Saúde · ANVISA · ANS · AMB
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--cream)] py-8">
        <div className="container-dama flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={pagePath(1)}
            className={`filter-pill ${activeCat === "Todas" ? "filter-pill-active" : ""}`}
          >
            Todas
          </a>
          {NEWS_CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={pagePath(1, cat)}
              className={`filter-pill ${activeCat === cat ? "filter-pill-active" : ""}`}
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="container-dama mx-auto max-w-3xl">
          {items.length === 0 ? (
            <div className="rounded-[12px] border border-dashed border-[var(--border)] bg-white/50 p-10 text-center">
              <Newspaper className="mx-auto mb-3 h-8 w-8 text-[var(--text-muted)]" />
              <p className="text-[15px] text-[var(--text-muted)]">
                Nenhuma notícia publicada ainda nesta categoria.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((n) => (
                <li key={n.id}>
                  <Link
                    to="/noticias/$slug"
                    params={{ slug: n.slug }}
                    className="card-dama group block overflow-hidden p-0 hover:[&]:[transform:translateY(-2px)] hover:[&]:[border-color:color-mix(in_oklab,var(--gold)_55%,var(--border))] hover:[&]:[box-shadow:var(--shadow-gold)]"
                  >
                    {n.cover_image && (
                      <img
                        src={n.cover_image}
                        alt={n.cover_image_alt ?? n.title}
                        width={1200}
                        height={630}
                        loading="lazy"
                        decoding="async"
                        className="h-48 w-full object-cover md:h-56"
                      />
                    )}
                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <CategoryBadge category={n.category} />
                        <span className="text-[12px] text-[var(--text-muted)]">
                          {formatDateBR(n.published_at)}
                        </span>
                      </div>
                      <h2 className="font-serif text-[20px] font-semibold leading-[1.35] text-[var(--navy)] transition-colors group-hover:text-[var(--gold-deep)] md:text-[22px]">
                        {n.title}
                      </h2>
                      {n.subtitle && (
                        <p className="mt-1 text-[14px] italic text-[var(--text-secondary)]">
                          {n.subtitle}
                        </p>
                      )}
                      <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--text-secondary)]">
                        {excerpt(n.content, 200)}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--gold-deep)]">
                          Fonte: {n.source_name}
                        </span>
                        <span className="text-[13px] font-medium text-[var(--gold-deep)] group-hover:underline">
                          Ler notícia completa →
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Paginação"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {page > 1 ? (
                <a href={pagePath(page - 1, search.cat)} rel="prev" className="filter-pill">
                  ← Anterior
                </a>
              ) : (
                <span className="filter-pill opacity-40">← Anterior</span>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
                p === page ? (
                  <span key={p} className="filter-pill filter-pill-active" aria-current="page">
                    {p}
                  </span>
                ) : (
                  <a key={p} href={pagePath(p, search.cat)} className="filter-pill">
                    {p}
                  </a>
                ),
              )}
              {page < totalPages ? (
                <a href={pagePath(page + 1, search.cat)} rel="next" className="filter-pill">
                  Próxima →
                </a>
              ) : (
                <span className="filter-pill opacity-40">Próxima →</span>
              )}
            </nav>
          )}

          <NewsletterSignup origem="noticias" className="mt-14" />

          <p className="mt-10 text-center text-xs text-[var(--text-muted)]">
            Análise editorial do Grupo DAMA com base em fontes oficiais. Os links
            apontam para o material original publicado pelas instituições.
          </p>
        </div>
      </section>
    </>
  );
}
