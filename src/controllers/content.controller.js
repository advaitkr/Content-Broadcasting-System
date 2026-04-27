const service = require("../services/content.service");

exports.upload = async (req, res) => {
  try {
    const data = await service.uploadContent(req);
    res.json({ message: "Uploaded", data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getMine = async (req, res) => {
  const data = await service.getMyContent(req.user.id);
  res.json(data);
};