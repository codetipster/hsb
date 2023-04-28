CREATE TABLE chats (
  chat_id SERIAL PRIMARY KEY,
  accountant_id INTEGER REFERENCES accountants (accountant_id),
  client_id INTEGER REFERENCES clients (client_id),
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
