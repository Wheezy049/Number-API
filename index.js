const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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
    const number = parseInt(req.query.number);
    
    if (isNaN(number)) {
        return res.status(400).json({
            number: req.query.number,
            error: true
        });
    }

    // Get the fun fact about the number from Numbers API
    const url = `http://numbersapi.com/${number}?json`;
    let funFact = '';

    try {
        const response = await axios.get(url);
        funFact = response.data.text;
    } catch (error) {
        funFact = 'No fun fact available';
    }

    // Classify number properties
    const properties = [];
    if (isArmstrong(number)) properties.push('armstrong');
    if (isPrime(number)) properties.push('prime');
    if (isPerfect(number)) properties.push('perfect');
    if (number % 2 === 0) properties.push('even');
    else properties.push('odd');

    const digitSum = getDigitSum(number);

    // Return the JSON response
    res.status(200).json({
        number: number,
        is_prime: isPrime(number),
        is_perfect: isPerfect(number),
        properties: properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Number Classification API running at http://localhost:${port}`);
});


module.exports = app;