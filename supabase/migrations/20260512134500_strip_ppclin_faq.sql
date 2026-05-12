-- Remove duplicated markdown FAQ block from PPClin article (FAQ now rendered from jsonb on page)
UPDATE public.news_articles
SET content = regexp_replace(content, E'\\n## Perguntas frequentes[\\s\\S]*$', '')
WHERE slug = 'ppclin-programa-nacional-pesquisa-clinica-ministerio-saude-2026';
