import React from "react";
import { useAuth } from "../context/AuthContext"; // Importa il contesto di autenticazione
import Navbar from "../components/Navbar";

function Profile() {
  const { user, loading: authLoading } = useAuth(); // Ottieni i dati utente e lo stato di caricamento

  if (authLoading) {
    return <p>Caricamento profilo...</p>;
  }

  if (!user) {
    return (
      <p className="text-center text-red-500">Nessun utente autenticato.</p>
    );
  }
  //debugger

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4">Profilo Utente</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Nome:</strong> {user.firstName}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Cognome:</strong> {user.lastName}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {user.username}
          </p>
          <p className="text-gray-600">
            <strong>Ruolo:</strong> {user.role || "Utente"}
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
