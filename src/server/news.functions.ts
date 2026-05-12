import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export interface FaqEntry {
  q: string;
  a: string;
}

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
  meta_description: string | null;
  tags: string[];
  faq: FaqEntry[];
}

export interface NewsArticleFull extends NewsArticleListItem {}

const SELECT_COLUMNS =
  "id, slug, title, subtitle, content, source_name, source_url, category, author, cover_image, cover_image_alt, published_at, seo_title, meta_description, tags, faq";

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
          SELECT_COLUMNS,
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
        SELECT_COLUMNS,
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

export const listNewsByAuthor = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ author: z.string().min(1).max(120) }).parse(data),
  )
  .handler(async ({ data }): Promise<{ items: NewsArticleListItem[] }> => {
    const { data: rows, error } = await supabaseAdmin
      .from("news_articles")
      .select(
        SELECT_COLUMNS,
      )
      .eq("is_published", true)
      .eq("author", data.author)
      .order("published_at", { ascending: false });
    if (error) {
      console.error("Erro ao listar notícias por autor:", error);
      return { items: [] };
    }
    return { items: (rows ?? []) as NewsArticleListItem[] };
  });


export const listRelatedNews = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        slug: z.string().min(1).max(255),
        category: z.string().min(1).max(120),
        tags: z.array(z.string()).optional().default([]),
        limit: z.number().int().min(1).max(6).optional().default(3),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ items: NewsArticleListItem[] }> => {
    const limit = data.limit ?? 3;

    // Try same-category first
    const { data: catRows } = await supabaseAdmin
      .from("news_articles")
      .select(SELECT_COLUMNS)
      .eq("is_published", true)
      .eq("category", data.category)
      .neq("slug", data.slug)
      .order("published_at", { ascending: false })
      .limit(limit);

    let items = (catRows ?? []) as NewsArticleListItem[];

    // Fallback: any tag overlap
    if (items.length < limit && data.tags.length > 0) {
      const { data: tagRows } = await supabaseAdmin
        .from("news_articles")
        .select(SELECT_COLUMNS)
        .eq("is_published", true)
        .neq("slug", data.slug)
        .overlaps("tags", data.tags)
        .order("published_at", { ascending: false })
        .limit(limit);
      const seen = new Set(items.map((i) => i.id));
      for (const row of (tagRows ?? []) as NewsArticleListItem[]) {
        if (!seen.has(row.id)) {
          items.push(row);
          seen.add(row.id);
        }
        if (items.length >= limit) break;
      }
    }

    // Final fallback: latest other news
    if (items.length < limit) {
      const { data: latestRows } = await supabaseAdmin
        .from("news_articles")
        .select(SELECT_COLUMNS)
        .eq("is_published", true)
        .neq("slug", data.slug)
        .order("published_at", { ascending: false })
        .limit(limit);
      const seen = new Set(items.map((i) => i.id));
      for (const row of (latestRows ?? []) as NewsArticleListItem[]) {
        if (!seen.has(row.id)) {
          items.push(row);
          seen.add(row.id);
        }
        if (items.length >= limit) break;
      }
    }

    return { items: items.slice(0, limit) };
  });
