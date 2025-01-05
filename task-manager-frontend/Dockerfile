# Use an official Node.js runtime as a parent image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the app
CMD ["npx", "serve", "-s", "dist"]
