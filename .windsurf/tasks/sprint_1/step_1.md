# Sprint 1: Project Bootstrap & Core API

## Goal
Set up the NodeJS/Express project, environment variable configuration, and basic API skeleton.

## Tasks
- [ ] 1.0.1: Initialize NodeJS project (`npm init -y`)
- [ ] 1.0.2: Install dependencies (`npm install express permitio dotenv`)
- [ ] 1.0.3: Set up Express server structure (`server.js` with health check endpoint)
- [ ] 1.0.4: Create `config.js` for environment variables
- [ ] 1.0.5: Populate `config.js` with sample key-value pairs for `dev`, `staging`, and `prod`
- [ ] 1.0.6: Configure Permit.io SDK initialization (use `.env` for API key)
- [ ] 2.1.1: Define Express route
- [ ] 2.1.2: Extract `environment_level` from `req.params`
- [ ] 2.1.3: Validate `environment_level` value
- [ ] 2.1.4: Extract and validate `X-API-Key` from headers

## Definition of Done
- Project runs locally
- Health check endpoint responds
- Config file present with sample data
- Permit.io SDK initialized (API key can be dummy for now)
- Route and parameter extraction logic in place
