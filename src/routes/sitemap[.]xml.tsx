import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { BLOG_POSTS } from "@/data/blog";

const BASE = "https://grupodamahealth.com.br";

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
}

const day = (value: string | null | undefined) =>
  (value ?? "").split("T")[0] || undefined;

const STATIC_PAGES: Entry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/sobre", changefreq: "monthly", priority: "0.8" },
  { loc: "/solucao", changefreq: "monthly", priority: "0.9" },
  { loc: "/metodo", changefreq: "monthly", priority: "0.8" },
  { loc: "/escola", changefreq: "monthly", priority: "0.8" },
  { loc: "/contato", changefreq: "yearly", priority: "0.6" },
  { loc: "/faq", changefreq: "monthly", priority: "0.7" },
  { loc: "/glossario", changefreq: "monthly", priority: "0.6" },
  { loc: "/privacidade", changefreq: "yearly", priority: "0.3" },
  { loc: "/termos", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Notícias publicadas (mesma fonte da listagem /noticias)
        let news: Array<{ slug: string; published_at: string; author: string | null }> = [];
        try {
          const { data } = await supabaseAdmin
            .from("news_articles")
            .select("slug, published_at, author")
            .eq("is_published", true)
            .order("published_at", { ascending: false });
          news = (data ?? []) as typeof news;
        } catch (e) {
          console.error("sitemap: failed to load news", e);
        }

        // Posts do blog publicados (mesma fonte da listagem /blog)
        const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

        const newsEntries: Entry[] = news.map((n) => ({
          loc: `/noticias/${n.slug}`,
          lastmod: day(n.published_at),
          changefreq: "monthly",
          priority: "0.7",
        }));

        const blogEntries: Entry[] = posts.map((p) => ({
          loc: `/blog/${p.slug}`,
          lastmod: day(p.date),
          changefreq: "monthly",
          priority: "0.7",
        }));

        const indexEntries: Entry[] = [
          {
            loc: "/noticias",
            lastmod: day(news[0]?.published_at),
            changefreq: "weekly",
            priority: "0.8",
          },
          {
            loc: "/blog",
            lastmod: day(posts[0]?.date),
            changefreq: "weekly",
            priority: "0.8",
          },
        ];

        // Páginas paginadas de /noticias (10 itens por página, igual à listagem)
        const NEWS_PAGE_SIZE = 10;
        const newsPageCount = Math.max(1, Math.ceil(news.length / NEWS_PAGE_SIZE));
        const paginatedEntries: Entry[] = Array.from(
          { length: Math.max(0, newsPageCount - 1) },
          (_, i) => ({
            loc: `/noticias?page=${i + 2}`,
            lastmod: day(news[(i + 1) * NEWS_PAGE_SIZE]?.published_at),
            changefreq: "weekly" as const,
            priority: "0.5",
          }),
        );

        const authorEntries: Entry[] = [
          { loc: "/autor/deric-anjos", changefreq: "monthly", priority: "0.6" },
          { loc: "/autor/jessica-anjos", changefreq: "monthly", priority: "0.6" },
        ].map((a) => {
          const name = a.loc.includes("deric") ? "Deric Anjos" : "Jéssica Anjos";
          const latestNews = news.find((n) => n.author === name)?.published_at;
          const latestPost = posts.find((p) => p.author === name)?.date;
          const candidates = [day(latestNews), day(latestPost)].filter(Boolean) as string[];
          candidates.sort((x, y) => y.localeCompare(x));
          return { ...a, lastmod: candidates[0] } as Entry;
        });

        const all: Entry[] = [
          ...STATIC_PAGES,
          ...indexEntries,
          ...paginatedEntries,
          ...authorEntries,
          ...newsEntries,
          ...blogEntries,
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...all.map((u) =>
            [
              `  <url>`,
              `    <loc>${BASE}${u.loc.replace(/&/g, "&amp;")}</loc>`,
              u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
              `    <changefreq>${u.changefreq}</changefreq>`,
              `    <priority>${u.priority}</priority>`,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=600",
          },
        });
      },
    },
  },
});
