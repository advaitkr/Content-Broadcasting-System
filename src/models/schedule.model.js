const db = require("../config/db");

exports.createSchedule = async ({
  content_id,
  slot_id,
  rotation_order,
  duration,
}) => {
  const [result] = await db.query(
    `INSERT INTO content_schedule 
     (content_id, slot_id, rotation_order, duration)
     VALUES (?, ?, ?, ?)`,
    [content_id, slot_id, rotation_order, duration]
  );

  return result.insertId;
};

exports.findBySlot = async (slot_id) => {
  const [rows] = await db.query(
    `SELECT * FROM content_schedule
     WHERE slot_id = ?
     ORDER BY rotation_order ASC`,
    [slot_id]
  );

  return rows;
};

exports.findByContent = async (content_id) => {
  const [rows] = await db.query(
    `SELECT * FROM content_schedule
     WHERE content_id = ?`,
    [content_id]
  );

  return rows;
};

exports.getFullScheduleBySubject = async (subject) => {
  const [rows] = await db.query(
    `SELECT cs.*, c.title, c.subject
     FROM content_schedule cs
     JOIN content c ON cs.content_id = c.id
     JOIN content_slots s ON cs.slot_id = s.id
     WHERE s.subject = ?
     ORDER BY cs.rotation_order ASC`,
    [subject]
  );

  return rows;
};