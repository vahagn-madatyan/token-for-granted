-- Token For Granted pivot: add token analysis fields
ALTER TABLE valuations ADD COLUMN item_name TEXT;
ALTER TABLE valuations ADD COLUMN item_price REAL;
ALTER TABLE valuations ADD COLUMN price_confidence REAL;
ALTER TABLE valuations ADD COLUMN token_conversions TEXT;
ALTER TABLE valuations ADD COLUMN what_you_could_do TEXT;

-- Index for leaderboard sorting by price
CREATE INDEX idx_valuations_item_price ON valuations(item_price);
