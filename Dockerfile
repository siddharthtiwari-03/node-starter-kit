# ============================
# DEV STAGE
# ============================
FROM node:22-alpine AS dev
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

CMD ["npm", "run", "dev"]

# ============================
# BUILDER (prod build)
# ============================
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY obfuscator.json ./
COPY src ./src

RUN npm run compile
RUN npm run bundle
RUN npm run obfuscate

# ============================
# PRODUCTION
# ============================
FROM node:22-alpine AS production
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

USER appuser
CMD ["node", "dist/server.js"]
