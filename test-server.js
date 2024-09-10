// test-server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Netlify!' });
});

module.exports.handler = serverless(app);

// Start the server locally
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
