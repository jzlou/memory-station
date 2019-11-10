require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const Influx = require('influx');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const morgan = require('morgan');

const api = express();
const port = process.env.API_PORT || 3000;
const influx = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST
})
const allowed_ips = [process.env.IP];
Sentry.init({ 'dsn': process.env.SENTRY_DSN });

api.use(helmet());
api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));
api.use(morgan('combined'));
api.use(Sentry.Handlers.requestHandler());
api.use(Sentry.Handlers.errorHandler());
api.set('secret', process.env.SECRET);

api.post('/', (req, res) => {
  influx.writePoints([
    {
      measurement: req.body.measurement,
      tags: req.body.tags,
      fields: req.body.fields,
      timestamp: req.body.timestamp
    }
  ]).catch(
    error => {
      setTimeout(() => { throw error; });
    }
  );
  res.status(200).send(
    `successfully wrote data point with ts ${req.body.timestamp}`
  );
});

api.get('/', (req, res) => {
  res.send('the api is alive!');
});

api.listen(port, () => {
  console.log(`api engine listening on port ${port}`);
});

api.post('/authenticate', (req, res) => {

});
