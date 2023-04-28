const { Pool } = require('pg');
const pool = new Pool();

function createUser(id, firstName, lastName, phoneNumber, email, password, role, mobileNumber, houseNumber, zipCode, city, createdAt, updatedAt) {
  return {
    id,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    role,
    mobileNumber,
    houseNumber,
    zipCode,
    city,
    createdAt,
    updatedAt,
  };
}

async function getAllUsers() {
  const query = 'SELECT * FROM users';
  const { rows } = await pool.query(query);
  return rows.map(row => createUser(row.user_id, row.first_name, row.last_name, row.phone_number, row.email, row.password, row.role, row.mobile_number, row.house_number, row.zip_code, row.city, row.created_at, row.updated_at));
}

async function getUserById(id) {
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length) {
    const row = rows[0];
    return createUser(row.user_id, row.first_name, row.last_name, row.phone_number, row.email, row.password, row.role, row.mobile_number, row.house_number, row.zip_code, row.city, row.created_at, row.updated_at);
  } else {
    return null;
  }
}

async function createUserRecord(firstName, lastName, phoneNumber, email, password, role, mobileNumber, houseNumber, zipCode, city) {
  const query = 'INSERT INTO users (first_name, last_name, phone_number, email, password, role, mobile_number, house_number, zip_code, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING user_id, created_at, updated_at';
  const values = [firstName, lastName, phoneNumber, email, password, role, mobileNumber, houseNumber, zipCode, city];
  const { rows } = await pool.query(query, values);
  const { user_id, created_at, updated_at } = rows[0];
  return createUser(user_id, firstName, lastName, phoneNumber, email, password, role, mobileNumber, houseNumber, zipCode, city, created_at, updated_at);
}

async function updateUserRecord(id, firstName, lastName, phoneNumber, email, password, role, mobileNumber, houseNumber, zipCode, city) {
  const query = 'UPDATE users SET first_name = $2, last_name = $3, phone_number = $4, email = $5, password = $6, role = $7, mobile_number = $8, house_number = $9, zip_code = $10, city = $11, updated_at = NOW() WHERE user_id = $1';
  const values = [id, firstName, lastName, phoneNumber, email, password, role, mobileNumber, houseNumber, zipCode, city];
  await pool.query(query, values);
  return getUserById(id);
}

async function deleteUserRecord(id) {
  const query = 'DELETE FROM users WHERE user_id = $1';
  await pool.query(query, [id]);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUserRecord,
  updateUserRecord,
  deleteUserRecord,
};
