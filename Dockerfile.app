FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:22-alpine AS application

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

COPY /doc /app/doc
COPY tsconfig*.json ./
COPY package*.json ./
COPY /prisma /app/prisma
COPY /src /app/src
COPY entrypoint.sh /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]