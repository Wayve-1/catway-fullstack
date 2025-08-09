const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");

dotenv.config();

const importReservations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    const dataPath = path.join(__dirname, "data", "reservations.json");
    const reservationsData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    for (const reservation of reservationsData) {
      const catway = await Catway.findOne({
        catwayNumber: reservation.catwayNumber,
      });

      if (!catway) {
        console.log(`❌ Catway ${reservation.catwayNumber} introuvable`);
        continue;
      }

      const newReservation = new Reservation({
        catwayId: catway._id,
        clientName: reservation.clientName,
        dateDebut: reservation.startDate,
        dateFin: reservation.endDate,
      });

      await newReservation.save();
      console.log(`✅ Reservation ajoutée pour ${reservation.clientName}`);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erreur :", err);
  }
};

importReservations();
