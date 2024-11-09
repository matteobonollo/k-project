#!/bin/bash

# Naviga nella directory del server e avvia il server
echo "Starting server..."
cd server
npm install
npm start &
SERVER_PID=$!

# Naviga nella directory del client e avvia il client
echo "Starting client..."
cd ../client
npm install
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
