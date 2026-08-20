-- 1. seo_title <= 60 chars (title, subtitle e content intactos)
update news_articles set seo_title = 'Estética invasiva é ato médico, decide o CFM | Grupo DAMA' where slug = 'cfm-reafirma-estetica-invasiva-ato-medico-estrutura-da-clinica';
update news_articles set seo_title = '947 mil vidas em revisão de contrato | Grupo DAMA' where slug = 'operadora-coloca-947-mil-vidas-em-revisao-o-que-muda-na-agenda-do-consultorio';
update news_articles set seo_title = 'Judicialização da saúde privada supera a do SUS | Grupo DAMA' where slug = 'judicializacao-saude-privada-supera-sus-181-mil-acoes-consultorio';
update news_articles set seo_title = 'Pejotização de médicos: o que o STF decidiu | Grupo DAMA' where slug = 'stf-destrava-pejotizacao-o-que-separa-contrato-pj-legitimo-de-fraude';
update news_articles set seo_title = '494 cursos de medicina e renda médica em queda | Grupo DAMA' where slug = 'recorde-escolas-de-medicina-e-queda-da-renda-medica';
update news_articles set seo_title = 'Teto de 5,11% e lucro de R$ 8,5 bi nos planos | Grupo DAMA' where slug = 'ans-teto-5-11-reajuste-planos-individuais-lucro-8-5-bilhoes-2026';
update news_articles set seo_title = 'Acreditação em saúde digital no consultório | Grupo DAMA' where slug = 'manual-acreditacao-saude-digital-telemedicina-telessaude';
update news_articles set seo_title = 'ANPD apura vazamento de dados de pacientes | Grupo DAMA' where slug = 'anpd-processo-sancionador-dados-saude-clinicas-condenadas-exame-indexado';
update news_articles set seo_title = 'Glosa dobra e hospitais rompem com convênio | Grupo DAMA' where slug = 'glosa-geap-hospitais-rompem-contrato-o-que-o-consultorio-precisa-medir';

-- 2. meta_description <= 155 (corte pelo fim)
update news_articles set meta_description = replace(meta_description, ' e o que ainda não é para o médico.', ' e o que ainda não é.') where slug = 'anvisa-adia-sncr-30-setembro-2026-receituario-controlado';
update news_articles set meta_description = replace(meta_description, 'Como consultar e o que fazer com o dado.', 'Como consultar.') where slug = 'ans-abre-base-d-tiss-valor-medio-honorarios-consultorio';
update news_articles set meta_description = replace(meta_description, 'de quem contrata, se virar lei.', 'de quem contrata.') where slug = 'piso-medicos-13662-segue-para-camara';

-- 3. travessão parentético no conteúdo
update news_articles set content = replace(content, 'E o tema central — desigualdade de acesso — é uma realidade', 'E o tema central, desigualdade de acesso, é uma realidade') where slug like 'cfm-forum-internacional%';