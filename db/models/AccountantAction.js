const { Pool } = require('pg');
const pool = new Pool();

function createAccountantAction(id, accountantId, clientId, actionType, reason, createdAt) {
  return {
    id,
    accountantId,
    clientId,
    actionType,
    reason,
    createdAt,
  };
}

async function getAllAccountantActions() {
  const query = 'SELECT * FROM accountant_actions';
  const { rows } = await pool.query(query);
  return rows.map(row => createAccountantAction(row.action_id, row.accountant_id, row.client_id, row.action_type, row.reason, row.created_at));
}

async function getAccountantActionById(id) {
  const query = 'SELECT * FROM accountant_actions WHERE action_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createAccountantAction(row.action_id, row.accountant_id, row.client_id, row.action_type, row.reason, row.created_at);
  } else {
    return null;
  }
}

async function createAccountantActionRecord(accountantId, clientId, actionType, reason) {
  const query = 'INSERT INTO accountant_actions (accountant_id, client_id, action_type, reason) VALUES ($1, $2, $3, $4) RETURNING action_id, created_at';
  const values = [accountantId, clientId, actionType, reason];
  const { rows } = await pool.query(query, values);
  const { action_id, created_at } = rows[0];
  return createAccountantAction(action_id, accountantId, clientId, actionType, reason, created_at);
}

async function deleteAccountantActionRecord(id) {
  const query = 'DELETE FROM accountant_actions WHERE action_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllAccountantActions,
  getAccountantActionById,
  createAccountantActionRecord,
  deleteAccountantActionRecord,
};
