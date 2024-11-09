#!/bin/bash

# Naviga nella directory del server e avvia il server con Nodemon
echo "Starting server..."
cd server
npm install
npm run format
npm run dev &
SERVER_PID=$!

# Naviga nella directory del client e avvia il client
echo "Starting client..."
cd ../client
npm install
npm run format
npm start &
CLIENT_PID=$!

# Funzione per fermare entrambi i processi
function stop_services {
  echo "Stopping services..."
  kill $SERVER_PID $CLIENT_PID
  exit
}

# Intercetta Ctrl+C e ferma i servizi
trap stop_services SIGINT

# Mantieni lo script in esecuzione
wait
