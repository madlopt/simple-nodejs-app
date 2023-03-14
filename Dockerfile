FROM node:19

WORKDIR /var/www/nodejs

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD node /var/www/nodejs/index.js