const db = require("../config/db");

exports.createUser = async ({ name, email, password_hash, role }) => {
  const [result] = await db.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, password_hash, role]
  );
  return result.insertId;
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT * FROM users WHERE email=?`,
    [email]
  );
  return rows[0];
};