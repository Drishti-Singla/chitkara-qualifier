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
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: question
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 10,
        temperature: 0.1
      }
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000
    });

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error("Full AI response:", JSON.stringify(response.data, null, 2));
      throw new Error("Invalid AI response structure");
    }
    
    return text.trim();
  } catch (error) {
    if (error.response) {
      console.error("AI API Error:", error.response.status);
      console.error("Error details:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("AI Error:", error.message);
    }
    throw error;
  }
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
      try {
        const answer = await aiAnswer(body.AI);
        return res.json({
          is_success: true,
          official_email: OFFICIAL_EMAIL,
          data: answer
        });
      } catch (aiError) {
        console.error("AI failed, returning fallback:", aiError.message);
        return res.json({
          is_success: true,
          official_email: OFFICIAL_EMAIL,
          data: "Unable to process AI request"
        });
      }
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

// ---------- EXPORT FOR VERCEL ----------
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

