FROM node:16-alpine AS build

RUN mkdir -p /app

WORKDIR /app

COPY ./Chat/package.json /app

RUN npm install

COPY ./Chat/ /app

RUN npm install

COPY . /app

RUN npm run build --prod


FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/Chat /usr/share/nginx/html

FROM node:latest

WORKDIR /application

# Copia el código fuente del servidor Node.js
COPY ./ServidorNode /app/ServidorNode

# Instala las dependencias necesarias para el servidor Node.js
RUN npm install --prefix /app/ServidorNode

# Expone los puertos necesarios para el acceso web y las conexiones de WebSocket
EXPOSE 80
EXPOSE 3000

# Comandos para iniciar el servidor Node.js y el servidor web para servir la aplicación Angular
ENTRYPOINT ["node", "/app/ServidorNode/server.js"]
