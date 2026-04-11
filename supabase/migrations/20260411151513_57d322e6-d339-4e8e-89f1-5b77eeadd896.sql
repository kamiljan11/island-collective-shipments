-- Create group_campaigns table
CREATE TABLE public.group_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  deposit_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'ISK',
  target_slots INTEGER NOT NULL DEFAULT 50,
  current_slots INTEGER NOT NULL DEFAULT 0,
  unit_price_estimate NUMERIC(10,2),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'funded', 'completed', 'cancelled')),
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.group_campaigns ENABLE ROW LEVEL SECURITY;

-- Everyone can view active campaigns
CREATE POLICY "Anyone can view active campaigns"
  ON public.group_campaigns FOR SELECT
  USING (status = 'active' OR status = 'funded');

-- Authenticated users can manage campaigns (admin)
CREATE POLICY "Authenticated users can manage campaigns"
  ON public.group_campaigns FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create group_orders table
CREATE TABLE public.group_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.group_campaigns(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  kennitala TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  contact_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  deposit_paid BOOLEAN NOT NULL DEFAULT false,
  deposit_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_reference TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'deposit_paid', 'confirmed', 'cancelled', 'refunded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.group_orders ENABLE ROW LEVEL SECURITY;

-- Anyone can create an order (public signup)
CREATE POLICY "Anyone can create group orders"
  ON public.group_orders FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view all orders (admin)
CREATE POLICY "Authenticated can view all orders"
  ON public.group_orders FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update orders (admin)
CREATE POLICY "Authenticated can update orders"
  ON public.group_orders FOR UPDATE
  TO authenticated
  USING (true);

-- Create quote_requests table
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL DEFAULT 'links' CHECK (form_type IN ('links', 'sourcing')),
  priority TEXT NOT NULL DEFAULT 'standard' CHECK (priority IN ('standard', 'urgent')),
  content TEXT NOT NULL,
  estimated_value TEXT,
  weight_info TEXT,
  company_name TEXT NOT NULL,
  kennitala TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'quoted', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a quote request
CREATE POLICY "Anyone can submit quote requests"
  ON public.quote_requests FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view and manage quote requests
CREATE POLICY "Authenticated can view quote requests"
  ON public.quote_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update quote requests"
  ON public.quote_requests FOR UPDATE
  TO authenticated
  USING (true);

-- Function to increment campaign slots
CREATE OR REPLACE FUNCTION public.increment_campaign_slots(campaign_id UUID, amount INTEGER DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.group_campaigns
  SET current_slots = current_slots + amount,
      updated_at = now()
  WHERE id = campaign_id;
END;
$$;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_group_campaigns_updated_at
  BEFORE UPDATE ON public.group_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_group_orders_updated_at
  BEFORE UPDATE ON public.group_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();