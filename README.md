# Env Var Hosting Service Demo (v0.1)

A demo backend service to securely serve environment variables by environment level (dev, staging, prod) using NodeJS/Express and Permit.io for access control.

## Features
- Single API endpoint: `GET /getEnv/:environment_level`
- Access controlled by Permit.io roles and permissions
- Hardcoded environment variables for demo purposes
- Simple health check at `/`

## Quick Start

### 1. Install dependencies
```sh
npm install
```

### 2. Set up environment variables
Create a `.env` file:
```
PERMIT_API_KEY=dummy-key
# Optionally: PERMIT_PDP_URL=https://your-pdp-url
```

### 3. Start the server
```sh
node server.js
```

### 4. Test the API
See [demo-commands.md](./demo-commands.md) for curl and PowerShell usage examples.

## API Reference

### `GET /getEnv/:environment_level`
- **Headers:** `X-API-Key: <user_key>`
- **Params:** `environment_level` = `dev` | `staging` | `prod`
- **Responses:**
  - `200 OK`: Returns environment variables object
  - `400 Bad Request`: Invalid environment level
  - `401 Unauthorized`: Missing API key
  - `403 Forbidden`: Access denied by Permit.io
  - `500 Internal Server Error`: Unexpected server or configuration error

## Project Structure
```
.
├── config.js         # Hardcoded env variables
├── server.js         # Express app & API logic
├── .env              # Permit.io API key (not checked in)
├── .gitignore
├── package.json
├── demo-commands.md  # API usage examples
└── README.md
```

## Permit.io Setup (Demo Assumptions)
- Users, roles, and permissions are manually configured in the Permit.io dashboard.
- API keys are mapped to users (`user_key`) in Permit.io.
- Roles: `Developer`, `Manager`, `Director` with `read` permission to resources `envdev`, `envstaging`, `envprod`.

## Out of Scope
- UI for managing users/roles/permissions
- Client SDK
- Automated testing, deployment automation, or database integration

## License
MIT
