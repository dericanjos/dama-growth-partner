import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const diagnosticoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(160),
  email: z.string().trim().toLowerCase().email("E-mail inválido").max(255),
  whatsapp: z.string().trim().min(10, "Informe o WhatsApp com DDD").max(25),
  especialidade: z.string().trim().min(2, "Informe a especialidade").max(120),
  cidade: z.string().trim().min(2, "Informe a cidade").max(120),
  uf: z.string().trim().min(2, "Informe a UF").max(2),
  crm: z.string().trim().max(40).optional().nullable(),
  volume_contatos: z.string().trim().max(40).optional().nullable(),
  mensagem: z.string().trim().max(2000).optional().nullable(),
  origem: z.string().trim().max(255).optional().nullable(),
  consentimento: z.literal(true),
});

export const solicitarDiagnostico = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => diagnosticoSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: boolean; message: string }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contatos_diagnostico").insert({
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      especialidade: data.especialidade,
      cidade: data.cidade,
      uf: data.uf.toUpperCase(),
      crm: data.crm?.trim() ? data.crm.trim() : null,
      volume_contatos: data.volume_contatos?.trim() ? data.volume_contatos.trim() : null,
      mensagem: data.mensagem?.trim() ? data.mensagem.trim() : null,
      origem: data.origem ?? "site/contato",
      consentimento_em: new Date().toISOString(),
    });

    if (error) {
      console.error("Erro ao registrar solicitação de diagnóstico:", error);
      return {
        ok: false,
        message: "Não conseguimos registrar agora. Tente novamente ou chame no WhatsApp.",
      };
    }

    return {
      ok: true,
      message:
        "Recebemos. Entramos em contato pelo WhatsApp em até um dia útil. Se preferir adiantar, chame a gente no (21) 95921-4292.",
    };
  });
