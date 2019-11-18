FROM node:12.7.0-slim as build-stage

ENV CI=true
WORKDIR /app
COPY nginx.conf ./
COPY .eslintrc ./
COPY .prettierrc ./
COPY *.json ./
RUN npm ci
COPY public/ ./public
COPY src/ ./src

RUN npm run lint:fix
RUN npm audit --production
RUN npm run build

# nginx stage
FROM nginx:1.16.1
COPY --from=build-stage /app/build/ /var/www
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
