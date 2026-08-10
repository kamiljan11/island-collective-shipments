# MAS Logistics — Europe → Iceland, Done For You

**Status:** production · Part of the [MAS Group](https://masgroup.is) platform · Built by [Kamil Jan](https://kamiljan.com)

A buying-and-shipping service for people and companies in Iceland who hit the same three
walls: the European shop won't ship to Iceland, the customs paperwork is unclear, and a
business needs a valid VAT invoice at the end of it. MAS Logistics buys the goods, ships
them, and clears customs — the customer fills in no forms.

## What it does

- **Quote requests** for individual purchases, with admin review and pricing
- **Group-order campaigns** — several customers share one container or pallet, so each pays a
  fraction of the freight; campaigns have their own public pages and order flow
- **Shared pallet** intake for smaller one-off shipments
- **Idea board** where customers propose products worth importing in bulk
- **Admin back office** — campaigns, quotes, orders and login

## Stack

React + TypeScript · Vite · TanStack Router · Tailwind CSS · Supabase (Postgres, Auth, RLS) ·
hosted on Lovable. Schema history lives in `supabase/migrations/`.

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and provide your own Supabase project URL and publishable key.

```bash
npm run lint
npm run build
npx tsc -b        # note: -b, not --noEmit (project references)
```

## How security is handled

- No secrets in the repo; `.env` holds only the Supabase publishable key, which is a
  client-side value by design.
- Row Level Security in Postgres is the authorisation boundary — the browser never holds a
  service role key.
- Every push runs build, lint, typecheck, tests, Semgrep and a Gitleaks secret scan; a
  pre-commit hook blocks credential-shaped strings.
- Customer data stays in the database. Fixtures in the repo are synthetic.

## Licence

Proprietary. Published for reference, not for reuse.
