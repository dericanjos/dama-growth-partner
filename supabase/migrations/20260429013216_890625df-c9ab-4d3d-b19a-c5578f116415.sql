CREATE TABLE public.news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT,
  category TEXT NOT NULL DEFAULT 'Geral',
  author TEXT NOT NULL DEFAULT 'Deric Anjos',
  cover_image TEXT,
  cover_image_alt TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Leitura pública apenas para publicadas
CREATE POLICY "Public can read published news"
  ON public.news_articles FOR SELECT
  USING (is_published = true);

-- Sem policies de INSERT/UPDATE/DELETE: só service role (Studio + server functions) escreve.

CREATE INDEX idx_news_articles_slug ON public.news_articles(slug);
CREATE INDEX idx_news_articles_published_at ON public.news_articles(published_at DESC);
CREATE INDEX idx_news_articles_category ON public.news_articles(category);
CREATE INDEX idx_news_articles_published_filter ON public.news_articles(is_published, published_at DESC);