const bcrypt = require("bcryptjs");
const model = require("../models/User");
const generateToken = require("../utils/generateToken");
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    token: generateToken(user),
    user,
  });
};

module.exports = {loginUser,};