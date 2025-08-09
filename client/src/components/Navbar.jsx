import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);

    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userChange", handleUserChange);
    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    navigate("/");
  };

  return (
    <nav style={navStyle}>
      <div style={leftStyle}>
        <span style={logoStyle}>MarinaApp</span>
        <Link to="/" style={linkStyle}>
          Accueil
        </Link>

        {user && (
          <>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
            <Link to="/catways" style={linkStyle}>
              Catways
            </Link>
            <Link to="/utilisateurs" style={linkStyle}>
              Utilisateurs
            </Link>
            <Link to="/reservations" style={linkStyle}>
              Réservations
            </Link>
          </>
        )}
      </div>

      <div style={rightStyle}>
        {!user ? (
          <>
            <Link to="/login" style={buttonStyle}>
              Connexion
            </Link>
            <Link to="/register" style={buttonStyle}>
              Créer un compte
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} style={logoutStyle}>
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}

// 💅 Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "#007bff",
  color: "white",
};

const leftStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const rightStyle = {
  display: "flex",
  gap: "1rem",
};

const logoStyle = {
  fontWeight: "bold",
  fontSize: "1.5rem",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1rem",
};

const buttonStyle = {
  backgroundColor: "white",
  color: "#007bff",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "4px",
  textDecoration: "none",
  cursor: "pointer",
};

const logoutStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
  color: "white",
};
