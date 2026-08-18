import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE = "https://grupodamahealth.com.br";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/noticias/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        let rows: Array<{
          slug: string;
          title: string;
          subtitle: string | null;
          category: string | null;
          author: string | null;
          published_at: string;
        }> = [];
        try {
          const { data } = await supabaseAdmin
            .from("news_articles")
            .select("slug, title, subtitle, category, author, published_at")
            .eq("is_published", true)
            .order("published_at", { ascending: false })
            .limit(20);
          rows = (data ?? []) as typeof rows;
        } catch (e) {
          console.error("rss: failed to load news", e);
        }

        const items = rows
          .map((n) =>
            [
              "    <item>",
              `      <title>${esc(n.title)}</title>`,
              `      <link>${BASE}/noticias/${n.slug}</link>`,
              `      <guid isPermaLink="true">${BASE}/noticias/${n.slug}</guid>`,
              n.subtitle ? `      <description>${esc(n.subtitle)}</description>` : null,
              `      <pubDate>${new Date(n.published_at).toUTCString()}</pubDate>`,
              n.category ? `      <category>${esc(n.category)}</category>` : null,
              n.author ? `      <author>${esc(n.author)}</author>` : null,
              "    </item>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
          "  <channel>",
          "    <title>Notícias Médicas · Grupo DAMA Health</title>",
          `    <link>${BASE}/noticias</link>`,
          "    <description>Análise e contexto das notícias mais relevantes do mundo médico.</description>",
          "    <language>pt-BR</language>",
          `    <lastBuildDate>${new Date(rows[0]?.published_at ?? Date.now()).toUTCString()}</lastBuildDate>`,
          `    <atom:link href="${BASE}/noticias/rss.xml" rel="self" type="application/rss+xml" />`,
          items,
          "  </channel>",
          "</rss>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
