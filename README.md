# Chitkara Qualifier - BFHL API

Express.js API deployed on Vercel for the Chitkara Qualifier assessment.

## 🔗 Live Deployment

**Vercel URL**: [https://chitkara-qualifier-nine.vercel.app](https://chitkara-qualifier-nine.vercel.app)

---

## 📌 API Endpoints

### 1. Health Check (GET)

**URL**: `https://chitkara-qualifier-nine.vercel.app/health`

**Method**: `GET`

**Response**:
```json
{
  "is_success": true,
  "official_email": "drishti0415.be23@chitkara.edu.in"
}
```

---

### 2. BFHL Main Endpoint (POST)

**URL**: `https://chitkara-qualifier-nine.vercel.app/bfhl`

**Method**: `POST`

**Headers**: 
```
Content-Type: application/json
```

---

## 🧪 Test Cases

### Test Case 1: Fibonacci Sequence

**Request**:
```json
POST /bfhl
{
  "fibonacci": 5
}
```

**Response**:
```json
{
  "is_success": true,
  "official_email": "drishti0415.be23@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3]
}
```

---

### Test Case 2: Prime Numbers Filter

**Request**:
```json
POST /bfhl
{
  "prime": [2, 7, 11, 15, 20]
}
```

**Response**:
```json
{
  "is_success": true,
  "official_email": "drishti0415.be23@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

---

### Test Case 3: LCM Calculation

**Request**:
```json
POST /bfhl
{
  "lcm": [4, 6]
}
```

**Response**:
```json
{
  "is_success": true,
  "official_email": "drishti0415.be23@chitkara.edu.in",
  "data": 12
}
```

---

### Test Case 4: HCF/GCD Calculation

**Request**:
```json
POST /bfhl
{
  "hcf": [12, 18, 24]
}
```

**Response**:
```json
{
  "is_success": true,
  "official_email": "drishti0415.be23@chitkara.edu.in",
  "data": 6
}
```

---

### Test Case 5: AI Question

**Request**:
```json
POST /bfhl
{
  "AI": "What is the capital of Maharashtra?"
}
```

**Response**:
```json
{
  "is_success": true,
  "official_email": "drishti0415.be23@chitkara.edu.in",
  "data": "Mumbai"
}
```

**Supported AI Questions**:
- "What is the capital of Maharashtra?" → "Mumbai"
- "What is the capital of India?" → "Delhi"
- "What color is the sky?" → "Blue"
- "What is the largest ocean?" → "Pacific"
- Other questions → "Unknown"

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Deployment**: Vercel
- **Dependencies**: axios, dotenv, cors

---

## 📂 Project Structure

```
chitkara-qualifier/
│── api/
│   └── index.js       # Main API file
│── package.json       # Dependencies
│── vercel.json        # Vercel configuration
│── .gitignore         # Git ignore rules
└── README.md          # Documentation
```

---

## 🚀 Local Development

1. Clone the repository:
```bash
git clone https://github.com/Drishti-Singla/chitkara-qualifier.git
cd chitkara-qualifier
```

2. Install dependencies:
```bash
npm install
```

3. Run locally:
```bash
npm start
```

4. Test locally:
```
http://localhost:3000/health
http://localhost:3000/bfhl
```

---

## 📧 Contact

**Email**: drishti0415.be23@chitkara.edu.in

---

## ✅ Deployment Status

- ✅ Deployed on Vercel
- ✅ All endpoints working
- ✅ Health check active
- ✅ BFHL API functional
