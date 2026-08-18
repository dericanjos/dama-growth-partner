import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subscribeSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().toLowerCase().email("E-mail inválido").max(255),
  especialidade: z.string().trim().max(120).optional().nullable(),
  origem: z.string().trim().max(255).optional().nullable(),
  consentimento: z.literal(true),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => subscribeSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: boolean; message: string }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("newsletter_subscribers").insert({
      nome: data.nome,
      email: data.email,
      especialidade: data.especialidade?.trim() ? data.especialidade.trim() : null,
      origem: data.origem ?? null,
      consentimento_em: new Date().toISOString(),
    });

    // Duplicidade não é erro visível ao usuário: o e-mail já está na lista.
    if (error && error.code !== "23505") {
      console.error("Erro ao registrar assinatura de newsletter:", error);
      return { ok: false, message: "Não conseguimos registrar agora. Tente novamente." };
    }

    return { ok: true, message: "Inscrição confirmada. Você receberá a próxima análise no seu e-mail." };
  });
