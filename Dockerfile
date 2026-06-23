# FROM node:22-alpine

# RUN corepack enable && corepack prepare pnpm@latest --activate

# WORKDIR /app

# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile

# COPY . .
# RUN pnpm run build

# EXPOSE 8080

# CMD ["pnpm", "run", "start"]


# Etapa 1: Construcción
FROM node:22-alpine AS builder

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN pnpm run build

# Etapa 2: Producción
FROM node:22-alpine

WORKDIR /app

# Instalar serve para servir archivos estáticos
RUN npm install -g serve

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist

COPY inject-env.sh /app/inject-env.sh
RUN chmod +x /app/inject-env.sh

# Exponer el puerto (Railway usa la variable PORT)
EXPOSE 8080

# Comando para iniciar la aplicación
CMD sh -c "echo 'window.ENV = { VITE_API_URL: \"'${VITE_API_URL}'\", VITE_API_STORES_KEY: \"'${VITE_API_STORES_KEY}'\" };' > /app/dist/env-config.js && serve -s dist -l ${PORT:-8080}"
