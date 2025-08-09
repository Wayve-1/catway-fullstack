const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Email inconnu" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router;
