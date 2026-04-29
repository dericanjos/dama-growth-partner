import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE = "https://grupodamahealth.com.br";

const STATIC_URLS: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
  { loc: "/", lastmod: "2026-04-21", changefreq: "weekly", priority: "1.0" },
  { loc: "/sobre", lastmod: "2026-04-18", changefreq: "monthly", priority: "0.8" },
  { loc: "/solucao", lastmod: "2026-04-18", changefreq: "monthly", priority: "0.9" },
  { loc: "/metodo", lastmod: "2026-04-18", changefreq: "monthly", priority: "0.8" },
  { loc: "/blog", lastmod: "2026-04-21", changefreq: "weekly", priority: "0.8" },
  { loc: "/noticias", lastmod: "2026-04-29", changefreq: "weekly", priority: "0.7" },
  { loc: "/contato", lastmod: "2026-04-18", changefreq: "yearly", priority: "0.6" },
  { loc: "/blog/o-que-e-operacao-comercial-consultorio", lastmod: "2026-04-03", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/por-que-marketing-sozinho-nao-lota-agenda", lastmod: "2026-04-07", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/quanto-medico-perde-sem-processo-comercial", lastmod: "2026-04-10", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/time-comercial-terceirizado-consultorio", lastmod: "2026-04-13", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/marketing-medico-cfm-2026", lastmod: "2026-04-16", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/7-sinais-consultorio-perdendo-dinheiro", lastmod: "2026-04-21", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/por-que-consultorio-precisa-aparecer-no-google", lastmod: "2026-03-20", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/marketing-medico-2026-panorama-completo", lastmod: "2026-03-17", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/trafego-pago-consultorio-medico-vale-investimento", lastmod: "2026-03-24", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/seu-site-medico-esta-afastando-pacientes", lastmod: "2026-03-27", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/como-reduzir-faltas-no-consultorio", lastmod: "2026-04-24", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/como-sair-do-convenio-viver-de-paciente-particular", lastmod: "2026-04-28", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog/redes-sociais-captacao-pacientes-consultorio-2026", lastmod: "2026-03-13", changefreq: "monthly", priority: "0.7" },
  { loc: "/autor/deric-anjos", lastmod: "2026-04-28", changefreq: "monthly", priority: "0.6" },
  { loc: "/glossario", lastmod: "2026-04-28", changefreq: "monthly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let newsEntries = "";
        try {
          const { data } = await supabaseAdmin
            .from("news_articles")
            .select("slug, published_at")
            .eq("is_published", true)
            .order("published_at", { ascending: false });
          newsEntries = (data ?? [])
            .map((n) => {
              const lastmod = (n.published_at ?? "").split("T")[0];
              return `<url><loc>${BASE}/noticias/${n.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
            })
            .join("");
        } catch (e) {
          console.error("sitemap: failed to load news", e);
        }

        const staticEntries = STATIC_URLS.map(
          (u) =>
            `<url><loc>${BASE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
        ).join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${newsEntries}</urlset>`;

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
