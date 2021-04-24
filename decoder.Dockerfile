FROM node:14

WORKDIR /usr/src/app

COPY ./decoder-service/package*.json ./

RUN npm install

COPY ./decoder-service .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]