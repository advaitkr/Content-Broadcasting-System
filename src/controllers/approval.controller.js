const service = require("../services/approval.service");

exports.getPending = async (req, res) => {
  const data = await service.getPending();
  res.json(data);
};

exports.approve = async (req, res) => {
  await service.approve(req.params.id, req.user.id);
  res.json({ message: "Approved" });
};

exports.reject = async (req, res) => {
  await service.reject(req.params.id, req.body.reason);
  res.json({ message: "Rejected" });
};