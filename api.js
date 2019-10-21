require('dotenv').config();
const express = require('express');
const api = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 3000;

api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));

api.post('/', (req, res) => {
  return res.send('received a POST HTTP method');
});

api.post('/:payload', (req, res) => {
  return res.send(`the payload: ${req.params.payload}`);
});

api.listen(port, () => {
  console.log(`api engine listening on port ${port}`);
});
