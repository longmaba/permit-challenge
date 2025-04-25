# Permit Challenge Agile Backlog

## Epics, Stories, and Tasks

### Epic 1: Core Service Setup
- **Story 1.0: Initial Project Setup**
  - [ ] 1.0.1: Initialize NodeJS project (`npm init -y`)
  - [ ] 1.0.2: Install dependencies (`npm install express permitio dotenv`)
  - [ ] 1.0.3: Set up Express server structure (`server.js` with health check endpoint)
  - [ ] 1.0.4: Create `config.js` for environment variables
  - [ ] 1.0.5: Populate `config.js` with sample key-value pairs for `dev`, `staging`, and `prod`
  - [ ] 1.0.6: Configure Permit.io SDK initialization (use `.env` for API key)

### Epic 2: API Endpoint Implementation
- **Story 2.1: Implement GET `/getEnv/:environment_level` Endpoint**
  - [ ] 2.1.1: Define Express route
  - [ ] 2.1.2: Extract `environment_level` from `req.params`
  - [ ] 2.1.3: Validate `environment_level` value
  - [ ] 2.1.4: Extract and validate `X-API-Key` from headers
  - [ ] 2.1.5: Call `permit.check(apiKey, 'read', 'env:{level}')`
  - [ ] 2.1.6: If authorized, return environment variables for the level
  - [ ] 2.1.7: If denied, return 403 Forbidden
  - [ ] 2.1.8: Handle missing/invalid API key (401/403)
  - [ ] 2.1.9: Implement error handling for Permit.io SDK/network issues (500)

### Epic 3: Demo & Documentation
- **Story 3.1: Demonstration Script/Commands**
  - [ ] 3.1.1: Write example `curl` commands for successful and denied access
  - [ ] 3.1.2: Document expected API responses (200, 400, 401/403, 500)
  - [ ] 3.1.3: Write README instructions for manual setup and testing

---

## Backlog / Out of Scope (for v0.1)
- UI for managing users, roles, permissions, or environment variables
- Client-side SDK/library
- User management APIs
- Advanced Permit.io features (ABAC, ReBAC, etc.)
- Environment variable versioning/history
- Automated testing, deployment automation, or database integration
