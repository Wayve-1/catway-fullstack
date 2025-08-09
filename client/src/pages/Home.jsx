import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Bienvenue sur <span style={{ color: "#007bff" }}>MarinaApp</span>
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#555" }}>
          Gérez vos <strong>catways</strong>, <strong>utilisateurs</strong> et{" "}
          <strong>réservations</strong> facilement. Cette plateforme a été
          conçue pour simplifier l'administration de votre marina.
        </p>
        <button
          onClick={handleClick}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: isLoggedIn ? "#dc3545" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isLoggedIn ? "🔓 Déconnexion" : "🔐 Connexion"}
        </button>
      </div>
    </div>
  );
}
