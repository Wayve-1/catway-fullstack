import Catway from "../models/Catway.js";

// GET /catways
export async function getCatways(req, res) {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// GET /catways/:id
export async function getCatwayById(req, res) {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// POST /catways
export async function createCatway(req, res) {
  try {
    const { numero, type, etat } = req.body;
    const existing = await Catway.findOne({ numero });
    if (existing) {
      return res.status(400).json({ message: "Catway déjà existant" });
    }

    const newCatway = new Catway({ numero, type, etat });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// PUT /catways/:id
export async function updateCatway(req, res) {
  try {
    const { numero, type, etat } = req.body;
    const updated = await Catway.findByIdAndUpdate(
      req.params.id,
      { numero, type, etat },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// DELETE /catways/:id
export async function deleteCatway(req, res) {
  try {
    const deleted = await Catway.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Catway non trouvé" });
    res.json({ message: "Catway supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}
