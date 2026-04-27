const db = require("../config/db");

exports.createContent = async (data) => {
  const [result] = await db.query(
    `INSERT INTO content 
    (title, description, subject, file_path, file_type, file_size, uploaded_by, start_time, end_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [
      data.title,
      data.description,
      data.subject,
      data.file_path,
      data.file_type,
      data.file_size,
      data.uploaded_by,
      data.start_time,
      data.end_time,
    ]
  );
  return result.insertId;
};

exports.findByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT * FROM content WHERE uploaded_by=?`,
    [teacherId]
  );
  return rows;
};

exports.findPending = async () => {
  const [rows] = await db.query(
    `SELECT * FROM content WHERE status='pending'`
  );
  return rows;
};

exports.updateStatus = async (id, status, reason, principalId) => {
  await db.query(
    `UPDATE content 
     SET status=?, rejection_reason=?, approved_by=?, approved_at=NOW()
     WHERE id=?`,
    [status, reason, principalId, id]
  );
};

exports.findApprovedActiveByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT * FROM content
     WHERE uploaded_by=? AND status='approved'
     AND start_time<=NOW() AND end_time>=NOW()`,
    [teacherId]
  );
  return rows;
};