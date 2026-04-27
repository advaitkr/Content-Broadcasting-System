const service = require("../services/scheduling.service");

exports.getLive = async (req, res) => {
  const data = await service.getLiveContent(req.params.teacherId);

  if (!data.length) {
    return res.json({ message: "No content available" });
  }

  res.json(data);
};