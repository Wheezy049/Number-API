// index.js or api/classify-number.js (depending on your setup)

// Required packages
const express = require('express');
const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
    // Set CORS headers for all incoming requests
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or replace * with your front-end URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS requests (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    next();
});

// API logic for classifying numbers
app.get('/api/classify-number', (req, res) => {
    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ error: 'Number parameter is missing' });
    }

    const parsedNumber = parseFloat(number);
    
    if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: 'Invalid input - non-numeric value' });
    }

    // Check if the number is positive, negative, or zero
    let classification = 'unknown';
    if (parsedNumber > 0) {
        classification = 'positive';
    } else if (parsedNumber < 0) {
        classification = 'negative';
    } else {
        classification = 'zero';
    }

    // Return classification result
    res.json({ number: parsedNumber, classification });
});

// Start the server (this would be used for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
