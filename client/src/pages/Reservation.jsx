import { useEffect, useState } from "react";
import {
  getCatways,
  getReservations,
  createReservation,
  deleteReservation,
} from "../services/api";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

export default function ReservationsPage() {
  const [catways, setCatways] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedCatway, setSelectedCatway] = useState("");
  const [form, setForm] = useState({
    clientName: "",
    dateDebut: "",
    dateFin: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadData() {
      const catwaysData = await getCatways(token);
      setCatways(catwaysData);
    }
    loadData();
  }, [token]);

  useEffect(() => {
    async function loadReservations() {
      console.log("Chargement des réservations pour :", selectedCatway);

      if (!selectedCatway) return;
      const data = await getReservations(selectedCatway, token);
      setReservations(data);
    }
    loadReservations();
  }, [selectedCatway, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCatway) return alert("Sélectionne un catway");
    try {
      await createReservation(selectedCatway, form, token);
      alert("Réservation ajoutée !");
      setForm({ clientName: "", dateDebut: "", dateFin: "" });
      const data = await getReservations(selectedCatway, token);
      setReservations(data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la réservation");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    await deleteReservation(selectedCatway, id, token);
    const data = await getReservations(selectedCatway, token);
    setReservations(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Réservations</h2>

      <select
        value={selectedCatway}
        onChange={(e) => setSelectedCatway(e.target.value)}
      >
        <option value="">-- Choisir un catway --</option>
        {catways.map((c) => (
          <option key={c._id} value={c._id}>
            #{c.catwayNumber || c.numero} ({c.catwayType || c.type})
          </option>
        ))}
      </select>

      {selectedCatway && (
        <>
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <input
              name="clientName"
              type="text"
              placeholder="Nom du client"
              value={form.clientName}
              onChange={handleChange}
              required
            />
            <input
              name="dateDebut"
              type="date"
              value={form.dateDebut}
              onChange={handleChange}
              required
            />
            <input
              name="dateFin"
              type="date"
              value={form.dateFin}
              onChange={handleChange}
              required
            />
            <button type="submit">Réserver</button>
          </form>

          <table border="1" cellPadding="8" style={{ marginTop: "2rem" }}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r._id}>
                  <td>{r.clientName}</td>
                  <td>
                    {dayjs(r.dateDebut).isValid()
                      ? dayjs(r.dateDebut).format("DD MMMM YYYY")
                      : "Date invalide"}
                  </td>
                  <td>
                    {dayjs(r.dateFin).isValid()
                      ? dayjs(r.dateFin).format("DD MMMM YYYY")
                      : "Date invalide"}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(r._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
