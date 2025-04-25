# Demo: API Usage Examples

## 1. Fetching Dev Environment Variables (Linux/macOS/curl)
```sh
curl -H "X-API-Key: dev1" http://localhost:3000/getEnv/dev
```

## 2. Fetching Staging Environment Variables
```sh
curl -H "X-API-Key: manager1" http://localhost:3000/getEnv/staging
```

## 3. Fetching Prod Environment Variables
```sh
curl -H "X-API-Key: director1" http://localhost:3000/getEnv/prod
```

## 4. Missing or Invalid API Key
```sh
curl http://localhost:3000/getEnv/dev
```

## 5. Invalid Environment Level
```sh
curl -H "X-API-Key: dev123" http://localhost:3000/getEnv/invalid
```

## 6. PowerShell Example (Windows)
```powershell
# PowerShell Invoke-RestMethod example:
Invoke-RestMethod -Uri "http://localhost:3000/getEnv/dev" -Headers @{"X-API-Key"="dev1"}
```

---

# Expected API Responses

## 200 OK (Success)
```json
{
  "DB_HOST": "dev.db.local",
  "API_KEY": "dev123"
}
```

## 400 Bad Request (Invalid environment)
```json
{
  "error": "Invalid environment level specified. Use 'dev', 'staging', or 'prod'."
}
```

## 401 Unauthorized (Missing API Key)
```json
{
  "error": "API Key required."
}
```

## 403 Forbidden (Access Denied by Permit.io)
```json
{
  "error": "Access Denied."
}
```

## 500 Internal Server Error
```json
{
  "error": "Internal server error."
}
```
