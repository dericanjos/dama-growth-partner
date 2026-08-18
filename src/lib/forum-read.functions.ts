import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { ForumQuestionWithAnswers } from "@/components/forum/ForumSection";

export const getForumQuestionsForSlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ slug: z.string().min(1).max(255) }).parse(data),
  )
  .handler(async ({ data }): Promise<{ questions: ForumQuestionWithAnswers[] }> => {
    const { data: questions, error } = await supabaseAdmin
      .from("forum_questions")
      .select(
        `id, blog_slug, question_text, created_at,
         user:forum_users!forum_questions_user_id_fkey(name, specialty),
         answers:forum_answers(
           id, answer_text, created_at,
           user:forum_users!forum_answers_user_id_fkey(name, specialty)
         )`,
      )
      .eq("blog_slug", data.slug)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Erro ao buscar perguntas:", error);
      return { questions: [] };
    }

    // ordena respostas (asc)
    const normalized: ForumQuestionWithAnswers[] = (questions ?? []).map((q) => ({
      id: q.id,
      blog_slug: q.blog_slug,
      question_text: q.question_text,
      created_at: q.created_at,
      user: q.user as { name: string; specialty: string | null } | null,
      answers: (q.answers ?? [])
        .filter((a) => (a as { is_approved?: boolean }).is_approved !== false)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
        .map((a) => ({
          id: a.id,
          answer_text: a.answer_text,
          created_at: a.created_at,
          user: a.user as { name: string; specialty: string | null } | null,
        })),
    }));

    return { questions: normalized };
  });
