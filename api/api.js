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

api.use(helmet());
api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));
api.use(morgan('combined'));
api.use(Sentry.Handlers.requestHandler());
api.use(Sentry.Handlers.errorHandler());
api.set('secret', process.env.SECRET);

api.post('/', (req, res) => {
});

// retrieve locaiton records
api.get('/locations/:id', (req, res) => {
  pool.connect((err, client, done) => {
    // handle errors
    if (err) {
      done();
      console.log(err);
    }

    client.query('SELECT * FROM locations WHERE id = $1;', [req.params.id], (err, result) => {
      done()
      if (err) {
        console.log(err.stack);
        return res.status(500).json({success: false, data: err});
      } else {
        console.log(result.rows);
        return res.send(result.rows);
      }
    });
  });
});

api.listen(port, () => {
  console.log(`api engine listening on port ${port}`);
});

api.post('/authenticate', (req, res) => {

});
