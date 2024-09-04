const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Your Express app setup
app.get('/', (req, res) => {
  res.send('Hello from Netlify!');
});

module.exports.handler = serverless(app);
