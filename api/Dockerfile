FROM node:16.2

WORKDIR /usr/src/app

COPY .version        .
COPY package.json    .
COPY yarn.lock       .
COPY data            data
COPY src             src

RUN yarn global add pm2
RUN yarn install --production --pure-lockfile

EXPOSE 8000

CMD ["pm2-runtime", "start", "src/server.js"]
