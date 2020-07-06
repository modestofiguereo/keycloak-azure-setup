ARG NODE_VERSION
FROM node:$NODE_VERSION

COPY package*.json ./
COPY yarn.lock ./

RUN npm install --silent

RUN mkdir -p /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
