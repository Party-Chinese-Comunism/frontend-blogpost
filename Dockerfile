FROM node:18.17.0-alpine3.18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm i 

COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
