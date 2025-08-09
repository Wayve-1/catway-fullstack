# Catway Fullstack

Application fullstack (MERN) pour la gestion de catways et de réservations.

## Architecture du projet
Ce dépôt contient **frontend** (React + Vite) et **backend** (Express + MongoDB) dans un seul repo.

## catway-fullstack
┣ 📂 backend # API REST Express
┣ 📂 frontend # Application React
┣ 📜 README.md
┗ 📜 package.json # dépendances globales si besoin


##  Déploiement en ligne
- **Frontend (Vercel)** : [https://catway-fullstack.vercel.app](https://catway-fullstack.vercel.app)
- **Backend (Render)** : [https://catway-fullstack.onrender.com](https://catway-fullstack.onrender.com)

##  Compte de test
Email : example@example.com
Mot de passe : example


## ⚙️ Installation en local

###  Cloner le projet

git clone https://github.com/mon-compte/catway-fullstack.git
cd catway-fullstack

 Backend (API)
cd backend
npm install

Créer un fichier .env :
MONGO_URI=mongodb+srv://admin:motdepasse123@catwaydb.pyrn2g8.mongodb.net/catway-fullstack?retryWrites=true&w=majority&appName=CatwayDB
PORT=5000


  Lancer le backend :
npm start
API dispo sur http://localhost:5000

 Frontend (React)
cd ../frontend
npm install

Créer un fichier .env :
VITE_API_URL=http://localhost:5000

  Lancer le frontend :
npm run dev
Application dispo sur http://localhost:5173

## Fonctionnalités
Gestion des utilisateurs (CRUD)

Gestion des catways (CRUD)

Réservation de catways

Authentification avec JWT

## Technologies
Frontend : React, Vite, Axios

Backend : Node.js, Express, MongoDB, Mongoose

Déploiement : Vercel (frontend) & Render (backend)

