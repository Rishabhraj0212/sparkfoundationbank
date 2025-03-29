const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Import your routes
try {
  const router = require('../router/router');
  app.use('/', router);
} catch (error) {
  console.error('Error loading router:', error);
  app.get('*', (req, res) => {
    res.status(500).send('Server configuration error');
  });
}

// Export the serverless handler
module.exports.handler = serverless(app); 