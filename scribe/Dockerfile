FROM keymetrics/pm2:10-alpine

WORKDIR /usr/src/app
COPY . .

RUN yarn install

CMD [ "pm2-runtime", "start", "scribe_process.json" ]
