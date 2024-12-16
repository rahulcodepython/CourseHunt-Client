# Build Stage
FROM node:latest AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

RUN npm run build

# Production Stage
FROM node:23.4.0-alpine AS production

WORKDIR /app

# Copy required files from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

# Reinstall production dependencies
RUN npm ci --only=production --force