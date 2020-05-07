FROM node:lts
WORKDIR /opt/poe-js-webapp
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]
