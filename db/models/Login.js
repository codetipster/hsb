const { Pool } = require('pg');
const pool = new Pool();

function createLogin(id, email, password, createdAt, updatedAt, userId) {
  return {
    id,
    email,
    password,
    createdAt,
    updatedAt,
    userId,
  };
}

async function getAllLogins() {
  const query = 'SELECT * FROM logins';
  const { rows } = await pool.query(query);
  return rows.map(row => createLogin(row.login_id, row.email, row.password, row.created_at, row.updated_at, row.user_id));
}

async function getLoginById(id) {
  const query = 'SELECT * FROM logins WHERE login_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createLogin(row.login_id, row.email, row.password, row.created_at, row.updated_at, row.user_id);
  } else {
    return null;
  }
}

async function createLoginRecord(email, password, userId) {
  const query = 'INSERT INTO logins (email, password, user_id) VALUES ($1, $2, $3) RETURNING login_id, created_at, updated_at';
  const values = [email, password, userId];
  const { rows } = await pool.query(query, values);
  const { login_id, created_at, updated_at } = rows[0];
  return createLogin(login_id, email, password, created_at, updated_at, userId);
}

async function updateLoginRecord(id, email, password, userId) {
  const query = 'UPDATE logins SET email = $2, password = $3, user_id = $4, updated_at = NOW() WHERE login_id = $1';
  const values = [id, email, password, userId];
  await pool.query(query, values);
  return getLoginById(id);
}

async function deleteLoginRecord(id) {
  const query = 'DELETE FROM logins WHERE login_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllLogins,
  getLoginById,
  createLoginRecord,
  updateLoginRecord,
  deleteLoginRecord,
};
