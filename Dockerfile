# Dockerfile para servir app Vite con Node.js (sin Nginx)

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

# Etapa 2: Servir con serve (Node.js)
FROM node:22.0.0-alpine

WORKDIR /app

# Instalar serve (servidor estático simple)
RUN npm install -g serve

# Copiar build desde etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer puerto 8080
EXPOSE 8080

# Servir la app en puerto 8080
CMD ["serve", "-s", "dist", "-l", "8080"]