import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { BLOG_POSTS } from "@/data/blog";
import { ORGANIZACAO } from "@/config/organizacao";

const BASE = ORGANIZACAO.site;

interface NewsRow {
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  author: string;
  category: string;
  published_at: string;
  source_name: string | null;
  source_url: string | null;
}

const day = (value: string | null | undefined) => (value ?? "").split("T")[0] || "";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        let news: NewsRow[] = [];
        try {
          const { data } = await supabaseAdmin
            .from("news_articles")
            .select(
              "slug, title, subtitle, content, author, category, published_at, source_name, source_url",
            )
            .eq("is_published", true)
            .order("published_at", { ascending: false });
          news = (data ?? []) as NewsRow[];
        } catch (e) {
          console.error("llms-full.txt: failed to load news", e);
        }

        const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

        const out: string[] = [];
        out.push("# Grupo DAMA Health — conteúdo integral");
        out.push("");
        out.push(
          `Texto completo de todas as notícias e artigos publicados em ${BASE}. Fonte única, sem navegação nem marcação de interface.`,
        );
        out.push("");

        out.push("# Notícias");
        out.push("");
        for (const n of news) {
          out.push(`## ${n.title}`);
          if (n.subtitle) out.push(`Subtítulo: ${n.subtitle}`);
          out.push(`Data: ${day(n.published_at)}`);
          out.push(`Autor: ${n.author}`);
          out.push(`Categoria: ${n.category}`);
          out.push(`URL: ${BASE}/noticias/${n.slug}`);
          if (n.source_name) {
            out.push(`Fonte oficial: ${n.source_name}${n.source_url ? ` (${n.source_url})` : ""}`);
          }
          out.push("");
          out.push(n.content.trim());
          out.push("");
          out.push("---");
          out.push("");
        }

        out.push("# Blog");
        out.push("");
        for (const p of posts) {
          out.push(`## ${p.title}`);
          out.push(`Data: ${p.date}`);
          out.push(`Autor: ${p.author ?? "Deric Anjos"}`);
          out.push(`Categoria: ${p.category}`);
          out.push(`URL: ${BASE}/blog/${p.slug}`);
          out.push("");
          out.push(`Resposta direta: ${p.quickAnswer}`);
          out.push("");
          out.push(p.content.trim());
          if (p.faqSchema && p.faqSchema.length > 0) {
            out.push("");
            out.push("### Perguntas frequentes");
            for (const faq of p.faqSchema) {
              out.push(`Pergunta: ${faq.question}`);
              out.push(`Resposta: ${faq.answer}`);
              out.push("");
            }
          }
          out.push("");
          out.push("---");
          out.push("");
        }

        return new Response(out.join("\n"), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=600",
          },
        });
      },
    },
  },
});
