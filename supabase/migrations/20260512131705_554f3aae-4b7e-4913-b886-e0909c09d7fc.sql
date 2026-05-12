
ALTER TABLE public.news_articles
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS faq jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.news_articles
SET seo_title = regexp_replace(seo_title, '\s*\|\s*Grupo DAMA\s*$', '', 'i')
WHERE seo_title ILIKE '%| Grupo DAMA%';

UPDATE public.news_articles
SET
  seo_title = 'PPClin: Programa Nacional de Pesquisa Clínica 2026',
  meta_description = 'Ministério da Saúde institui o PPClin com R$ 120 milhões. O que muda na pesquisa clínica brasileira e no consultório médico.',
  faq = '[
    {"q":"O que é o PPClin?","a":"O PPClin é o Programa Nacional de Pesquisa Clínica, instituído por portaria do Ministério da Saúde. Ele organiza a pesquisa clínica feita no Brasil em torno de cinco diretrizes estruturantes e tem como missão posicionar o país como polo estratégico da rede global de pesquisa em saúde."},
    {"q":"Quanto o Brasil vai investir em pesquisa clínica?","a":"O programa começa com R$ 120 milhões, distribuídos entre infraestrutura de centros de pesquisa, formação de pesquisadores, ensaios clínicos prioritários (com foco em oncologia e fase 1) e integração com ANVISA e startups de saúde."},
    {"q":"Como isso afeta o paciente brasileiro?","a":"Mais ensaios clínicos rodando no Brasil significa acesso mais rápido a terapias inovadoras pelo SUS e pela rede privada, especialmente em áreas como oncologia, doenças raras e medicina de precisão. Também tende a reduzir o tempo entre aprovação internacional e disponibilidade no país."},
    {"q":"O que muda pra médicos que não atuam como pesquisadores?","a":"Mesmo sem participar diretamente de ensaios, o médico passa a ter mais opções terapêuticas validadas em população brasileira, dados nacionais para apoiar conduta clínica e oportunidades de encaminhar pacientes para protocolos de pesquisa em centros credenciados."}
  ]'::jsonb
WHERE slug = 'ppclin-programa-nacional-pesquisa-clinica-ministerio-saude-2026';
