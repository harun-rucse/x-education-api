FROM node:18-alpine
WORKDIR /app/x-education-api

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "dev" ]