PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK(length(email) <= 254),
  message TEXT NOT NULL CHECK(length(message) BETWEEN 10 AND 5000),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
