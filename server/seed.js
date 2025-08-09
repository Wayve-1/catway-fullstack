// seed.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    // 1. Suppression des anciennes données
    await Reservation.deleteMany({});
    await Catway.deleteMany({});
    console.log("🗑️ Anciennes données supprimées");

    // 2. Import des Catways
    const catwaysData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "catways.json"), "utf-8")
    );

    const formattedCatways = catwaysData.map((c) => ({
      numero: c.catwayNumber,
      type: c.catwayType,
      etat: c.catwayState,
    }));

    const insertedCatways = await Catway.insertMany(formattedCatways);
    console.log(`✅ ${insertedCatways.length} catways insérés`);

    // 3. Import des Réservations
    const reservationsData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "data", "reservations.json"),
        "utf-8"
      )
    );

    for (const r of reservationsData) {
      const catway = insertedCatways.find((c) => c.numero === r.catwayNumber);

      if (!catway) {
        console.log(
          `❌ Catway ${r.catwayNumber} introuvable pour ${r.clientName}`
        );
        continue;
      }

      await Reservation.create({
        catwayId: catway._id,
        clientName: r.clientName,
        dateDebut: r.startDate,
        dateFin: r.endDate,
      });
    }
    console.log(`✅ ${reservationsData.length} réservations insérées`);

    mongoose.disconnect();
    console.log("🚀 Base de données prête !");
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
    mongoose.disconnect();
  }
}

seedDatabase();
