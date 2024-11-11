import axios from "axios";

// Crea un'istanza Axios configurata
const apiClient = axios.create({
  baseURL: "http://localhost:5555/api", // URL base del server
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercettore per aggiungere il token JWT e i dati utente se presenti
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Recupera l'oggetto user

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (user) {
      config.headers["User-Data"] = JSON.stringify({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      }); // Passa i dati utente personalizzati
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Intercettore per gestire errori di autenticazione
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se il token non è valido o è scaduto
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Rimuovi anche l'oggetto user
      window.location.href = "/login"; // Reindirizza al login
    }
    return Promise.reject(error);
  },
);

export default apiClient;
