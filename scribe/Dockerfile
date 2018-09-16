FROM keymetrics/pm2:10-stretch

WORKDIR /usr/src/app
COPY . .

RUN yarn install

ADD https://raw.githubusercontent.com/ufoscout/docker-compose-wait/1.0.0/wait.sh wait.sh
RUN chmod +x wait.sh
RUN apt-get update && apt-get install -y netcat

CMD ./wait.sh && pm2-runtime process.json
