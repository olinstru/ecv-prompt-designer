FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN yarn

# Bundle app source
COPY index.js ./

# Exports
EXPOSE 3000
CMD [ "yarn", "start" ]