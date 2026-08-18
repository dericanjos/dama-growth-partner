CREATE TABLE public.contatos_diagnostico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  especialidade text NOT NULL,
  cidade text NOT NULL,
  uf text NOT NULL,
  crm text,
  volume_contatos text,
  mensagem text,
  origem text,
  consentimento_em timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contatos_diagnostico TO anon, authenticated;
GRANT SELECT ON public.contatos_diagnostico TO authenticated;
GRANT ALL ON public.contatos_diagnostico TO service_role;

ALTER TABLE public.contatos_diagnostico ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer visitante pode solicitar diagnostico"
  ON public.contatos_diagnostico FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Solicitacoes visiveis apenas para autenticados"
  ON public.contatos_diagnostico FOR SELECT TO authenticated USING (true);