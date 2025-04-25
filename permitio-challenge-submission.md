*This is a submission for the [Permit.io Authorization Challenge](https://dev.to/challenges/permit_io): API-First Authorization Reimagined*

## What I Built

I built an API-first, environment variable hosting service that demonstrates secure, role-based access to environment variables using Permit.io. The project solves the common problem of managing and sharing `.env` files in teams—preventing accidental leaks, insecure sharing, and misconfiguration—by centralizing environment variables behind a secure API. Access to each environment (dev, staging, prod) is strictly controlled by Permit.io roles and permissions, ensuring only authorized users can fetch the secrets they need.

## Demo

<!-- If you have a live deployment, insert the link here. Otherwise, use screenshots or a video. Example: -->

**Screenshots:**

- ![Health check endpoint](https://i.imgur.com/your_healthcheck_screenshot.png)
- ![Permit.io dashboard setup](https://i.imgur.com/your_permitio_dashboard.png)
- ![API access with curl](https://i.imgur.com/your_curl_demo.png)

**Sample API Usage:**
```sh
# Fetch dev environment variables as a Developer
curl -H "X-API-Key: dev1" http://localhost:3000/getEnv/dev

# Fetch staging environment variables as a Manager
curl -H "X-API-Key: manager1" http://localhost:3000/getEnv/staging

# Fetch prod environment variables as a Director
curl -H "X-API-Key: director1" http://localhost:3000/getEnv/prod
```
See more in [demo-commands.md](./demo-commands.md).

## Project Repo

[GitHub Repo: permit-challenge](https://github.com/yourusername/permit-challenge)

- Includes a thorough [README.md](./README.md) with setup, usage, and Permit.io integration instructions.

## My Journey

I started by defining the problem: `.env` file sprawl and the risks of manual sharing. My goal was to create a backend service that would serve environment variables securely, using Permit.io for fine-grained, role-based access control.

The project was built in Agile sprints:
- **Sprint 1:** Project setup, Express server, and config structure.
- **Sprint 2:** Permit.io integration and robust error handling.
- **Sprint 3:** Demo scripts, documentation, and polish.

**Challenges:**  
- Mapping API keys to Permit.io users and roles required careful dashboard configuration.
- Ensuring error messages and status codes were consistent for a clean API experience.
- Debugging Permit.io PDP connectivity and resource naming conventions.

**What I learned:**  
- Permit.io makes it easy to add RBAC to any API, but planning your resource and role model up front is key.
- API-first authorization can be both secure and developer-friendly with the right tools and patterns.

## API-First Authorization

Permit.io powers all access control in this project:
- Each environment (`env:dev`, `env:staging`, `env:prod`) is a Permit.io resource.
- Roles (`Developer`, `Manager`, `Director`) are mapped to users in the Permit.io dashboard and granted `read` permissions on the corresponding resources.
- The Express API checks authorization on every request using `permit.check(user_key, 'read', resource)`, where `user_key` is the API key provided in the request header.
- All access decisions, including denials, are handled by Permit.io—making the API stateless and secure by design.

**Permit.io Setup Steps:**
1. Define resources for each environment in the dashboard.
2. Create roles and assign `read` permissions.
3. Add users with their API keys and assign roles.
4. The API enforces these rules with a single call to Permit.io on each request.

---

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

<!-- Don't forget to add a cover image (if you want). -->

<!-- Thanks for participating! -->
