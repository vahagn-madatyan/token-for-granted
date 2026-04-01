-- Add image_url column for AI-generated product images (Workers AI Flux-1-Schnell)
ALTER TABLE valuations ADD COLUMN image_url TEXT;
