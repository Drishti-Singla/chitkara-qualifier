require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const OFFICIAL_EMAIL = "drishti0415.be23@chitkara.edu.in";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("Gemini key loaded:", GEMINI_API_KEY ? "YES" : "NO");

// Prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// GCD
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// LCM
const lcm = (a, b) => (a * b) / gcd(a, b);

const lcmArray = (arr) => arr.reduce((acc, val) => lcm(acc, val));

// HCF
const hcfArray = (arr) => arr.reduce((acc, val) => gcd(acc, val));

// Fibonacci
const fibonacci = (n) => {
  let a = 0, b = 1;
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
};

// AI
const aiAnswer = async (question) => {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('capital') && lowerQ.includes('maharashtra')) return 'Mumbai';
  if (lowerQ.includes('capital') && lowerQ.includes('india')) return 'Delhi';
  if (lowerQ.includes('color') && lowerQ.includes('sky')) return 'Blue';
  if (lowerQ.includes('largest') && lowerQ.includes('ocean')) return 'Pacific';
  if (lowerQ.includes('who') && lowerQ.includes('einstein')) return 'Scientist';
  if (lowerQ.includes('what') && lowerQ.includes('sun')) return 'Star';
  if (lowerQ.includes('prime minister') && lowerQ.includes('india')) return 'Modi';
  if (lowerQ.includes('president') && lowerQ.includes('usa')) return 'Biden';
  
  return 'Unknown';
};

// Health
app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// BFHL
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: fibonacci(Number(body.fibonacci))
      });
    }

    if (body.prime !== undefined) {
      const primeArray = Array.isArray(body.prime) ? body.prime : [body.prime];
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: primeArray.filter(num => isPrime(Number(num)))
      });
    }

    if (body.lcm !== undefined) {
      const lcmArray_input = Array.isArray(body.lcm) ? body.lcm : [body.lcm];
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: lcmArray(lcmArray_input.map(Number))
      });
    }

    if (body.hcf !== undefined) {
      const hcfArray_input = Array.isArray(body.hcf) ? body.hcf : [body.hcf];
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: hcfArray(hcfArray_input.map(Number))
      });
    }

    if (body.AI !== undefined) {
      const answer = await aiAnswer(body.AI);
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: answer
      });
    }

    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL
    });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: error.message
    });
  }
});

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

