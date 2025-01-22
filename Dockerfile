# Build Stage
FROM node:latest AS build

WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lockb ./

RUN bun install

COPY public ./public
COPY src ./src
COPY .env.production .env.production
COPY .env.dev .env.local
COPY .eslintrc.json .eslintrc.json
COPY components.json components.json
COPY next-env.d.ts next-env.d.ts
COPY next.config.mjs next.config.mjs
COPY postcss.config.mjs postcss.config.mjs
COPY tailwind.config.ts tailwind.config.ts
COPY tsconfig.json tsconfig.json

RUN bun run build

# Production Stage
FROM node:23.4.0-alpine AS production

WORKDIR /app

# Copy required files from build stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.env.production .env