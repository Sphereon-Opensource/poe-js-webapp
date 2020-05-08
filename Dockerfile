FROM node:12.13.0
WORKDIR /opt/poe-js-webapp
COPY package*.json ./
RUN yarn policies set-version 1.21.1
RUN yarn install
RUN yarn cache clean
RUN export $(cat .env | xargs) && yarn build
COPY . .
EXPOSE 3000
CMD export $(cat .env | xargs) && yarn start
