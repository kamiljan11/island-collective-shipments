
-- Product ideas table
CREATE TABLE public.product_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  email TEXT,
  votes INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ideas" ON public.product_ideas
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can submit ideas" ON public.product_ideas
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can update ideas" ON public.product_ideas
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete ideas" ON public.product_ideas
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Votes tracking table (prevent duplicate votes)
CREATE TABLE public.product_idea_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID NOT NULL REFERENCES public.product_ideas(id) ON DELETE CASCADE,
  voter_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(idea_id, voter_hash)
);

ALTER TABLE public.product_idea_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view votes" ON public.product_idea_votes
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can vote" ON public.product_idea_votes
  FOR INSERT TO public WITH CHECK (true);

-- Function to increment vote count
CREATE OR REPLACE FUNCTION public.increment_idea_votes(idea_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.product_ideas
  SET votes = votes + 1, updated_at = now()
  WHERE id = idea_id;
END;
$$;

-- Trigger for updated_at
CREATE TRIGGER update_product_ideas_updated_at
  BEFORE UPDATE ON public.product_ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
