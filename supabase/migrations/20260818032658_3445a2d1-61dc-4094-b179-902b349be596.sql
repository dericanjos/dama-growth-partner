ALTER TABLE public.news_articles
  ADD COLUMN IF NOT EXISTS update_date date,
  ADD COLUMN IF NOT EXISTS update_text text,
  ADD COLUMN IF NOT EXISTS update_link_slug text,
  ADD COLUMN IF NOT EXISTS update_link_label text;