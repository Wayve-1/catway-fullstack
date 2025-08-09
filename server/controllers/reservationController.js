const Reservation = require("../models/Reservation");

// 📥 Créer une réservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      catwayId: req.params.catwayId,
      userId: req.user.id, // 👈 ajout obligatoire
    });
    res.status(201).json(reservation);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur création réservation", error: err.message });
  }
};

// 📋 Récupérer toutes les réservations d’un catway
exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({
    catwayId: req.params.catwayId,
  });
  res.json(reservations);
};

// 🔍 Récupérer une réservation spécifique
exports.getReservation = async (req, res) => {
  const reservation = await Reservation.findById(req.params.reservationId);
  if (!reservation)
    return res.status(404).json({ message: "Réservation introuvable" });
  res.json(reservation);
};

// ✏️ Modifier une réservation
exports.updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur modification", error: err.message });
  }
};

// ❌ Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.reservationId);
  res.json({ message: "Réservation supprimée" });
};

// 📋 Toutes les réservations pour le dashboard
exports.getAllReservations = async (req, res) => {
  try {
    const all = await Reservation.find()
      .populate("catwayId")
      .populate({
        path: "userId",
        select: "username email", // 👈 On ne récupère que ce qu'on veut
        options: { strictPopulate: false }, // 👈 Ignore les userId manquants
      });

    res.json(all);
  } catch (err) {
    console.error("❌ Erreur:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
