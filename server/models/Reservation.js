const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catwayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catway",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  clientName: {
    type: String,
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
