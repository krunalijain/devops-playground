# Creating Dockerfile for running nodejs app locally

To run the same nodejs app via docker, you need to create a dockerfile and build a docker image.

## Create a Dockerfile 

```dockerfile
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

```

## Build a Docker Image

To build a docker image run this command by replacing with your preferred <your image name>

```dockerfile
docker build -t your-image-name .
```

## Run docker image

Once docker image has been built, you can run this command to run the docker on specific port

```dockerfile
docker run -p 3000:3000 your-image-name

```

You can also verify your docker image built by running this command.

```dockerfile
docker images
```

And to verify the running docker images run 

```dockerfile
docker image ps
```

## Access Dockerized Web page

To access the dockerized web page run  `http://localhost:3000/` in your preferred browser's URL.



