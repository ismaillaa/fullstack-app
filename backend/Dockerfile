FROM node:18-alpine

WORKDIR /app

# Install wait-for-it pour gérer les dépendances entre conteneurs
RUN apk add --no-cache bash
ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Commande modifiée pour attendre que MySQL soit prêt
CMD ["/bin/sh", "-c", "/wait-for-it.sh mysql:3306 --timeout=30 -- node server.js"]