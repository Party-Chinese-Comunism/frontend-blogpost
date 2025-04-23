# Etapa 1: Build da aplicação (React)
FROM node:18.17.0-alpine3.18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .
RUN npm run build

# Etapa 2: Servir com NGINX (leve e seguro)
FROM nginx:1.25.2-alpine

# Copia o build final para o diretório padrão do NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração customizada do NGINX (com bloqueios e proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
