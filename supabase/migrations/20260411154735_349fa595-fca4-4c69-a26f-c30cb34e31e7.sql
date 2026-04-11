-- Allow admins to delete campaigns
CREATE POLICY "Admins can delete campaigns"
ON public.group_campaigns
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete orders
CREATE POLICY "Admins can delete orders"
ON public.group_orders
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));