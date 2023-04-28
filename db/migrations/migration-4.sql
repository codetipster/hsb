CREATE TABLE assignments (
  assignment_id SERIAL PRIMARY KEY,
  accountant_id INTEGER REFERENCES accountants (accountant_id),
  client_id INTEGER REFERENCES clients (client_id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
