const authService = require("../services/auth.service");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.json({ message: "Registered" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login(
      req.body.email,
      req.body.password
    );

    const token = generateToken(user);

    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};