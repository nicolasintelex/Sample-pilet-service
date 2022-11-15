FROM node:alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 4000
CMD [ "npm", "run", "serve" ]
