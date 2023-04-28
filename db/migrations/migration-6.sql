CREATE TABLE documents (
  document_id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients (client_id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  path TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
