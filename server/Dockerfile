FROM node:18-alpine as build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di dipendenze (package.json e package-lock.json)
COPY package*.json ./

# Installa le dipendenze
RUN npm install
# Copia tutto il resto del codice sorgente nella directory di lavoro del container
COPY . .
EXPOSE 5555

# Costruisce l'applicazione per la produzione
# Comando per avviare il server
CMD ["npm", "start"]

