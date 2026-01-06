# Etapa 1: Build
FROM node:22.0.0-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Etapa 2: Servir
FROM node:22.0.0-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

# 🔑 CLAVE: usar $PORT y 0.0.0.0
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:$PORT"]
