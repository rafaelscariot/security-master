FROM node:latest

COPY ../../ .

RUN npm i

EXPOSE 3000

CMD [ "npm", "start" ]