# Security baseline and release gates

## Implemented in this starter
- Strict TypeScript compiler settings.
- Server-side schema validation for enquiry submissions.
- Parameterized D1 query.
- Generic API error responses; no stack traces returned to clients.
- Security response headers and restrictive CSP baseline.
- Same-origin credentialed CORS configuration.
- No secrets in frontend source.

## Required before production use
- Authentication with a reviewed password/session design (prefer managed identity or audited library).
- Opaque server-side sessions; Secure + HttpOnly + SameSite cookies; session rotation and expiry.
- CSRF token validation for state-changing cookie-authenticated requests.
- Server-side role and tenant authorization on every protected resource.
- Rate limiting for login, enquiry and upload endpoints.
- R2 upload allowlist, byte-size limits, content inspection, randomized object keys and authorization on downloads.
- Malware scanning workflow for user-provided documents where appropriate.
- Audit logging for administrative actions without logging secrets or sensitive payloads.
- Dependency audit, SAST, DAST and authorization tests.
- Backup/restore and data-retention procedures for D1 and R2.

No frontend JavaScript, obfuscation or minification makes an application hack-proof. Security must be enforced by the Worker and Cloudflare configuration.
