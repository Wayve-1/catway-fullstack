const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL =", API_URL);

// Ajoute automatiquement le token si présent
function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ========== AUTH ==========
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Échec de la connexion");
  }

  return data;
}

// ========== USERS ==========

export async function getUsers(token) {
  const res = await fetch(`${API_URL}/users`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Impossible de récupérer les utilisateurs");
  return await res.json();
}

export async function getUserByEmail(email, token) {
  const res = await fetch(`${API_URL}/users/${email}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Utilisateur introuvable");
  return await res.json();
}

export async function createUser(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erreur lors de la création du compte");
  return await res.json();
}

export async function updateUser(email, user, token) {
  const res = await fetch(`${API_URL}/users/${email}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return await res.json();
}

export async function deleteUser(email, token) {
  const res = await fetch(`${API_URL}/users/${email}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
  return await res.json();
}

// ========== CATWAYS ==========

export const fetchCatways = async (token) => {
  const res = await fetch(`${API_URL}/catways`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  console.log("Données reçues de /catways :", data);
  return data;
};

export const getCatways = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/catways`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de charger les catways");
  }

  return await response.json();
};

export async function getCatway(id, token) {
  const res = await fetch(`${API_URL}/catways/${id}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Catway introuvable");
  return await res.json();
}

export async function createCatway(catway, token) {
  const res = await fetch(`${API_URL}/catways`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(catway),
  });
  if (!res.ok) throw new Error("Erreur création catway");
  return await res.json();
}

export const updateCatway = async (id, updatedCatway) => {
  const res = await fetch(`${API_URL}/catways/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCatway),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
};

export async function deleteCatway(id, token) {
  const res = await fetch(`${API_URL}/catways/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Erreur suppression catway");
  return await res.json();
}

// ========== RESERVATIONS ==========

export async function getReservations(catwayId, token) {
  const res = await fetch(`${API_URL}/catways/${catwayId}/reservations`, {
    headers: authHeaders(token),
  });

  if (!res.ok) throw new Error("Impossible de charger les réservations");
  return await res.json();
}

export async function createReservation(catwayId, reservation, token) {
  const res = await fetch(`${API_URL}/catways/${catwayId}/reservations`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Erreur création réservation");
  return await res.json();
}

export async function updateReservation(catwayId, reservation, token) {
  const res = await fetch(`${API_URL}/catways/${catwayId}/reservations`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Erreur modification réservation");
  return await res.json();
}

export async function deleteReservation(catwayId, reservationId, token) {
  const res = await fetch(
    `${API_URL}/catways/${catwayId}/reservations/${reservationId}`,
    {
      method: "DELETE",
      headers: authHeaders(token),
    }
  );
  if (!res.ok) throw new Error("Erreur suppression réservation");
  return await res.json();
}

// FONCTION POUR LE DASHBOARD :
export async function getAllReservations(token) {
  console.log("Token envoyé GET reservations:", token);
  const response = await fetch(`${API_URL}/api/reservations`, {
    headers: authHeaders(token),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("Erreur API :", err.message || response.statusText);
    throw new Error(err.message || "Erreur lors du fetch des réservations");
  }

  return await response.json();
}
