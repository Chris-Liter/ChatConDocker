# Etapa de construcción para el cliente Angular
FROM node:16-alpine AS build

RUN mkdir -p /app
WORKDIR /app

COPY ./Chat/package.json /app
RUN npm install

COPY ./Chat/ /app
RUN npm run build --prod

# Etapa para servir la aplicación Angular con NGINX
FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/Chat /usr/share/nginx/html

# Etapa para el servidor Node.js
FROM node:latest

WORKDIR /application
#oghyufifoeeoseghesripughnersuorprghespurgdfvn

# Copia el código fuente del servidor Node.js
COPY ./ServidorNode /application/ServidorNode

# Instala las dependencias necesarias para el servidor Node.js
RUN npm install --prefix /application/ServidorNode \
    && npm install socket.io --prefix /application/ServidorNode
# Expone el puerto del servidor Node.js
EXPOSE 3000

# Comando para iniciar el servidor Node.js
CMD ["node", "/application/ServidorNode/server.js"]
 