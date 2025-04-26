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

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Permit.io SDK
const permit = new Permit({
  // in production, you might need to change this url to fit your deployment
  pdp: 'https://cloudpdp.api.permit.io',
  // your api key
  token: process.env.PERMIT_API_KEY,
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Env Var Hosting Service Demo running.' });
});

// Main API endpoint: GET /getEnv/:environment_level
/**
 * Returns environment variables for the requested environment level if authorized via Permit.io.
 * Requires X-API-Key header. Valid levels: dev, staging, prod.
 */
app.get('/getEnv/:environment_level', async (req, res) => {
  const { environment_level } = req.params;
  const apiKey = req.header('X-API-Key');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
