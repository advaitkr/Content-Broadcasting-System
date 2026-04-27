const service = require("./auth.service");

exports.register = async (req, res) => {
  const user = await service.register(req.body);
  res.json(user);
};

exports.login = async (req, res) => {
  const data = await service.login(req.body);
  res.json(data);
};