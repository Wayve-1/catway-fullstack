import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import "../Users.css";

export default function UsersPage() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    // 🔒 Validation côté client
    if (newUser.name.length < 3) {
      alert("Le nom d'utilisateur doit contenir au moins 3 caractères.");
      return;
    }

    if (newUser.password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      await createUser(newUser);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(email, token);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="users-container">
      <h1>Créer un utilisateur</h1>
      <div className="form-row">
        <input
          type="text"
          placeholder="Nom"
          value={newUser.name}
          minLength={3}
          required
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={newUser.password}
          minLength={6}
          required
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />

        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleCreate}>Créer</button>
      </div>

      <h2>Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="edit">Modifier</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(u.email)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
