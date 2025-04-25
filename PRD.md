# **PRD: Env Var Hosting Service Demo (v0.1)**

**Version:** 0.1.1 (Updated based on Docs Review)
**Date:** 2025-04-25
**Status:** Draft

## **1. Purpose**

- **Problem:** Developers face risks managing `.env` files (accidental commits, insecure sharing, incorrect environment assignment).
- **Goal (v0.1):** Validate the technical feasibility of a centralized environment variable service using NodeJS/Express and Permit.io for access control via a simple API. Showcase Permit.io's role-based access control for different environments (Dev/Staging/Prod). Serve as a personal utility for the creator.
- **Target Audience (Demo):** Permit.io team.
- **High-Level Architecture:** A NodeJS/Express backend API exposes a single endpoint. This endpoint receives an environment level request, extracts a user API key from headers, uses the Permit.io SDK (`permit.check()`) to authorize access based on manually pre-configured roles/permissions, and returns hardcoded environment variables from a configuration file if access is granted.
- **Key Assumptions:**
    - Manual configuration of users, roles (Dev, Staging, Prod), resources (`env:dev`, `env:staging`, `env:prod`), and permissions (`read`) is performed directly within the Permit.io dashboard.
    - **[UPDATED]** For the `permit.check(user, action, resource)` call, the value of the API key provided in the `X-API-Key` header will be used as the unique `user` identifier (the `user_key`). This requires manually creating users in the Permit.io dashboard whose `key` matches the API keys distributed to clients.
- **Key Risks (v0.1):**
    - **Security:** API keys are sent in headers; assumes HTTPS protection in any non-local deployment to prevent interception. Hardcoded keys/secrets in config are acceptable for demo scope only.
    - **Scalability:** Hardcoded variables in `config.js` do not scale; this is acceptable for the MVP demo's validation goal.
    - **Maintainability:** Lack of automated tests (explicitly skipped for v0.1) increases the risk of regressions if the codebase evolves.

## **2. Context**

This PRD is based on the project brief provided on 2025-04-25, including clarifications regarding the technology stack (NodeJS/Express), storage configuration (`config.js`), user identification (API key value used as user_key), manual Permit.io setup, and scope limitations (no automated tests, user handles deployment). **Updated based on documentation review on 2025-04-25.**

## **3. Story (Task) List**

- **Epic 1: Core Service Setup**
    - **Story 1.0: Initial Project Setup**
        - *Subtask 1.0.1:* Initialize NodeJS project (`npm init -y`).
        - *Subtask 1.0.2:* Install required dependencies (`npm install express permitio dotenv`). `dotenv` can manage the Permit.io SDK API key.
        - *Subtask 1.0.3:* Set up basic Express server structure (e.g., `server.js` or `app.js`) with a basic health check endpoint (e.g., `/`).
        - *Subtask 1.0.4:* Create `config.js` file to store environment variables.
        - *Subtask 1.0.5:* Populate `config.js` exporting an object with sample key-value pairs for `dev`, `staging`, and `prod` environments.
        JavaScript
            
            `// Example config.js
            module.exports = {
              dev: { DB_HOST: 'dev.db.local', API_KEY: 'dev123' },
              staging: { DB_HOST: 'staging.db.internal', API_KEY: 'staging456' },
              prod: { DB_HOST: 'prod.db.public', API_KEY: 'prod789' }
            };`
            
        - *Subtask 1.0.6:* Configure Permit.io SDK initialization in the main server file, likely reading the Permit.io API key from environment variables (`.env` file managed by `dotenv`).
- **Epic 2: API Endpoint Implementation**
    - **Story 2.1: Implement GET /getEnv/:environment_level Endpoint**
        - *Subtask 2.1.1:* Define the Express route: `router.get('/getEnv/:environment_level', ...)`.
        - *Subtask 2.1.2:* Extract `environment_level` parameter from `req.params`.
        - *Subtask 2.1.3:* Extract API Key from request headers (e.g., `req.headers['x-api-key']`). Define `X-API-Key` as the standard header.
        - *Subtask 2.1.4:* Validate `environment_level`. It must be exactly 'dev', 'staging', or 'prod'. If invalid, return 400 Bad Request with an error message.
        - *Subtask 2.1.5:* Check for the presence of the `X-API-Key` header. If missing, return 401 Unauthorized/403 Forbidden with an error message.
        - *Subtask 2.1.6:* Construct the Permit.io resource key string: `env:${environment_level}`.
        - *Subtask 2.1.7:* Call `permit.check(apiKey, 'read', resourceKey)`. **[UPDATED] Note:** The `apiKey` variable (containing the value from the `X-API-Key` header) is passed as the `user` argument here, based on the assumption that users have been manually created in Permit.io with keys matching these API key values.
        - *Subtask 2.1.8:* Handle the boolean result from `permit.check()`:
            - If `true` (allowed): Retrieve the corresponding environment variables object from `config.js` based on `environment_level`. Return 200 OK with the variables object as the JSON response body.
            - If `false` (denied): Return 403 Forbidden with an error message.
        - *Subtask 2.1.9:* Implement basic error handling for the `permit.check()` call (e.g., network issues, SDK errors). Return 500 Internal Server Error with a generic error message.
- **Epic 3: Demonstration**
    - **Story 3.1: Create Demonstration Script/Commands**
        - *Subtask 3.1.1:* Document example `curl` commands demonstrating successful retrieval for 'dev', 'staging', and 'prod' environments, using different `X-API-Key` headers corresponding to users with appropriate roles manually configured in Permit.io.
        - *Subtask 3.1.2:* Document an example `curl` command showing a denied request (e.g., using an API key associated with the 'Dev' role trying to access `env:prod`).

## **4. Testing Strategy**

Automated testing (unit, integration) is explicitly **out of scope** for v0.1.
Verification will be performed manually using `curl` commands or equivalent API clients as outlined in Story 3.1.

## **5. UX/UI**

This service is API-only for v0.1.

**API Endpoint:** `GET /getEnv/:environment_level`

- **Description:** Retrieves environment variables for a specified level (`dev`, `staging`, `prod`) if the user (identified by API key) has permission.
- **Path Parameter:**
    - `environment_level` (string, required): The target environment. Must be one of: `dev`, `staging`, `prod`.
- **Request Headers:**
    - `X-API-Key` (string, required): The API key identifying the client user. **[UPDATED] Assumption:** The *value* of this key must correspond to a `user_key` manually created in Permit.io, and that user must be assigned the appropriate role (e.g., 'Dev', 'Staging', 'Prod') in Permit.io.
- **Responses:**
    - **`200 OK`**: Access granted.
        - `Content-Type: application/json`
        - Body: `object` - Key-value pairs of environment variables for the requested level.
        JSON
            
            `// Example for GET /getEnv/dev
            {
              "DB_HOST": "dev.db.local",
              "API_KEY": "dev123"
            }`
            
    - **`400 Bad Request`**: Invalid `environment_level` provided.
        - `Content-Type: application/json`
        - Body: `object` - `{ "error": "Invalid environment level specified. Use 'dev', 'staging', or 'prod'." }`
    - **`401 Unauthorized` / `403 Forbidden`**: `X-API-Key` header missing or invalid format (distinction may depend on implementation detail, 401 is often preferred for missing credentials).
        - `Content-Type: application/json`
        - Body: `object` - `{ "error": "API Key required." }`
    - **`403 Forbidden`**: Access denied by Permit.io authorization check.
        - `Content-Type: application/json`
        - Body: `object` - `{ "error": "Access Denied." }`
    - **`500 Internal Server Error`**: An unexpected error occurred on the server (e.g., Permit.io SDK failure, configuration error).
        - `Content-Type: application/json`
        - Body: `object` - `{ "error": "Internal server error." }`

## **6. Tech Stack**

| Category | Technology / Library | Version (Recommendation) | Details / Purpose |
| --- | --- | --- | --- |
| Language | NodeJS | LTS (e.g., 20.x) | Runtime Environment |
| Web Framework | Express | 4.x | API routing and handling |
| Authorization | Permit.io SDK | Latest (`permitio`) | Interface with Permit.io for permission checks |
| Config Mgmt | NodeJS Module | N/A | `config.js` for hardcoded env vars |
| Env Var Mgmt | `dotenv` | Latest | Loading Permit.io SDK key from `.env` file securely |
| API Testing Tool | `curl` / Postman | N/A | Manual verification |

Export to Sheets

**High-Level Component Flow:**

Code snippet

`sequenceDiagram
    participant Client as API Client (curl/script)
    participant Server as Express App (NodeJS)
    participant Config as config.js
    participant Permit as Permit.io SDK

    Client->>+Server: GET /getEnv/{level} (Header: X-API-Key: clientApiKey)
    Server->>Server: Extract level & clientApiKey
    Server->>Server: Validate level & Key presence
    alt Invalid Input
        Server-->>-Client: 400 or 401/403 Response
    else Valid Input
        %% [UPDATED] Explicitly use clientApiKey as user identifier for the check
        Server->>Permit: permit.check(clientApiKey, 'read', 'env:{level}')
        Permit-->>+Server: Boolean (allowed/denied)
        alt Access Denied
            Server-->>-Client: 403 Forbidden Response
        else Access Granted
            Server->>+Config: Get variables for {level}
            Config-->>-Server: Return variable object
            Server-->>-Client: 200 OK Response (JSON variables)
        end
    end`

**Suggested Project Directory Structure:**

`env-share-demo/
├── node_modules/
├── .env               # Stores PERMIT_API_KEY (added to .gitignore)
├── .gitignore
├── config.js          # Hardcoded environment variables
├── package.json
├── package-lock.json
└── server.js          # Express app setup, routes, Permit.io logic`

## **7. Out of Scope (Post MVP v0.1)**

- UI for managing users, roles, permissions, or environment variables.
- Client-side SDK / Library (e.g., "EnvShare library").
- User management functionality within the service itself (creation, deletion, role assignment via API).
- Advanced Permit.io features (Attribute-Based Access Control - ABAC, Relationship-Based Access Control - ReBAC, Condition Sets, etc.).
- Environment variable versioning or history.
- Audit trails for variable access.
- Encryption-at-rest for stored variables (beyond demo scope).
- Automated testing framework setup (Unit, Integration, E2E).
- Deployment strategy and infrastructure setup.
- Database integration for storing variables or user data.