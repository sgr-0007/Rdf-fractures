const express = require('express');
const cors = require('cors');
const familyHistoryRoutes = require('./routes/familyHistoryRoutes');

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Additional middleware
app.use(cors());

// Static file serving (optional, if you need to serve static files)
app.use(express.static('public'));

// Routes
app.use('/api/familyhistory', familyHistoryRoutes);

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
