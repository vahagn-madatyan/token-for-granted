-- Asset valuations
CREATE TABLE valuations (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  current_value REAL,
  projected_value REAL,
  confidence REAL,
  growth_rate REAL,
  tier TEXT CHECK(tier IN ('S','A','B','C')),
  density_score REAL,
  auth_status TEXT DEFAULT 'PENDING',
  asset_code TEXT,
  asset_name TEXT,
  art_edition TEXT,
  analysis TEXT,
  multiplier_categories TEXT,
  ai_raw_response TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- What-if scenario runs
CREATE TABLE scenario_runs (
  id TEXT PRIMARY KEY,
  scenario_id TEXT NOT NULL,
  intensity TEXT NOT NULL,
  result_text TEXT,
  tokens_used INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Terminal logs
CREATE TABLE terminal_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  level TEXT DEFAULT 'INFO',
  source TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata TEXT
);

-- System metrics snapshots
CREATE TABLE system_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  compute_tflops REAL,
  token_liquidity REAL,
  asset_performance REAL,
  latency_ms REAL,
  recorded_at TEXT DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX idx_valuations_tier ON valuations(tier);
CREATE INDEX idx_valuations_created ON valuations(created_at);
CREATE INDEX idx_terminal_logs_timestamp ON terminal_logs(timestamp);
CREATE INDEX idx_scenario_runs_scenario ON scenario_runs(scenario_id);
