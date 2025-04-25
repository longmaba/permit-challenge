# Sprint 2: Permit.io Integration & Error Handling

## Goal
Integrate Permit.io authorization, handle all error cases, and ensure correct API responses.

## Tasks
- [ ] 2.1.5: Call `permit.check(apiKey, 'read', 'env:{level}')`
- [ ] 2.1.6: If authorized, return environment variables for the level
- [ ] 2.1.7: If denied, return 403 Forbidden
- [ ] 2.1.8: Handle missing/invalid API key (401/403)
- [ ] 2.1.9: Implement error handling for Permit.io SDK/network issues (500)

## Definition of Done
- API returns correct data or error for all cases
- Permit.io authorization works (can be mocked)
- All error cases return appropriate status and messages
