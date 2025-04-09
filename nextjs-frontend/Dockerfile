# 1. Base image for dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# 2. Build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 3. Run production server
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

# Expose port (change if your app runs on a different port)
EXPOSE 3000

CMD ["npm", "run", "start"]
