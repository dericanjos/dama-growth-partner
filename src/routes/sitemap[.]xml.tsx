import { createFileRoute } from "@tanstack/react-router";
import { BLOG_POSTS } from "@/data/blog";

const SITE = "https://grupodama.com.br";

const STATIC_PATHS: Array<{ loc: string; priority: string; changefreq: string }> = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/sobre", priority: "0.8", changefreq: "monthly" },
  { loc: "/solucao", priority: "0.9", changefreq: "monthly" },
  { loc: "/metodo", priority: "0.8", changefreq: "monthly" },
  { loc: "/blog", priority: "0.8", changefreq: "weekly" },
  { loc: "/noticias", priority: "0.7", changefreq: "weekly" },
  { loc: "/contato", priority: "0.6", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const staticUrls = STATIC_PATHS.map(
          (p) =>
            `  <url><loc>${SITE}${p.loc}</loc><lastmod>${today}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
        );
        const postUrls = BLOG_POSTS.map(
          (post) =>
            `  <url><loc>${SITE}/blog/${post.slug}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
