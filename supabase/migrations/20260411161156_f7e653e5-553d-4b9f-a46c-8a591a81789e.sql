-- Add internal target with drop-off buffer (admin-only field)
ALTER TABLE public.group_campaigns 
ADD COLUMN internal_target_slots integer;

-- Set default to match existing target_slots for existing campaigns
UPDATE public.group_campaigns 
SET internal_target_slots = target_slots 
WHERE internal_target_slots IS NULL;