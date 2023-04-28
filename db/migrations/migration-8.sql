CREATE TABLE accountant_actions (
  action_id SERIAL PRIMARY KEY,
  accountant_id INTEGER NOT NULL REFERENCES accountants (accountant_id),
  client_id INTEGER NOT NULL REFERENCES clients (client_id),
  action_type TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
