# Number Classification API

This API accepts a number and returns its mathematical properties along with a fun fact.

## Features
- Checks if a number is **Prime, Perfect, Armstrong, Even, or Odd**.
- Calculates the **sum of its digits**.
- Fetches a **fun fact** about the number from the Numbers API.

## Technology Stack
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Hosting**: Render

## Deployment
This API is deployed and publicly accessible at:

🔗 **Live URL:** [https://number-api-zxvm.onrender.com/](https://number-api-zxvm.onrender.com/)

To test the API, simply send a `GET` request to the URL.

## API Endpoint

### **GET /api/classify-number?number={number}**
Accepts a number as a query parameter and returns JSON with its classification.

## **Usage**
You can test the API using:

### **Browser**
Open the URL in your browser:

https://number-api-zxvm.onrender.com/api/classify-number?number=371


### **cURL**
Run the following command in your terminal:
```bash
curl -X GET "https://number-api-zxvm.onrender.com/api/classify-number?number=371"


### Example Request:
```bash
GET /api/classify-number?number=371

### Example Response
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

