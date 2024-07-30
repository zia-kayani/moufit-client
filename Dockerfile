# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that your app will run on
EXPOSE 3000

# Define the command to run your app using npm
CMD ["npm", "start"]
