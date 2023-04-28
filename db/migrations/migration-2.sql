CREATE TABLE clients (
  client_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (user_id),
  accountant_id INTEGER REFERENCES accountants (accountant_id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
