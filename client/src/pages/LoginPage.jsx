import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("userChange"));
      navigate("/dashboard"); // ✅ redirection après connexion
    } catch (err) {
      alert("Connexion échouée : " + err.message);
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
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          🔐 Connexion
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
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
          <button type="submit" style={buttonStyle}>
            Se connecter
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
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};
