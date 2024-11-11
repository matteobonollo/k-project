import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stato utente autenticato
  const [loading, setLoading] = useState(true); // Stato di caricamento

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        try {
          const response = await apiClient.get("/auth/me");
          const userData = response.data;

          // Salva i dati utente nel localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              username: userData.username,
            }),
          );
          setUser(userData); // Imposta l'utente nello stato
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // Rimuovi l'utente dal localStorage
          setUser(null);
        }
      }
      setLoading(false); // Fine caricamento
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(user); // Aggiorna stato utente
      return true; // Indica il successo
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Errore durante il login",
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Rimuovi i dati utente dal localStorage
    apiClient.defaults.headers["Authorization"] = "";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
