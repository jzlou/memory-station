FROM node:12-alpine

WORKDIR /opt/memory-station

COPY package*.json ./
RUN yarn

COPY . .
COPY .env ./

EXPOSE 4251
CMD ["node", "api.js"]
