const bcrypt = require("bcrypt");
const pool = require("../../config/db");
const { generateToken } = require("../../utils/jwt");

exports.register = async ({ name, email, password, role }) => {
  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name,email,password,role)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, email, hashed, role]
  );

  return result.rows[0];
};

exports.login = async ({ email, password }) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = generateToken(user);

  return { token };
};