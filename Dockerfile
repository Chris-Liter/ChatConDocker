# Etapa de construcción para la aplicación Angular
FROM node:16-alpine AS build-angular
WORKDIR /app
COPY ./Chat/package.json /app
RUN npm install
COPY ./Chat/ /app
RUN npm run build --prod

# Etapa de construcción para el servidor Node.js
FROM node:latest AS build-node
WORKDIR /application
COPY ./ServidorNode /application/ServidorNode
RUN npm install --prefix /application/ServidorNode

# Etapa final para crear la imagen final
FROM nginx:1.17.1-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-angular /app/dist/Chat .
COPY --from=build-node /application/ServidorNode /application/ServidorNode

# Exponer los puertos necesarios
EXPOSE 80
EXPOSE 3000

RUN apk add --no-cache nodejs npm
# Comando para iniciar ambos servidores
CMD ["sh", "-c", "npm start --prefix /application/ServidorNode & nginx -g 'daemon off;'"]
