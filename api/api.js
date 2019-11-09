require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const Influx = require('influx');
const helmet = require('helmet');
const ipfilter = require('express-ipfilter').IpFilter;
const IpDeniedError = require('express-ipfilter').IpDeniedError;
const Sentry = require('@sentry/node');
// TODO: import sentry

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

// only allow certain IPs, configured by environment
api.use(ipfilter(
  ['::ffff:127.0.0.1'].push(allowed_ips), {mode: 'allow'})
);
api.use( (err, req, res, _next) => {
  if (err instanceof IpDeniedError) {
    res.status(401).send(`ip denied`)
  }
});

api.post('/', (req, res) => {
  influx.writePoints([
    {
      measurement: req.body.measurement,
      tags: req.body.tags,
      fields: req.body.fields,
      timestamp: req.body.timestamp
    }
  ]).catch(error => console.log({error}));
  res.status(200).send(
    `successfully wrote data point with ts ${req.body.timestamp}`
  );
  // TODO: handle bad requests
});

api.listen(port, () => {
  // TODO: handle rejected IPs
  console.log(`api engine listening on port ${port}`);
});
