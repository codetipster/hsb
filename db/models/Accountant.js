const { Pool } = require('pg');
const pool = new Pool();

function createAccountant(id, userId, createdAt, updatedAt, workExperience) {
  return {
    id,
    userId,
    createdAt,
    updatedAt,
    workExperience,
  };
}

async function getAllAccountants() {
  const query = 'SELECT * FROM accountants';
  const { rows } = await pool.query(query);
  return rows.map(row => createAccountant(row.accountant_id, row.user_id, row.created_at, row.updated_at, row.work_experience));
}

async function getAccountantById(id) {
  const query = 'SELECT * FROM accountants WHERE accountant_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createAccountant(row.accountant_id, row.user_id, row.created_at, row.updated_at, row.work_experience);
  } else {
    return null;
  }
}

async function createAccountantRecord(userId, workExperience) {
  const query = 'INSERT INTO accountants (user_id, work_experience) VALUES ($1, $2) RETURNING accountant_id, created_at, updated_at';
  const values = [userId, workExperience];
  const { rows } = await pool.query(query, values);
  const { accountant_id, created_at, updated_at } = rows[0];
  return createAccountant(accountant_id, userId, created_at, updated_at, workExperience);
}

async function updateAccountantRecord(id, userId, workExperience) {
  const query = 'UPDATE accountants SET user_id = $2, work_experience = $3, updated_at = NOW() WHERE accountant_id = $1';
  const values = [id, userId, workExperience];
  await pool.query(query, values);
  return getAccountantById(id);
}

async function deleteAccountantRecord(id) {
  const query = 'DELETE FROM accountants WHERE accountant_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllAccountants,
  getAccountantById,
  createAccountantRecord,
  updateAccountantRecord,
  deleteAccountantRecord,
};
