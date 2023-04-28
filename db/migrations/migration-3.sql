CREATE TABLE accountants (
  accountant_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (user_id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  work_experience TEXT
);
