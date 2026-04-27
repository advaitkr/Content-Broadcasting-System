const userModel = require("../models/user.model");
const bcrypt = require("../utils/bcrypt");

exports.register = async (data) => {
  const hash = await bcrypt.hashPassword(data.password);

  return userModel.createUser({
    name: data.name,
    email: data.email,
    password_hash: hash,
    role: data.role,
  });
};

exports.login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.comparePassword(
    password,
    user.password_hash
  );

  if (!valid) throw new Error("Invalid credentials");

  return user;
};