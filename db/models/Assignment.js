const { Pool } = require('pg');
const pool = new Pool();

function createAssignment(id, clientId, accountantId, isActive, assignedAt) {
  return {
    id,
    clientId,
    accountantId,
    isActive,
    assignedAt,
  };
}

async function getAllAssignments() {
  const query = 'SELECT * FROM assignments';
  const { rows } = await pool.query(query);
  return rows.map(row => createAssignment(row.assignment_id, row.client_id, row.accountant_id, row.is_active, row.assigned_at));
}

async function getAssignmentById(id) {
  const query = 'SELECT * FROM assignments WHERE assignment_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createAssignment(row.assignment_id, row.client_id, row.accountant_id, row.is_active, row.assigned_at);
  } else {
    return null;
  }
}

async function createAssignmentRecord(clientId, accountantId, isActive, assignedAt) {
  const query = 'INSERT INTO assignments (client_id, accountant_id, is_active, assigned_at) VALUES ($1, $2, $3, $4) RETURNING assignment_id';
  const values = [clientId, accountantId, isActive, assignedAt];
  const { rows } = await pool.query(query, values);
  const { assignment_id } = rows[0];
  return createAssignment(assignment_id, clientId, accountantId, isActive, assignedAt);
}

async function updateAssignmentRecord(id, isActive) {
  const query = 'UPDATE assignments SET is_active = $2 WHERE assignment_id = $1';
  const values = [id, isActive];
  await pool.query(query, values);
  return getAssignmentById(id);
}

async function deleteAssignmentRecord(id) {
  const query = 'DELETE FROM assignments WHERE assignment_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignmentRecord,
  updateAssignmentRecord,
  deleteAssignmentRecord,
};
