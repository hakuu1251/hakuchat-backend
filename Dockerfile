FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install
EXPOSE 8001