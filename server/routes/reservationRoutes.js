const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getAllReservations,
} = require("../controllers/reservationController");
const { protect } = require("../middleware/authMiddleware");

// ========== POUR LA PAGE CATWAYS ==========
router.get("/catways/:catwayId/reservations", protect, getReservations);
router.get(
  "/catways/:catwayId/reservations/:reservationId",
  protect,
  getReservation
);
router.post("/catways/:catwayId/reservations", protect, createReservation);
router.put("/catways/:catwayId/reservations", protect, updateReservation);
router.delete(
  "/catways/:catwayId/reservations/:reservationId",
  protect,
  deleteReservation
);

// ========== POUR LE DASHBOARD ==========
router.get("/reservations", protect, getAllReservations);

module.exports = router;
