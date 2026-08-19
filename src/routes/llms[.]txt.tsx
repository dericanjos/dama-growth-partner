import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { BLOG_POSTS } from "@/data/blog";
import { ORGANIZACAO } from "@/config/organizacao";

const BASE = ORGANIZACAO.site;

const INSTITUTIONAL: Array<{ path: string; label: string; line: string }> = [
  { path: "/", label: "Home", line: "Visão geral da operação comercial DAMA para médicos e clínicas." },
  { path: "/sobre", label: "Quem Somos", line: "História, fundadora, time e dados institucionais do Grupo DAMA Health." },
  { path: "/solucao", label: "O que fazemos", line: "Visão geral das três verticais do Grupo DAMA Health: DAMA Estratégica, DAMA Escola e DAMA Tech, com o público de cada uma." },
  { path: "/dama-estrategica", label: "DAMA Estratégica", line: "A operação comercial estratégica: operação comercial, growth e marketing médico dentro do consultório do médico parceiro." },
  { path: "/escola", label: "DAMA Escola", line: "Vertical educacional do Grupo DAMA Health, dedicada à formação de profissionais de atendimento do mercado médico." },
  { path: "/dama-tech", label: "DAMA Tech", line: "Vertical de tecnologia: Plataforma de Atendimento DAMA, App DAMA e CRM DAMA, a camada comercial entre o primeiro contato e a consulta." },
  { path: "/metodo", label: "Método", line: "Como funciona o processo comercial estruturado, etapa por etapa." },
  { path: "/contato", label: "Contato", line: "Canais oficiais de contato com o setor comercial." },
  { path: "/faq", label: "Perguntas Frequentes", line: "Respostas às dúvidas mais comuns de médicos parceiros." },
  { path: "/glossario", label: "Glossário", line: "Definição de 20 termos do mercado médico e da saúde suplementar." },
  { path: "/privacidade", label: "Política de Privacidade", line: "Como tratamos dados pessoais, conforme a LGPD." },
  { path: "/termos", label: "Termos de Uso", line: "Condições de uso do site institucional." },
];

function oneLine(text: string, max = 180) {
  const plain = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[#*_`>~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? `${plain.slice(0, max).trim()}...` : plain;
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        let news: Array<{
          slug: string;
          title: string;
          subtitle: string | null;
          meta_description: string | null;
          content: string;
          published_at: string;
        }> = [];
        try {
          const { data } = await supabaseAdmin
            .from("news_articles")
            .select("slug, title, subtitle, meta_description, content, published_at")
            .eq("is_published", true)
            .order("published_at", { ascending: false });
          news = (data ?? []) as typeof news;
        } catch (e) {
          console.error("llms.txt: failed to load news", e);
        }

        const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

        const lines: string[] = [];
        lines.push("# Grupo DAMA Health");
        lines.push("");
        lines.push(
          `> ${ORGANIZACAO.nomeFantasia} (CNPJ ${ORGANIZACAO.cnpj}, ${ORGANIZACAO.cidade} · ${ORGANIZACAO.uf}, Brasil) é parceira comercial de médicos e clínicas. Estrutura a captação, a qualificação e a conversão de pacientes particulares com equipe dedicada, growth marketing e marketing 360, substituindo o marketing isolado por uma operação comercial completa. Atende médicos e clínicas em todo o território brasileiro. Fundada por Jéssica Anjos em ${ORGANIZACAO.fundacao}.`,
        );
        lines.push("");

        lines.push("## Páginas institucionais");
        lines.push("");
        for (const page of INSTITUTIONAL) {
          lines.push(`- [${page.label}](${BASE}${page.path}): ${page.line}`);
        }
        lines.push("");

        lines.push("## Notícias");
        lines.push("");
        for (const n of news) {
          const line = oneLine(n.subtitle || n.meta_description || n.content);
          lines.push(`- [${n.title}](${BASE}/noticias/${n.slug}): ${line}`);
        }
        lines.push("");

        lines.push("## Blog");
        lines.push("");
        for (const p of posts) {
          lines.push(`- [${p.title}](${BASE}/blog/${p.slug}): ${oneLine(p.metaDescription || p.excerpt)}`);
        }
        lines.push("");

        lines.push("## Glossário");
        lines.push("");
        lines.push(
          `- [Glossário](${BASE}/glossario): define 20 termos do mercado médico e da saúde suplementar usados no conteúdo do site.`,
        );
        lines.push("");

        lines.push("## Autores");
        lines.push("");
        lines.push(
          `- [Jéssica Anjos](${BASE}/autor/jessica-anjos): fundadora do Grupo DAMA Health. Assina conteúdo sobre saúde suplementar, gestão médica e marketing de consultório.`,
        );
        lines.push(
          `- [Deric Anjos](${BASE}/autor/deric-anjos): Head de Growth. Assina conteúdo sobre growth para consultórios, regulação CFM e estratégia comercial.`,
        );
        lines.push("");

        lines.push("## Propriedades relacionadas");
        lines.push("");
        lines.push(
          "- [DAMA Secretariado Médico](https://comercial.grupodamahealth.com.br): operação de secretariado e atendimento comercial para consultórios.",
        );
        lines.push(
          "- [Escola DAMA](https://escola.grupodamahealth.com.br): vertical educacional do Grupo DAMA Health, formação de profissionais de atendimento do mercado médico.",
        );
        lines.push(
          `- [Escola DAMA no site institucional](${BASE}/escola): página institucional da vertical educacional.`,
        );
        lines.push(`- [Feed RSS das notícias](${BASE}/noticias/rss.xml): atualização contínua da cobertura editorial.`);
        lines.push(`- [Conteúdo integral em texto](${BASE}/llms-full.txt): corpo completo de notícias e artigos.`);
        lines.push("");

        return new Response(lines.join("\n"), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=600",
          },
        });
      },
    },
  },
});
