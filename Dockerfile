FROM keymetrics/pm2:10-alpine

WORKDIR /usr/src/app

COPY package.json    .
COPY yarn.lock       .
COPY config/pm2.json .
COPY data            data
COPY src             src

RUN apk add --no-cache --virtual .health-check curl                \
	&& apk add --no-cache --virtual .build-deps git build-base g++ \
	&& apk add --no-cache --virtual .npm-deps cairo-dev libjpeg-turbo-dev pango

RUN apk add --no-cache git
RUN yarn install --production --pure-lockfile

EXPOSE 8000

CMD ["pm2-runtime", "start", "pm2.json"]
