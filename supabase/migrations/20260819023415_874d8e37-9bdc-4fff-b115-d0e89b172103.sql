ALTER TABLE public.contatos_diagnostico RENAME TO contatos;

ALTER TABLE public.contatos ADD COLUMN IF NOT EXISTS assunto text;

UPDATE public.contatos SET assunto = COALESCE(assunto, 'Outro');

ALTER TABLE public.contatos ALTER COLUMN assunto SET NOT NULL;

ALTER TABLE public.contatos ALTER COLUMN mensagem SET DEFAULT '';
UPDATE public.contatos SET mensagem = COALESCE(mensagem, '');
ALTER TABLE public.contatos ALTER COLUMN mensagem SET NOT NULL;

ALTER TABLE public.contatos
  DROP COLUMN IF EXISTS whatsapp,
  DROP COLUMN IF EXISTS especialidade,
  DROP COLUMN IF EXISTS cidade,
  DROP COLUMN IF EXISTS uf,
  DROP COLUMN IF EXISTS crm,
  DROP COLUMN IF EXISTS volume_contatos;

GRANT SELECT ON public.contatos TO authenticated;
GRANT INSERT ON public.contatos TO anon, authenticated;
GRANT ALL ON public.contatos TO service_role;