# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire application source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your server.js file
CMD ["node", "server.js"]
