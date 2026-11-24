# Manual security test checklist

- [ ] API rejects malformed JSON and invalid fields.
- [ ] No database query is built by concatenating user input.
- [ ] No secrets appear in built frontend assets or source maps.
- [ ] CSP blocks unapproved scripts and framing.
- [ ] Cross-origin requests from untrusted origins are rejected.
- [ ] All admin routes reject unauthenticated requests (after auth is implemented).
- [ ] Users cannot read or modify another tenant's records (after tenancy is implemented).
- [ ] CSRF attempts fail (after cookie sessions are implemented).
- [ ] Oversized and disallowed file uploads fail (after upload routes are implemented).
- [ ] Private R2 objects cannot be fetched without authorization.
- [ ] Login and write endpoints are rate-limited (after rate limiting is configured).
