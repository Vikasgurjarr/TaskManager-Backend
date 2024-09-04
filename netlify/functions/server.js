const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
  res.send('Simple Express Function!');
});

module.exports.handler = serverless(app);
