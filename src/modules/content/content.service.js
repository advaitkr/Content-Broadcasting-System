const pool = require("../../config/db");

exports.upload = async (req) => {
  const {
    title,
    description,
    subject_id,
    start_time,
    end_time,
    rotation_duration
  } = req.body;

  const file_url = req.file.path;

  const result = await pool.query(
    `INSERT INTO contents
    (title,description,file_url,subject_id,teacher_id,start_time,end_time,rotation_duration)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
      title,
      description,
      file_url,
      subject_id,
      req.user.id,
      start_time,
      end_time,
      rotation_duration
    ]
  );

  return result.rows[0];
};

exports.getMyContent = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM contents WHERE teacher_id=$1`,
    [userId]
  );
  return result.rows;
};

exports.getPending = async () => {
  const result = await pool.query(
    `SELECT * FROM contents WHERE status='PENDING'`
  );
  return result.rows;
};

exports.approve = async (id) => {
  const result = await pool.query(
    `UPDATE contents SET status='APPROVED' WHERE id=$1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

exports.reject = async (id, reason) => {
  const result = await pool.query(
    `UPDATE contents SET status='REJECTED', rejection_reason=$1
     WHERE id=$2 RETURNING *`,
    [reason, id]
  );
  return result.rows[0];
};

exports.broadcast = async () => {
  const now = new Date();

  const result = await pool.query(
    `SELECT * FROM contents
     WHERE status='APPROVED'
     AND start_time IS NOT NULL
     AND end_time IS NOT NULL
     AND start_time <= $1
     AND end_time >= $1`,
    [now]
  );

  const contents = result.rows;

  if (!contents.length) {
    return { message: "No content available" };
  }

  const rotation = contents[0].rotation_duration;

  if (!rotation) return contents;

  const index =
    Math.floor(Date.now() / (rotation * 1000)) % contents.length;

  return contents[index];
};