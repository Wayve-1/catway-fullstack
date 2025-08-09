const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/users");
const catwayRoutes = require("./routes/catways");
const reservationRoutes = require("./routes/reservationRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/catways", catwayRoutes);
app.post("/login", require("./controllers/userController").loginUser);
app.use("/catways", reservationRoutes);
app.use("/api", reservationRoutes);

const PORT = process.env.PORT || 5000;
console.log("URI MongoDB :", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
  })
  .catch((err) => console.error("Erreur MongoDB :", err));
