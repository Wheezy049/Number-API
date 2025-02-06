const express = require('express');
const axios = require('axios');

const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Added OPTIONS method
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS pre-flight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Helper functions
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const isPerfect = (num) => {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
};

const isArmstrong = (num) => {
    const digits = num.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
    return sum === num;
};

const getDigitSum = (num) => {
    return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
};

// Number Classification Endpoint
app.get('/api/classify-number', async (req, res) => {
    const number = req.query.number;

    // Validate the number
    if (!number) {
        return res.status(400).json({
            error: true,
            message: 'Missing parameter: Please provide a valid number.'
        });
    }

    if (isNaN(number) || isNaN(parseInt(number))) {
        return res.status(400).json({
            error: true,
            message: 'Invalid input: Please provide a valid numeric value.'
        });
    }

    const parsedNumber = parseInt(number);

    if (parsedNumber <= 0) {
        return res.status(400).json({
            error: true,
            message: 'Invalid input: Number must be a positive integer.'
        });
    }

    // Get fun fact from Numbers API
    const url = `http://numbersapi.com/${parsedNumber}?json`;
    let funFact = '';

    try {
        const response = await axios.get(url);
        funFact = response.data.text;
    } catch (error) {
        console.error('Error fetching fun fact:', error);
        funFact = 'No fun fact available';
    }

    // Classify number properties
    const properties = [];
    if (isArmstrong(parsedNumber)) properties.push('armstrong');
    if (isPrime(parsedNumber)) properties.push('prime');
    if (isPerfect(parsedNumber)) properties.push('perfect');
    if (parsedNumber % 2 === 0) properties.push('even');
    else properties.push('odd');

    const digitSum = getDigitSum(parsedNumber);

    // Return response
    res.status(200).json({
        number: parsedNumber,
        is_prime: isPrime(parsedNumber),
        is_perfect: isPerfect(parsedNumber),
        properties: properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});

// Default Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: true,
        message: 'Internal Server Error'
    });
});

// Add this at the end of the file to make the app listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the Express app as a serverless function
module.exports = app;
