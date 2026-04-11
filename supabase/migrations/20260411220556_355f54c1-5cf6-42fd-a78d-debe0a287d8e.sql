
-- Create notification_logs table
CREATE TABLE public.notification_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.group_campaigns(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.group_orders(id) ON DELETE SET NULL,
  notification_type TEXT NOT NULL DEFAULT 'custom',
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  sent_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view notification logs
CREATE POLICY "Admins can view notification logs"
ON public.notification_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can create notification logs
CREATE POLICY "Admins can create notification logs"
ON public.notification_logs
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Index for quick lookups
CREATE INDEX idx_notification_logs_campaign ON public.notification_logs(campaign_id);
CREATE INDEX idx_notification_logs_order ON public.notification_logs(order_id);
CREATE INDEX idx_notification_logs_type ON public.notification_logs(notification_type);
