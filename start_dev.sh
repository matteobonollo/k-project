#!/bin/bash

# Funzione per fermare entrambi i processi
function stop_services {
  echo "Stopping services..."
  kill $SERVER_PID $CLIENT_PID
  exit
}

# Intercetta Ctrl+C e ferma i servizi
trap stop_services SIGINT

# Controlla se è stato passato il flag --debug
if [[ "$1" == "--debug" ]]; then
  echo "Starting server in debug mode..."
  SERVER_SCRIPT="debug" # Usa lo script npm run debug
else
  echo "Starting server in development mode..."
  SERVER_SCRIPT="dev" # Usa lo script npm run dev
fi

# Naviga nella directory del server e avvia il server
cd server
npm install
npm run format
npm run $SERVER_SCRIPT &
SERVER_PID=$!

# Naviga nella directory del client e avvia il client
echo "Starting client..."
cd ../client
npm install
npm run format
npm start &
CLIENT_PID=$!

# Mantieni lo script in esecuzione
wait
