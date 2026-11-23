CREATE TABLE public.landing_path_content (
 profile text PRIMARY KEY,
 content jsonb NOT NULL,
 revision integer NOT NULL DEFAULT 1,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.landing_path_content TO anon, authenticated;
GRANT ALL ON public.landing_path_content TO service_role;
ALTER TABLE public.landing_path_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public published landing content" ON public.landing_path_content FOR SELECT TO anon, authenticated USING (true);