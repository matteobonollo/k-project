
# **K-Project**

Questo progetto utilizza **Node.js**, **React** e **MongoDB** per creare un'applicazione full-stack dockerizzata.

---

## **Struttura del Progetto**

```
my-app/
├── client/                # Frontend (React)
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── server/                # Backend (Node.js, Express)
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── mongo-init/            # Script per inizializzare e popolare MongoDB
│   └── init-k.js
├── docker-compose.yml     # Configurazione Docker Compose
└── README.md              # Documentazione del progetto
```

---

## **Prerequisiti**

Assicurati di avere i seguenti strumenti installati:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## **Installazione**

1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-repo/k-project.git
   cd k-project
   ```

2. Avvia l'intero ambiente con **Docker Compose**:
   ```bash
   docker-compose up --build
   ```

Questo comando:

- Avvia **MongoDB**.
- Avvia il **server** sulla porta `5555`.
- Avvia il **client** sulla porta `3333`.
- Esegue lo script `init-k.js` per popolare il database.

---

## **EndPoint**

### **Server (Node.js)**
| Metodo | Endpoint            | Descrizione                |
|--------|----------------------|----------------------------|
| GET    | `/api/collections`   | Ottiene tutte le collezioni |
| POST   | `/api/collections`   | Aggiunge una nuova collezione |

### **Client (React)**
- Accessibile su [http://localhost:3333](http://localhost:3333).

### **MongoDB**
- Porta predefinita: `27017`.

---

## **Script di Inizializzazione**

Lo script **`init-k.js`** crea e popola il database **k** automaticamente quando MongoDB viene avviato per la prima volta.

---

## **Comandi Utili**

- **Avvio dei container**:
  ```bash
  docker-compose up
  ```

- **Arresto dei container**:
  ```bash
  docker-compose down
  ```

- **Rimozione e ricostruzione delle immagini**:
  ```bash
  docker-compose up --build
  ```

- **Accedi al terminale MongoDB**:
  ```bash
  docker exec -it mongodb mongosh
  ```

---

## **Verifica del Database**

Puoi verificare che il database sia stato popolato utilizzando:

- **MongoDB Compass**.
- Accedendo al container con:
  ```bash
  docker exec -it mongodb mongosh
  ```

---

## **Tecnologie Utilizzate**

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerizzazione**: Docker, Docker Compose

---

## **Licenza**

Questo progetto è distribuito sotto la licenza [MIT](https://opensource.org/licenses/MIT).

---

## **Autore**

- **[Il Tuo Nome]**
- [Email](mailto:email@example.com)
- [GitHub](https://github.com/tuo-profilo)
