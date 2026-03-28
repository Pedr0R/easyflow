FROM node:20-alpine

WORKDIR /usr/src/app

# Dependencias instaladas no startup do container em ambiente vazio.
CMD ["sh", "-c", "if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm start -- --host 0.0.0.0 --port 4200"]
