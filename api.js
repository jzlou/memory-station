require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const Influx = require('influx');
const helmet = require('helmet');
const ipfilter = require('express-ipfilter').IpFilter;

const api = express();
const port = process.env.PORT || 3000;
const influx = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST
})
const allowed_ips = [process.env.IP];

api.use(helmet());
api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));

// only allow certain IPs, configured by environment
api.use(ipfilter(allowed_ips, {mode: 'allow'}))

api.post('/', (req, res) => {
  influx.writePoints([ //TODO: write the point from request
    {
      measurement: 'm',
      tags: {},
      fields {},
    }
  ]);
  // TODO: respond with the ts
  res.status(200).send(`successfully wrote data point with ts`);
  // TODO: handle bad requests
});

api.listen(port, () => {
  // TODO: handle rejected IPs
  console.log(`api engine listening on port ${port}`);
});
