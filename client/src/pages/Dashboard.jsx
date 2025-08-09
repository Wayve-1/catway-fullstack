import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReservations } from "../services/api";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

export default function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [today, setToday] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
      return;
    }

    const fetchReservations = async () => {
      try {
        const data = await getAllReservations(token);
        setReservations(data);
      } catch (error) {
        console.error("Erreur lors du fetch des réservations :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();

    const date = new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setToday(date);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (loading || !user) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>Tableau de bord</h2>

      {/*  Infos utilisateur */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <p>
          <strong>Nom d'utilisateur :</strong> {user.username || "Non défini"}
        </p>
        <p>
          <strong>Email :</strong> {user.email}
        </p>
        <p>
          <strong>Rôle :</strong> {user.role || "N/A"}
        </p>
        <p>
          <strong>Date :</strong> {today}
        </p>

        <div style={{ marginTop: "1rem" }}>
          <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            📘 Documentation API
          </a>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🔒 Se déconnecter
          </button>
        </div>
      </div>

      {/* 📅 Réservations */}
      <h3>Réservations</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={thStyle}>Client</th>
            <th style={thStyle}>Catway</th>
            <th style={thStyle}>Début</th>
            <th style={thStyle}>Fin</th>
            <th style={thStyle}>Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((r) => (
              <tr key={r._id}>
                <td style={tdStyle}>{r.clientName}</td>
                <td style={tdStyle}>{r.catwayId?.numero || "N/A"}</td>
                <td style={tdStyle}>
                  {dayjs(r.dateDebut).format("DD MMMM YYYY")}
                </td>
                <td style={tdStyle}>
                  {dayjs(r.dateFin).format("DD MMMM YYYY")}
                </td>
                <td style={tdStyle}>
                  {r.userId
                    ? r.userId.username || r.userId.email
                    : "Ancienne réservation"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                Aucune réservation enregistrée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// 🧩 Styles communs pour les cellules
const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};
