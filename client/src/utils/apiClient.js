// export const saveToken = (token) => {
//   localStorage.setItem("token", token);
// };

// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const removeToken = () => {
//   localStorage.removeItem("token");
// };

// export const isAuthenticated = () => {
//   return !!getToken();
// };


import axios from "axios";

// Crea un'istanza Axios configurata
const apiClient = axios.create({
  baseURL: "http://localhost:5555/api", // URL base del server
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercettore per aggiungere il token JWT se presente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercettore per gestire errori di autenticazione
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se il token non è valido o è scaduto
      localStorage.removeItem("token");
      window.location.href = "/login"; // Reindirizza al login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
