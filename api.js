require('dotenv').config();
const express = require('express');
const api = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 3000;

api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: false}));

api.listen(port, () => {
  console.log(`api engine listening on port ${port}`);
});
