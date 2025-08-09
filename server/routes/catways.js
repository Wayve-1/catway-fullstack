const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");
const { protect } = require("../middleware/authMiddleware");

// ✅ Récupérer tous les catways
router.get("/", protect, async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Récupérer un catway
router.get("/:id", protect, async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway introuvable" });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Créer un catway
router.post("/", protect, async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.status(201).json(catway);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création" });
  }
});

// ✅ Modifier un catway
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Catway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification" });
  }
});

// ✅ Supprimer un catway
router.delete("/:id", protect, async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.json({ message: "Catway supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

// -----------------
// 📌 SOUS-ROUTES POUR LES RÉSERVATIONS
// -----------------

// Toutes les réservations d'un catway
router.get("/:catwayId/reservations", protect, async (req, res) => {
  try {
    const { catwayId } = req.params;
    const reservations = await Reservation.find({ catwayId });
    res.json(reservations);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des réservations" });
  }
});

// Créer une réservation pour un catway
router.post("/:catwayId/reservations", protect, async (req, res) => {
  try {
    const { catwayId } = req.params;
    const reservation = new Reservation({ ...req.body, catwayId });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la réservation" });
  }
});

// Modifier une réservation
router.put(
  "/:catwayId/reservations/:reservationId",
  protect,
  async (req, res) => {
    try {
      const { reservationId } = req.params;
      const updated = await Reservation.findByIdAndUpdate(
        reservationId,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur lors de la modification de la réservation" });
    }
  }
);

// Supprimer une réservation
router.delete(
  "/:catwayId/reservations/:reservationId",
  protect,
  async (req, res) => {
    try {
      const { reservationId } = req.params;
      await Reservation.findByIdAndDelete(reservationId);
      res.json({ message: "Réservation supprimée" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la réservation" });
    }
  }
);

module.exports = router;
