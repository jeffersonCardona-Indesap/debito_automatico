# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS builder

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . . 

# Construir la aplicación Angular
RUN npm run build --configuration=production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos generados por Angular al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para Nginx
EXPOSE 4201

CMD ["nginx", "-g", "daemon off;"]
