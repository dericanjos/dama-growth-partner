UPDATE public.news_articles SET cover_image = '/news/' || slug || '.webp', cover_image_alt = 'Capa da notícia: ' || title || ' Grupo DAMA Health.'
WHERE slug IN (
 'anvisa-agenda-regulatoria-2026-2027-161-temas',
 'cfm-forum-administracao-saude-seguranca-clinicas',
 'cfm-forum-internacional-medicos-fronteira-telemedicina-2026',
 'conitec-15-anos-incorporacao-tecnologias-sus-2026',
 'estatuto-direitos-paciente-lei-15378-2026',
 'governo-120-milhoes-pesquisa-clinica-ia-sus',
 'senado-aprova-piso-salarial-medicos-13662'
);