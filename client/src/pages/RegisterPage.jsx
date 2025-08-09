import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ email, password, role, username });
      alert("Utilisateur créé !");
      navigate("/dashboard");
    } catch (err) {
      alert("Erreur lors de la création");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          📝 Créer un compte
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={buttonStyle}>
            Créer le compte
          </button>
        </form>
      </div>
    </div>
  );
}

// Styles réutilisables
const inputStyle = {
  padding: "0.75rem 1rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "0.75rem",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};
