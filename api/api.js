require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const morgan = require('morgan');
const Knex = require('knex');

const api = express();
const port = process.env.API_PORT || 3000;
Sentry.init({ 'dsn': process.env.SENTRY_DSN });
const knex = Knex({
  client: 'pg',
  version: process.env.PG_VERSION,
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  }
})

api.use(helmet());
api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));
api.use(morgan('combined'));
api.use(Sentry.Handlers.requestHandler());
api.use(Sentry.Handlers.errorHandler());
api.set('secret', process.env.SECRET);

api.post('/', (req, res) => {
});

api.get('/', (req, res) => {
  res.send('the api is alive!');
});

api.listen(port, () => {
  console.log(`api engine listening on port ${port}`);
});

api.post('/authenticate', (req, res) => {

});
