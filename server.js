// server.js
/**
 * Express server for Env Var Hosting Service Demo (v0.1)
 * - Provides a single endpoint for fetching environment variables by level
 * - Integrates with Permit.io for access control
 */
const express = require('express');
const dotenv = require('dotenv');
const { Permit } = require('permitio');
const config = require('./config');
const jwt = require('jsonwebtoken');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Secret for signing JWTs (in production, store securely!)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Initialize Permit.io SDK
const permit = new Permit({
  // in production, you might need to change this url to fit your deployment
  pdp: 'https://cloudpdp.api.permit.io',
  // your api key
  token: process.env.PERMIT_API_KEY,
});

// Utility: Encode API key as JWT
function encodeApiKey(apiKey) {
  return jwt.sign({ apiKey }, JWT_SECRET, { expiresIn: '24h' });
}

// Utility: Decode JWT to extract API key
function decodeApiKey(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.apiKey;
  } catch (err) {
    return null;
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Env Var Hosting Service Demo running.' });
});

// Main API endpoint: GET /getEnv/:environment_level
/**
 * Returns environment variables for the requested environment level if authorized via Permit.io.
 * Requires X-API-Key header. Valid levels: dev, staging, prod.
 *
 * Accepts either a raw API key or a JWT-encoded API key in the X-API-Key header.
 */
app.get('/getEnv/:environment_level', async (req, res) => {
  const { environment_level } = req.params;
  let apiKey = req.header('X-API-Key');

  // Try to decode as JWT, fallback to raw key
  let decodedKey = decodeApiKey(apiKey);
  if (decodedKey) {
    apiKey = decodedKey;
  }

  // Validate environment_level
  const validLevels = ['dev', 'staging', 'prod'];
  if (!validLevels.includes(environment_level)) {
    return res.status(400).json({ error: "Invalid environment level specified. Use 'dev', 'staging', or 'prod'." });
  }

  // Validate API key
  if (!apiKey || typeof apiKey !== 'string') {
    return res.status(401).json({ error: 'API Key required.' });
  }

  try {
    // Authorize via Permit.io
    const allowed = await permit.check(apiKey, 'read', `env${environment_level}`);
    if (!allowed) {
      return res.status(403).json({ error: 'Access Denied.' });
    }
    // Return environment variables
    const envVars = config[environment_level];
    if (!envVars) {
      return res.status(500).json({ error: 'Server configuration error.' });
    }
    return res.json(envVars);
  } catch (err) {
    console.error('Permit.io error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Endpoint to encode an API key as JWT
app.post('/encodeApiKey', express.json(), (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== 'string') {
    return res.status(400).json({ error: 'API Key required in body.' });
  }
  const token = encodeApiKey(apiKey);
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
