const mongoose = require("mongoose");
const Catway = require("./models/Catway");
require("dotenv").config();

async function updateCatways() {
  await mongoose.connect(process.env.MONGO_URI);

  const catways = await Catway.collection.find({}).toArray();

  for (const c of catways) {
    await Catway.collection.updateOne(
      { _id: c._id },
      {
        $set: {
          numero: c.catwayNumber,
          type: c.catwayType,
          etat: c.catwayState,
        },
        $unset: {
          catwayNumber: "",
          catwayType: "",
          catwayState: "",
        },
      }
    );
    console.log(`✅ Catway ${c.catwayNumber} mis à jour`);
  }

  mongoose.disconnect();
}

updateCatways();
