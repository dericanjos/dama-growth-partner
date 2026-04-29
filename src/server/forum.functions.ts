import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const signupSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("Email inválido").max(255).toLowerCase(),
  specialty: z.string().trim().max(100).optional().nullable(),
  crm_number: z.string().trim().max(50).optional().nullable(),
});

const questionSchema = z.object({
  user_id: z.string().uuid(),
  blog_slug: z.string().min(1).max(255),
  question_text: z.string().trim().min(10, "Mínimo 10 caracteres").max(2000),
});

const answerSchema = z.object({
  user_id: z.string().uuid(),
  question_id: z.string().uuid(),
  answer_text: z.string().trim().min(10, "Mínimo 10 caracteres").max(2000),
});

/** Cria ou recupera o usuário do fórum pelo email. */
export const signupForumUser = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signupSchema.parse(data))
  .handler(async ({ data }) => {
    // Tenta achar existente
    const { data: existing } = await supabaseAdmin
      .from("forum_users")
      .select("id, name, email, specialty, crm_number")
      .eq("email", data.email)
      .maybeSingle();

    if (existing) {
      const updates: {
        name?: string;
        specialty?: string | null;
        crm_number?: string | null;
      } = {};
      if (data.name && data.name !== existing.name) updates.name = data.name;
      if (data.specialty && data.specialty !== existing.specialty)
        updates.specialty = data.specialty;
      if (data.crm_number && data.crm_number !== existing.crm_number)
        updates.crm_number = data.crm_number;

      if (Object.keys(updates).length > 0) {
        await supabaseAdmin.from("forum_users").update(updates).eq("id", existing.id);
      }
      return { user: { ...existing, ...updates } };
    }

    const { data: created, error } = await supabaseAdmin
      .from("forum_users")
      .insert({
        name: data.name,
        email: data.email,
        specialty: data.specialty || null,
        crm_number: data.crm_number || null,
      })
      .select("id, name, email, specialty, crm_number")
      .single();

    if (error || !created) {
      throw new Error(error?.message ?? "Falha ao cadastrar usuário");
    }
    return { user: created };
  });

export const createForumQuestion = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => questionSchema.parse(data))
  .handler(async ({ data }) => {
    // Verifica usuário existe
    const { data: user } = await supabaseAdmin
      .from("forum_users")
      .select("id")
      .eq("id", data.user_id)
      .maybeSingle();
    if (!user) throw new Error("Usuário não encontrado. Faça o cadastro novamente.");

    // Rate limit: máx 3 perguntas no mesmo artigo
    const { count: countArticle } = await supabaseAdmin
      .from("forum_questions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", data.user_id)
      .eq("blog_slug", data.blog_slug);
    if ((countArticle ?? 0) >= 3) {
      throw new Error("Você já fez 3 perguntas neste artigo. Aguarde respostas antes de perguntar mais.");
    }

    // Rate limit: máx 5 perguntas nas últimas 24h
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: countDay } = await supabaseAdmin
      .from("forum_questions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", data.user_id)
      .gte("created_at", since);
    if ((countDay ?? 0) >= 5) {
      throw new Error("Limite diário de 5 perguntas atingido. Tente novamente amanhã.");
    }

    const { data: created, error } = await supabaseAdmin
      .from("forum_questions")
      .insert({
        user_id: data.user_id,
        blog_slug: data.blog_slug,
        question_text: data.question_text,
        is_approved: true,
      })
      .select("id")
      .single();

    if (error || !created) throw new Error(error?.message ?? "Falha ao publicar pergunta");
    return { id: created.id };
  });

export const createForumAnswer = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => answerSchema.parse(data))
  .handler(async ({ data }) => {
    const { data: user } = await supabaseAdmin
      .from("forum_users")
      .select("id")
      .eq("id", data.user_id)
      .maybeSingle();
    if (!user) throw new Error("Usuário não encontrado. Faça o cadastro novamente.");

    const { data: question } = await supabaseAdmin
      .from("forum_questions")
      .select("id")
      .eq("id", data.question_id)
      .maybeSingle();
    if (!question) throw new Error("Pergunta não encontrada.");

    // Rate limit: máx 10 respostas em 24h
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("forum_answers")
      .select("id", { count: "exact", head: true })
      .eq("user_id", data.user_id)
      .gte("created_at", since);
    if ((count ?? 0) >= 10) {
      throw new Error("Limite diário de 10 respostas atingido.");
    }

    const { data: created, error } = await supabaseAdmin
      .from("forum_answers")
      .insert({
        user_id: data.user_id,
        question_id: data.question_id,
        answer_text: data.answer_text,
        is_approved: true,
      })
      .select("id")
      .single();

    if (error || !created) throw new Error(error?.message ?? "Falha ao publicar resposta");
    return { id: created.id };
  });
