import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient"; // Importa l'istanza Axios configurata con gli intercettori

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stato per l'utente autenticato
  const [loading, setLoading] = useState(true); // Stato di caricamento

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`; // Imposta il token globalmente
      setUser({ token }); // Puoi migliorare questa parte decodificando il token per ottenere più info
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post("/login", credentials);
      const { token } = response.data;

      // Salva il token e imposta l'utente autenticato
      localStorage.setItem("token", token);
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser({ token });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Errore durante il login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    apiClient.defaults.headers["Authorization"] = ""; // Rimuove il token dalle richieste future
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
