const { Pool } = require('pg');
const pool = new Pool();

function createChat(id, senderId, recipientId, message, createdAt) {
  return {
    id,
    senderId,
    recipientId,
    message,
    createdAt,
  };
}

async function getAllChats() {
  const query = 'SELECT * FROM chats';
  const { rows } = await pool.query(query);
  return rows.map(row => createChat(row.chat_id, row.sender_id, row.recipient_id, row.message, row.created_at));
}

async function getChatById(id) {
  const query = 'SELECT * FROM chats WHERE chat_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createChat(row.chat_id, row.sender_id, row.recipient_id, row.message, row.created_at);
  } else {
    return null;
  }
}

async function createChatRecord(senderId, recipientId, message) {
  const query = 'INSERT INTO chats (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING chat_id, created_at';
  const values = [senderId, recipientId, message];
  const { rows } = await pool.query(query, values);
  const { chat_id, created_at } = rows[0];
  return createChat(chat_id, senderId, recipientId, message, created_at);
}

async function deleteChatRecord(id) {
  const query = 'DELETE FROM chats WHERE chat_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllChats,
  getChatById,
  createChatRecord,
  deleteChatRecord,
};
