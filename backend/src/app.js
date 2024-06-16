const express = require('express');
const dotenv = require('dotenv');
const rdfRoutes = require('./routes/rdfRoutes');
const cors = require('cors');


// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Additional middleware
app.use(cors());

// Static file serving (optional, if you need to serve static files)
app.use(express.static('public'));

// Routes
app.use('/api/rdf', rdfRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

module.exports = app;
