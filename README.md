
# **K-Project**

E-commerce Questo progetto utilizza **Node.js**, **React**, **TailwindCSS** e **MongoDB** per creare un'applicazione full-stack dockerizzata.

---

## **Struttura del Progetto**

```
my-app/
├── client/                # Frontend (React, TailwindCSS)
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
   git clone https://github.com/matteobonollo/k-project.git
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
| GET    | `/api/order`   | Ottiene tutti gli ordini relativi a un utente |
| POST   | `/api/order`   | Inserisce un ordine |


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

- **[Matteo B]**

- [GitHub](https://github.com/matteobonollo)
