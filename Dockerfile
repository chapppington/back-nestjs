# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm (version compatible with lockfile v6.0)
RUN npm install -g pnpm@8

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN pnpm prisma generate

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install netcat for wait script
RUN apk add --no-cache netcat-openbsd

# Install pnpm (version compatible with lockfile v6.0)
RUN npm install -g pnpm@latest

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --prod

# Copy Prisma files
COPY prisma ./prisma

# Generate Prisma Client for production
RUN pnpm prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy wait script
COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 4200

# Run migrations and start the application
CMD ["sh", "-c", "/app/wait-for-db.sh postgres 5432 && pnpm prisma migrate deploy && pnpm start:prod"]
