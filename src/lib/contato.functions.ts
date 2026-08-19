import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const ASSUNTOS = [
  "Sou médico e quero conhecer a operação",
  "Sou secretária ou profissional de atendimento",
  "Imprensa",
  "Parceria ou fornecedor",
  "Trabalhe conosco",
  "Outro",
] as const;

const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(160),
  email: z.string().trim().toLowerCase().email("E-mail inválido").max(255),
  assunto: z.enum(ASSUNTOS),
  mensagem: z.string().trim().min(5, "Escreva sua mensagem").max(2000),
  origem: z.string().trim().max(255).optional().nullable(),
  consentimento: z.literal(true),
});

export const enviarContato = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contatoSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: boolean; message: string }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contatos").insert({
      nome: data.nome,
      email: data.email,
      assunto: data.assunto,
      mensagem: data.mensagem,
      origem: data.origem ?? "site/contato",
      consentimento_em: new Date().toISOString(),
    });

    if (error) {
      console.error("Erro ao registrar contato:", error);
      return {
        ok: false,
        message: "Não conseguimos registrar agora. Tente novamente ou chame no WhatsApp.",
      };
    }

    return {
      ok: true,
      message: "Recebemos sua mensagem. Respondemos em até um dia útil.",
    };
  });
