# Multi-stage build optimizado para Cloud Run con pnpm

# Etapa 1: Build
FROM node:22.0.0-alpine AS builder

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build
RUN pnpm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar build
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de nginx para SPA (React Router, Vue Router, etc)
RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Cloud Run usa el puerto 8080 por defecto
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]