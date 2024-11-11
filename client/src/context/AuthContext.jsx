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
          setUser(response.data); // Imposta utente
        } catch (error) {
          localStorage.removeItem("token");
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
      throw new Error(error.response?.data?.message || "Errore durante il login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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
