# Cloudflare Business Starter

Reusable React + TypeScript frontend and Cloudflare Workers API foundation with D1 and R2 bindings.

## Stack
- React + TypeScript + Vite
- Cloudflare Workers (API + static assets)
- Cloudflare D1 (SQL database)
- Cloudflare R2 (private object storage binding)
- Hono for routing and middleware
- Zod for server-side request validation

## Requirements
- Node.js 20.0+
- npm
- Cloudflare account and Wrangler authentication (`npx wrangler login`)

## Local setup
1. Install dependencies: `npm install`
2. Create a D1 database: `npx wrangler d1 create business-db`
3. Copy the returned database ID into `wrangler.jsonc`.
4. Create the R2 bucket: `npx wrangler r2 bucket create business-private-files`
5. Apply local schema: `npm run db:local`
6. Run the app: `npm run dev`

For a Worker-integrated local run, use `npm run cf:dev` after configuring bindings.

## Deploy
1. Run `npx wrangler login`.
2. Create the production D1 database and R2 bucket.
3. Replace the D1 database ID in `wrangler.jsonc`.
4. Set production variables/secrets using Wrangler; do not put secrets in source files.
5. Apply remote migrations: `npm run db:remote`.
6. Deploy: `npm run cf:deploy`.

## Current implementation status
- React + TypeScript shell: implemented.
- Workers API with health route: implemented.
- D1 enquiry schema and parameterized insert: implemented.
- Zod server-side validation: implemented.
- Security headers and same-origin CORS policy: baseline implemented.
- R2 binding: configured; private upload/download endpoints are not implemented yet.
- Authentication, session lifecycle, CSRF tokens, roles and admin UI: not implemented yet.
- Rate limiting and automated security tests: not implemented yet.

This is a starter foundation, not a finished production admin system. Do not expose administrative data or deploy sensitive workflows until authentication, authorization, CSRF protection, rate limiting, upload validation and security tests are implemented and reviewed.

## Security notes
- Browser validation is never treated as a security boundary.
- All database writes use parameterized SQL.
- Do not expose D1 or R2 credentials/bindings to browser code.
- R2 bucket should remain private; do not enable public access for customer files.
- Configure Cloudflare WAF/rate limiting at the zone level where available.
- Review and tighten the Content Security Policy before adding third-party scripts, fonts or image hosts.
