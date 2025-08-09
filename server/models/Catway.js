const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  type: { type: String, enum: ["short", "long"], required: true },
  etat: { type: String, required: true },
});

module.exports = mongoose.model("Catway", catwaySchema);
