CREATE TABLE logins (
  login_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
