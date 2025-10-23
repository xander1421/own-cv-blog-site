# Stage 1: Build the application
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the Astro site
RUN npm run build

# Stage 2: Serve the application
FROM node:latest AS runtime

# Install a simple http server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the dist folder
CMD ["serve", "dist", "-p", "3000", "-s"]