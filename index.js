const express = require('express');
const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    next();
});

// Function to check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
    if (num < 1) return false;
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split('');
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
    return sum === num;
};

// Function to calculate the sum of digits
const digitSum = (num) => {
    return Math.abs(num)
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit), 0);
};

// API endpoint for classifying numbers
app.get('/api/classify-number', (req, res) => {
    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ error: true, number: '' });
    }

    const parsedNumber = parseFloat(number);
    
    if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: true, number });
    }

    let classification = 'unknown';
    if (parsedNumber > 0) {
        classification = 'positive';
    } else if (parsedNumber < 0) {
        classification = 'negative';
    } else {
        classification = 'zero';
    }

    // Determine number properties
    let properties = [];
    if (isArmstrong(parsedNumber)) properties.push('armstrong');
    if (parsedNumber % 2 === 0) properties.push('even');
    else properties.push('odd');
    if (isPrime(parsedNumber)) properties.push('prime');
    if (isPerfect(parsedNumber)) properties.push('perfect');

    res.json({
        number: parsedNumber,
        classification,
        is_prime: isPrime(parsedNumber),
        is_perfect: isPerfect(parsedNumber),
        properties,
        digit_sum: digitSum(parsedNumber),
    });
});

// Start the server (for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
