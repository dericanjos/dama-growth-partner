import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE = "https://grupodamahealth.com.br";

function absolute(image: string | null): string | null {
  if (!image) return null;
  return image.startsWith("http") ? image : `${BASE}${image.startsWith("/") ? "" : "/"}${image}`;
}

export const Route = createFileRoute("/api/noticias.json")({
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
          cover_image: string | null;
          tags: string[] | null;
        }> = [];
        try {
          const { data } = await supabaseAdmin
            .from("news_articles")
            .select("slug, title, subtitle, category, author, published_at, cover_image, tags")
            .eq("is_published", true)
            .order("published_at", { ascending: false })
            .limit(20);
          rows = (data ?? []) as typeof rows;
        } catch (e) {
          console.error("api/noticias.json: failed to load news", e);
        }

        const body = {
          fonte: "Grupo DAMA Health",
          url: `${BASE}/noticias`,
          total: rows.length,
          noticias: rows.map((n) => ({
            titulo: n.title,
            linhaFina: n.subtitle ?? "",
            slug: n.slug,
            url: `${BASE}/noticias/${n.slug}`,
            data: n.published_at,
            categoria: n.category ?? "",
            autor: n.author ?? "",
            imagem: absolute(n.cover_image),
            tags: n.tags ?? [],
          })),
        };

        return new Response(JSON.stringify(body), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
