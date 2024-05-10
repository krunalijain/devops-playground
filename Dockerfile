# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY ${APP_DIR}/package.json ./

# Install npm dependencies
RUN npm install

# Copy the server.js file from its absolute path into the Docker image
COPY ${APP_DIR}/server.js ./

# Expose the port your app runs on
EXPOSE 3000

# Command to run your server.js file
CMD ["node", "server.js"]
