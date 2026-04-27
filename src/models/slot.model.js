const db = require("../config/db");

exports.createSlot = async (subject) => {
  const [result] = await db.query(
    `INSERT INTO content_slots (subject) VALUES (?)`,
    [subject]
  );

  return result.insertId;
};

exports.findBySubject = async (subject) => {
  const [rows] = await db.query(
    `SELECT * FROM content_slots WHERE subject = ?`,
    [subject]
  );

  return rows[0];
};

exports.getAllSlots = async () => {
  const [rows] = await db.query(
    `SELECT * FROM content_slots`
  );

  return rows;
};