FROM keymetrics/pm2:10-stretch

WORKDIR /usr/src/app
COPY . .

RUN yarn install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.3.0/wait /wait
RUN chmod +x /wait

CMD [ "/wait", "pm2-runtime", "start", "scribe_process.json" ]
