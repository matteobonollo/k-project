#!/bin/bash


function stop_services {
  echo "Stopping services..."
  kill $SERVER_PID $CLIENT_PID
  exit
}

trap stop_services SIGINT

# Controlla se è stato passato il flag --debug
if [[ "$1" == "--debug" ]]; then
  echo "Starting server in debug mode..."
  SERVER_SCRIPT="debug" 
else
  echo "Starting server in development mode..."
  SERVER_SCRIPT="dev" 
fi

# server
cd server
npm install
npm run format
npm run $SERVER_SCRIPT &
SERVER_PID=$!

# client
echo "Starting client..."
cd ../client
npm install
npm run format
npm start &
CLIENT_PID=$!


wait
