FROM node:14.19.3-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3003

CMD [ "yarn", "start" ]