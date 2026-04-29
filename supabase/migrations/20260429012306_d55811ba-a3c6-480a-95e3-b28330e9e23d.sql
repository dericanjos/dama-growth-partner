-- forum_users: cadastro leve dos participantes
CREATE TABLE public.forum_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  specialty TEXT,
  crm_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.forum_users ENABLE ROW LEVEL SECURITY;

-- Leitura pública (nome + especialidade aparecem ao lado das perguntas)
CREATE POLICY "Public can read forum users"
  ON public.forum_users FOR SELECT
  USING (true);

-- Inserts/updates só via server function (service role bypassa RLS)
-- Nenhuma policy de INSERT/UPDATE/DELETE para clients anônimos.

-- forum_questions
CREATE TABLE public.forum_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.forum_users(id) ON DELETE CASCADE,
  blog_slug TEXT NOT NULL,
  question_text TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.forum_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved questions"
  ON public.forum_questions FOR SELECT
  USING (is_approved = true);

CREATE INDEX idx_forum_questions_slug ON public.forum_questions(blog_slug);
CREATE INDEX idx_forum_questions_user ON public.forum_questions(user_id);

-- forum_answers
CREATE TABLE public.forum_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.forum_users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.forum_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.forum_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved answers"
  ON public.forum_answers FOR SELECT
  USING (is_approved = true);

CREATE INDEX idx_forum_answers_question ON public.forum_answers(question_id);
CREATE INDEX idx_forum_answers_user ON public.forum_answers(user_id);