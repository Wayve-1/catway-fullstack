const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Tous les utilisateurs (admin uniquement)
router.get("/", protect, getUsers);

// Récupérer un utilisateur par email
router.get("/:email", protect, getUserByEmail);

// Créer un utilisateur
router.post("/", createUser);

// Modifier un utilisateur
router.put("/:email", protect, updateUser);

// Supprimer un utilisateur
router.delete("/:email", protect, deleteUser);

module.exports = router;
