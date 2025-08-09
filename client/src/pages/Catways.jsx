import React, { useEffect, useState } from "react";
import { getCatways } from "../services/api";

export default function Catways() {
  const [catways, setCatways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCatways();
        setCatways(data);
      } catch (err) {
        setError("Impossible de récupérer les catways");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>⏳ Chargement des catways...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📍 Liste des Catways
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <tr>
            <th style={thStyle}>Numéro</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>État</th>
          </tr>
        </thead>
        <tbody>
          {catways.map((catway) => (
            <tr key={catway._id} style={{ backgroundColor: "#f9f9f9" }}>
              <td style={tdStyle}>{catway.numero}</td>
              <td style={tdStyle}>
                {catway.type === "short" ? "Court" : "Long"}
              </td>
              <td style={{ ...tdStyle, color: getEtatColor(catway.etat) }}>
                {catway.etat}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

function getEtatColor(etat) {
  if (etat.includes("bon")) return "green";
  if (etat.includes("En cours")) return "orange";
  return "red";
}
