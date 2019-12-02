require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const morgan = require('morgan');
const { Pool } = require('pg');

const api = express();
const port = process.env.API_PORT || 3000;
Sentry.init({ 'dsn': process.env.SENTRY_DSN });
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION
})
pool.on('error', (err, client) => {
  console.error('unexpected error on idle client', err);
  process.exit(-1);
});

api.use(helmet());
api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));
api.use(morgan('combined'));
api.use(Sentry.Handlers.requestHandler());
api.use(Sentry.Handlers.errorHandler());
api.set('secret', process.env.SECRET);

api.post('/', (req, res) => {
});

// retrieve location records
api.get('/locations/:id', (req, res) => {
  pool.query('SELECT * FROM locations WHERE id = $1;', [req.params.id], (err, result) => {
    if (err) {
      console.error(err.stack);
      return res.status(500).json({success: false, data: err});
    } else {
      console.log(result.rows);
      return res.send(result.rows);
    }
  });
});

api.listen(port, () => {
  console.log(`api engine listening on port ${port}`);
});

api.post('/authenticate', (req, res) => {

});
