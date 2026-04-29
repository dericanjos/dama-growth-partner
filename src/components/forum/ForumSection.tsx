import { useEffect, useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SignupModal } from "./SignupModal";
import {
  loadForumUser,
  type ForumLocalUser,
} from "@/lib/forumStorage";
import {
  createForumQuestion,
  createForumAnswer,
} from "@/server/forum.functions";

export interface ForumQuestionWithAnswers {
  id: string;
  blog_slug: string;
  question_text: string;
  created_at: string;
  user: {
    name: string;
    specialty: string | null;
  } | null;
  answers: {
    id: string;
    answer_text: string;
    created_at: string;
    user: {
      name: string;
      specialty: string | null;
    } | null;
  }[];
}

interface Props {
  blogSlug: string;
  initialQuestions: ForumQuestionWithAnswers[];
}

function formatDateBR(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function authorLine(
  user: { name: string; specialty: string | null } | null,
  date: string,
) {
  const parts: string[] = [];
  if (user?.name) parts.push(user.name);
  if (user?.specialty) parts.push(user.specialty);
  parts.push(formatDateBR(date));
  return parts.join(" · ");
}

export function ForumSection({ blogSlug, initialQuestions }: Props) {
  const submitQuestion = useServerFn(createForumQuestion);
  const submitAnswer = useServerFn(createForumAnswer);

  const [questions, setQuestions] =
    useState<ForumQuestionWithAnswers[]>(initialQuestions);
  const [user, setUser] = useState<ForumLocalUser | null>(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
  const [showAll, setShowAll] = useState(false);

  // Form pergunta
  const [questionText, setQuestionText] = useState("");
  const [submittingQ, setSubmittingQ] = useState(false);

  // Form resposta (qual pergunta está aberta)
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [submittingA, setSubmittingA] = useState(false);

  useEffect(() => {
    setUser(loadForumUser());
  }, []);

  const ensureUser = (action: (u: ForumLocalUser) => void) => {
    if (user) {
      action(user);
      return;
    }
    setPendingAction(() => () => action(loadForumUser()!));
    setSignupOpen(true);
  };

  const handleSignupSuccess = (newUser: ForumLocalUser) => {
    setUser(newUser);
    if (pendingAction) {
      const fn = pendingAction;
      setPendingAction(null);
      // pequeno delay pra modal fechar
      setTimeout(() => fn(), 50);
    }
  };

  const doSubmitQuestion = async (u: ForumLocalUser) => {
    const text = questionText.trim();
    if (text.length < 10) {
      toast.error("A pergunta precisa ter ao menos 10 caracteres.");
      return;
    }
    if (text.length > 2000) {
      toast.error("A pergunta pode ter no máximo 2.000 caracteres.");
      return;
    }
    setSubmittingQ(true);
    try {
      const res = await submitQuestion({
        data: { user_id: u.id, blog_slug: blogSlug, question_text: text },
      });
      const newQ: ForumQuestionWithAnswers = {
        id: res.id,
        blog_slug: blogSlug,
        question_text: text,
        created_at: new Date().toISOString(),
        user: { name: u.name, specialty: u.specialty ?? null },
        answers: [],
      };
      setQuestions((prev) => [newQ, ...prev]);
      setQuestionText("");
      toast.success("Sua pergunta foi enviada!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar pergunta");
    } finally {
      setSubmittingQ(false);
    }
  };

  const doSubmitAnswer = async (u: ForumLocalUser, questionId: string) => {
    const text = answerText.trim();
    if (text.length < 10) {
      toast.error("A resposta precisa ter ao menos 10 caracteres.");
      return;
    }
    if (text.length > 2000) {
      toast.error("A resposta pode ter no máximo 2.000 caracteres.");
      return;
    }
    setSubmittingA(true);
    try {
      const res = await submitAnswer({
        data: { user_id: u.id, question_id: questionId, answer_text: text },
      });
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                answers: [
                  ...q.answers,
                  {
                    id: res.id,
                    answer_text: text,
                    created_at: new Date().toISOString(),
                    user: { name: u.name, specialty: u.specialty ?? null },
                  },
                ],
              }
            : q,
        ),
      );
      setAnswerText("");
      setAnsweringId(null);
      toast.success("Sua resposta foi enviada!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar resposta");
    } finally {
      setSubmittingA(false);
    }
  };

  const onQuestionSubmit = (e: FormEvent) => {
    e.preventDefault();
    ensureUser((u) => doSubmitQuestion(u));
  };

  const onAnswerSubmit = (e: FormEvent, questionId: string) => {
    e.preventDefault();
    ensureUser((u) => doSubmitAnswer(u, questionId));
  };

  const visible = showAll ? questions : questions.slice(0, 10);

  return (
    <section
      className="mt-14 rounded-[14px] border p-6 md:p-8"
      style={{
        background: "color-mix(in oklab, var(--navy) 4%, var(--cream))",
        borderColor: "var(--border)",
      }}
    >
      <header className="mb-6">
        <h2 className="flex items-center gap-2 font-serif text-[22px] font-semibold text-[var(--navy)] md:text-[26px]">
          <MessageCircle className="h-6 w-6 text-[var(--gold-deep)]" />
          Perguntas sobre este artigo
        </h2>
        <p className="mt-1 text-[14px] text-[var(--navy)]/70">
          Tem dúvida? Pergunta aqui que a comunidade responde.
        </p>
      </header>

      <form onSubmit={onQuestionSubmit} className="mb-8 space-y-3">
        <Textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Escreva sua pergunta sobre este artigo..."
          rows={3}
          maxLength={2000}
          className="min-h-[80px] bg-white"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-[var(--navy)]/60">
            {questionText.length}/2000
          </span>
          <button
            type="submit"
            disabled={submittingQ}
            className="btn-gold disabled:opacity-50"
          >
            {submittingQ ? "Enviando..." : "Enviar pergunta"}
          </button>
        </div>
      </form>

      <div className="mb-4 text-[13px] uppercase tracking-[0.14em] text-[var(--navy)]/60">
        {questions.length === 0
          ? "Nenhuma pergunta ainda"
          : `${questions.length} ${questions.length === 1 ? "pergunta" : "perguntas"} neste artigo`}
      </div>

      {questions.length === 0 ? (
        <div className="rounded-[10px] border border-dashed border-[var(--border)] bg-white/50 p-6 text-center text-[14px] text-[var(--navy)]/70">
          Nenhuma pergunta ainda. Seja o primeiro a perguntar!
        </div>
      ) : (
        <ul className="space-y-6">
          {visible.map((q) => (
            <li
              key={q.id}
              className="rounded-[10px] border border-[var(--border)] bg-white p-5"
            >
              <p className="text-[15px] leading-[1.6] text-[var(--navy)]">
                <strong className="font-semibold">P:</strong> {q.question_text}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[var(--navy)]/55">
                — {authorLine(q.user, q.created_at)}
              </p>

              {q.answers.length > 0 && (
                <ul className="mt-4 space-y-3 border-l-2 border-[var(--gold)]/40 pl-5">
                  {q.answers.map((a) => (
                    <li key={a.id}>
                      <p className="text-[14.5px] leading-[1.6] text-[var(--navy)]/90">
                        <strong className="font-semibold text-[var(--gold-deep)]">
                          R:
                        </strong>{" "}
                        {a.answer_text}
                      </p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-[var(--navy)]/55">
                        — {authorLine(a.user, a.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {q.answers.length === 0 && (
                <p className="mt-3 text-[13px] italic text-[var(--navy)]/60">
                  Sem respostas ainda. Seja o primeiro a responder.
                </p>
              )}

              {answeringId === q.id ? (
                <form
                  onSubmit={(e) => onAnswerSubmit(e, q.id)}
                  className="mt-4 space-y-2"
                >
                  <Textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Escreva sua resposta..."
                    rows={3}
                    maxLength={2000}
                    autoFocus
                    className="min-h-[70px]"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--navy)]/60">
                      {answerText.length}/2000
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAnsweringId(null);
                          setAnswerText("");
                        }}
                        className="text-sm text-[var(--navy)]/70 underline-offset-2 hover:underline"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={submittingA}
                        className="btn-gold !py-2 !text-sm disabled:opacity-50"
                      >
                        {submittingA ? "Enviando..." : "Enviar resposta"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAnsweringId(q.id);
                    setAnswerText("");
                  }}
                  className="mt-3 text-sm font-medium text-[var(--gold-deep)] hover:underline"
                >
                  Responder esta pergunta
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {questions.length > 10 && !showAll && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-sm font-medium text-[var(--navy)] underline underline-offset-4 hover:text-[var(--gold-deep)]"
          >
            Ver mais perguntas ({questions.length - 10} restantes)
          </button>
        </div>
      )}

      <SignupModal
        open={signupOpen}
        onOpenChange={(o) => {
          setSignupOpen(o);
          if (!o) setPendingAction(null);
        }}
        onSuccess={handleSignupSuccess}
      />
    </section>
  );
}
