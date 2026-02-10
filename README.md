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

