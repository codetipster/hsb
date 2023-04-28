const { Pool } = require('pg');
const pool = new Pool();

function createDocument(id, clientId, accountantId, title, description, createdAt, filePath, updatedAt) {
  return {
    id,
    clientId,
    accountantId,
    title,
    description,
    createdAt,
    filePath,
    updatedAt,
  };
}

async function getAllDocuments() {
  const query = 'SELECT * FROM documents';
  const { rows } = await pool.query(query);
  return rows.map(row => createDocument(row.document_id, row.client_id, row.accountant_id, row.title, row.description, row.created_at, row.file_path, row.updated_at));
}

async function getDocumentById(id) {
  const query = 'SELECT * FROM documents WHERE document_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createDocument(row.document_id, row.client_id, row.accountant_id, row.title, row.description, row.created_at, row.file_path, row.updated_at);
  } else {
    return null;
  }
}

async function createDocumentRecord(clientId, accountantId, title, description, filePath) {
  const query = 'INSERT INTO documents (client_id, accountant_id, title, description, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING document_id, created_at, updated_at';
  const values = [clientId, accountantId, title, description, filePath];
  const { rows } = await pool.query(query, values);
  const { document_id, created_at, updated_at } = rows[0];
  return createDocument(document_id, clientId, accountantId, title, description, created_at, filePath, updated_at);
}

async function updateDocumentRecord(id, clientId, accountantId, title, description, filePath) {
  const query = 'UPDATE documents SET client_id = $2, accountant_id = $3, title = $4, description = $5, file_path = $6, updated_at = NOW() WHERE document_id = $1';
  const values = [id, clientId, accountantId, title, description, filePath];
  await pool.query(query, values);
  return getDocumentById(id);
}

async function deleteDocumentRecord(id) {
  const query = 'DELETE FROM documents WHERE document_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocumentRecord,
  updateDocumentRecord,
  deleteDocumentRecord,
};
