const contentModel = require("../models/content.model");

exports.uploadContent = async (req) => {
  const file = req.file;
  const { title, subject, description, start_time, end_time } = req.body;

  if (!file || !title || !subject || !start_time || !end_time) {
    throw new Error("Missing required fields");
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  return contentModel.createContent({
    title,
    description,
    subject,
    file_path: `${baseUrl}/uploads/${file.filename}`,
    file_type: file.mimetype,
    file_size: file.size,
    uploaded_by: req.user.id,
    start_time,
    end_time,
  });
};

exports.getMyContent = (userId) =>
  contentModel.findByTeacher(userId);