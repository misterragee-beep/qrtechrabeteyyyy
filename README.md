# Review QR Prototype

A prototype multi-business QR review-assistance website.

## Important
This prototype is intentionally designed for genuine customer review assistance. It does NOT maintain or distribute a bank of fake/recycled Google reviews. Customers can select factual prompts, edit the draft, and then open the business's Google review URL.

## Requirements
- Node.js 18.17+ (20+ recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Admin prototype:
http://localhost:3000/admin

Demo customer QR:
http://localhost:3000/q/DEMO-8K2P-7XQ9

## Current prototype limitations

1. Data is stored in memory and resets when the server restarts.
2. Admin authentication is NOT implemented yet.
3. QR images are not generated yet; QR tokens can be copied into a QR generator.
4. Google review status cannot be verified from this prototype.
5. Production deployment needs a real PostgreSQL/Supabase database, authentication, CSRF/session protection, rate limiting, backups, audit logs, and proper secrets management.

## Suggested production architecture

Next.js + Supabase/PostgreSQL + Cloudflare + Vercel.

Before production, replace `lib/store.js` with a database layer and protect `/admin` and all mutation APIs with real authentication and authorization.
