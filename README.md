# MAS Logistics — Europe to Iceland Shipping (prototype)

**Status: prototype (2026-08) — not maintained**

A prototype buy-and-ship service for individuals and businesses in Iceland: quote requests with
admin review, pooled "group-order" campaigns with per-campaign public pages, a shared-pallet
intake for smaller shipments, and an idea board for customers to propose bulk imports. Seven
Supabase migrations — a lightly developed exploration of the concept, not a finished product.

## Stack

React + TypeScript · Vite · TanStack Router/Start · Tailwind CSS · Supabase (Postgres, Auth, RLS).

## Running locally

```bash
npm install
npm run dev
```

Needs a Supabase project. The app reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
from the environment — no `.env.example` is checked into this repo.

```bash
npm run lint
npm run build
```

## License

All rights reserved — see [LICENSE](./LICENSE).
