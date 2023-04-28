const { Pool } = require('pg');
const pool = new Pool();

function createClient(id, name, email, phone, accountantId) {
  return {
    id,
    name,
    email,
    phone,
    accountantId,
  };
}

async function getAllClients() {
  const query = 'SELECT * FROM clients';
  const { rows } = await pool.query(query);
  return rows.map(row => createClient(row.id, row.name, row.email, row.phone, row.accountant_id));
}

async function getClientById(id) {
  const query = 'SELECT * FROM clients WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createClient(row.id, row.name, row.email, row.phone, row.accountant_id);
  } else {
    return null;
  }
}

async function createClientRecord(name, email, phone, accountantId) {
  const query = 'INSERT INTO clients (name, email, phone, accountant_id) VALUES ($1, $2, $3, $4) RETURNING id';
  const { rows } = await pool.query(query, [name, email, phone, accountantId]);
  const id = rows[0].id;
  return createClient(id, name, email, phone, accountantId);
}

async function updateClientRecord(id, name, email, phone, accountantId) {
  const query = 'UPDATE clients SET name = $2, email = $3, phone = $4, accountant_id = $5 WHERE id = $1';
  await pool.query(query, [id, name, email, phone, accountantId]);
  return createClient(id, name, email, phone, accountantId);
}

async function deleteClientRecord(id) {
  const query = 'DELETE FROM clients WHERE id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllClients,
  getClientById,
  createClientRecord,
  updateClientRecord,
  deleteClientRecord,
};
