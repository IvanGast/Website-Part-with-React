FROM node:12.7.0-alpine

WORKDIR /usr/src/app

COPY json-server.json ./
COPY package* ./
COPY db.json ./
COPY routes.json ./

RUN npm ci

EXPOSE 3001
ENTRYPOINT ["npm", "start"]
