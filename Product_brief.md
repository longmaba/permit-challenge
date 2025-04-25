## Project Brief: Env Var Hosting Service Demo (v0.1)

**1. Problem Definition (P):**

- Developers face security risks when managing `.env` files, such as accidental commits to version control or insecure sharing methods.
- There's a risk of providing incorrect environment variables (e.g., staging keys to a junior dev needing development keys), leading to errors or security issues.
- This service aims to provide a centralized, secure, and permission-controlled alternative for accessing environment variables.

**2. Goal Definition (G - Demo Specific):**

- **Validate Technical Approach:** Prove the feasibility of hosting environment variables centrally and using Permit.io for access control via a simple API.
- **Showcase Permit.io Integration:** Clearly demonstrate how Permit.io roles and permission checks can effectively manage access to different environment levels (Dev/Staging/Prod).
- **Personal Utility:** Create a functional backend service that can serve as a useful tool for the creator's own development workflow.

**3. Audience Definition (A - Demo Specific):**

- **Primary:** Permit.io team - To showcase an effective and relevant use case for their product.

**4. Feature Concept (F - High Level):**

- A service backend that stores environment variables.
- An API/library interface for developers to fetch environment variables programmatically.
- Integration with Permit.io to enforce access permissions based on user roles and requested environment level.

**5. MVP Scope - In Scope (Σin):**

- **Backend API Endpoint:** A single endpoint (e.g., `/getEnv/{environment_level}`) built with Express. This endpoint will receive the target environment level (Dev, Staging, Prod) and identify the user (e.g., via an API key passed in headers).
- **Permit.io Integration:**
    - The endpoint will call `permit.check()`.
    - Predefined resources in Permit.io: `env:dev`, `env:staging`, `env:prod`.
    - Predefined roles in Permit.io: `Dev`, `Staging`, `Prod` (or similar), with `read` permission granted to the corresponding resource (e.g., `Dev` role can read `env:dev`).
    - *Assumption:* User setup (assigning Dev/Staging/Prod roles) and API key mapping will be done manually in Permit.io for the demo.
- **Simple Env Var Storage:** Backend storage for a few key-value pairs for each environment level (can be hardcoded in the Express app initially).
- **Demonstration Method:** A simple script (e.g.,  equests) or `curl` command showing how to call the API endpoint with an API key and environment level to retrieve variables (or get denied).

**6. MVP Scope - Out of Scope (Σout):**

- No UI for managing users, roles, permissions, or environment variables.
- No client-side SDK (`EnvShare` library).
- No user management functionality within the service itself.
- No advanced Permit.io features (ABAC, ReBAC, Condition Sets, etc.).
- No environment variable versioning, audit trails, or encryption-at-rest details.

**7. Tech Leanings (T):**

- **Backend:** NodeJS with Express.