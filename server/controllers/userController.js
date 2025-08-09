const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔐 Créer un token
const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// 🔐 Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Identifiants invalides" });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 👤 Créer un compte
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const user = await User.create({ username, email, password, role });
    res.status(201).json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur création utilisateur", error: err.message });
  }
};

// 👥 Tous les users
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// 🔍 Un user par email
exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
};

// ✏️ Modifier
exports.updateUser = async (req, res) => {
  const updated = await User.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    {
      new: true,
    }
  ).select("-password");
  res.json(updated);
};

// ❌ Supprimer
exports.deleteUser = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });
  res.json({ message: "Utilisateur supprimé" });
};
