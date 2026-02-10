require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const OFFICIAL_EMAIL = "drishti0415.be23@chitkara.edu.in";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("Gemini key loaded:", GEMINI_API_KEY ? "YES" : "NO");

// ---------- HELPERS ----------

// Prime check
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

// ---------- AI FUNCTION (THIS IS THE MODEL LINE YOU WERE ASKING ABOUT) ----------

const aiAnswer = async (question) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          { text: `Answer in one word only: ${question}` }
        ]
      }
    ]
  };

  const response = await axios.post(url, body);
  return response.data.candidates[0].content.parts[0].text.trim();
};

// ---------- ROUTES ----------

// Health check
app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// BFHL main route
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: fibonacci(body.fibonacci)
      });
    }

    if (body.prime !== undefined) {
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: body.prime.filter(isPrime)
      });
    }

    if (body.lcm !== undefined) {
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: lcmArray(body.lcm)
      });
    }

    if (body.hcf !== undefined) {
      return res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: hcfArray(body.hcf)
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
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL
    });
  }
});

// ---------- EXPORT FOR VERCEL ----------
module.exports = app;
