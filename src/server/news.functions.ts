import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export interface NewsArticleListItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  source_name: string;
  source_url: string | null;
  category: string;
  author: string;
  cover_image: string | null;
  cover_image_alt: string | null;
  published_at: string;
  seo_title: string | null;
}

export interface NewsArticleFull extends NewsArticleListItem {}

const PAGE_SIZE = 10;

export const listPublishedNews = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        page: z.number().int().min(1).max(500).optional().default(1),
        category: z.string().min(1).max(80).optional().nullable(),
      })
      .parse(data ?? {}),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      items: NewsArticleListItem[];
      total: number;
      page: number;
      pageSize: number;
    }> => {
      const page = data.page ?? 1;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabaseAdmin
        .from("news_articles")
        .select(
          "id, slug, title, subtitle, content, source_name, source_url, category, author, cover_image, cover_image_alt, published_at, seo_title",
          { count: "exact" },
        )
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .range(from, to);

      if (data.category) {
        query = query.eq("category", data.category);
      }

      const { data: rows, count, error } = await query;
      if (error) {
        console.error("Erro ao listar notícias:", error);
        return { items: [], total: 0, page, pageSize: PAGE_SIZE };
      }
      return {
        items: (rows ?? []) as NewsArticleListItem[],
        total: count ?? 0,
        page,
        pageSize: PAGE_SIZE,
      };
    },
  );

export const getNewsArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ slug: z.string().min(1).max(255) }).parse(data),
  )
  .handler(async ({ data }): Promise<{ article: NewsArticleFull | null }> => {
    const { data: row, error } = await supabaseAdmin
      .from("news_articles")
      .select(
        "id, slug, title, subtitle, content, source_name, source_url, category, author, cover_image, cover_image_alt, published_at, seo_title",
      )
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) {
      console.error("Erro ao buscar notícia:", error);
      return { article: null };
    }
    return { article: (row as NewsArticleFull | null) ?? null };
  });

export const listLatestNews = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ limit: z.number().int().min(1).max(10).optional().default(2) }).parse(data ?? {}),
  )
  .handler(async ({ data }): Promise<{ items: Array<{ slug: string; title: string }> }> => {
    const { data: rows, error } = await supabaseAdmin
      .from("news_articles")
      .select("slug, title")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(data.limit);
    if (error) {
      console.error("Erro ao listar últimas notícias:", error);
      return { items: [] };
    }
    return { items: (rows ?? []) as Array<{ slug: string; title: string }> };
  });
