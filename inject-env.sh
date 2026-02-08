#!/bin/sh
# Crear el archivo env-config.js con las variables de entorno
cat <<EOF > /app/dist/env-config.js
window.ENV = {
  VITE_API_URL: "${VITE_API_URL}"
  VITE_API_STORES_KEY: "${VITE_API_STORES_KEY}"
};
EOF