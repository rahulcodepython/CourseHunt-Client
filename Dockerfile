# Build Stage
FROM node:latest AS build

WORKDIR /app

COPY package.json bun.lockb ./

RUN npm install -g bun

COPY . .

RUN bun run build

# Production Stage
FROM node:23.4.0-alpine AS production

WORKDIR /app

# Copy required files from build stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.env.prod .env