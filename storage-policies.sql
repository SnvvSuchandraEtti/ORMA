-- ================================================================
-- ORMA — Storage Bucket Policies (Run in Supabase SQL Editor)
-- ================================================================

-- 1. Create the bucket (Skip this if you already created it via UI)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public Read Access
-- Anyone can view the images
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-images');

-- 4. Policy: Authenticated Upload Access
-- Only logged-in users can upload images
CREATE POLICY "Auth Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'listing-images');

-- 5. Policy: Owner Update Access
-- Users can only update their own images
CREATE POLICY "Owner Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'listing-images' AND auth.uid() = owner);

-- 6. Policy: Owner Delete Access
-- Users can only delete their own images
CREATE POLICY "Owner Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'listing-images' AND auth.uid() = owner);
