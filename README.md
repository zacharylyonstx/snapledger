# SnapLedger ⚡

**AI-powered invoice & receipt processor.** Upload a photo or PDF, get clean structured data in seconds.

## What It Does

- Upload any invoice, receipt, or bill (photo or PDF)
- AI extracts vendor, dates, line items, totals, tax, payment terms
- Export as CSV, JSON, or QuickBooks-compatible format
- REST API for programmatic access

## Tech Stack

- **Next.js 15** (App Router + TypeScript)
- **Tailwind CSS + shadcn/ui** — dark mode, premium feel
- **OpenAI GPT-4o Vision** — document analysis
- **Supabase** — auth, database, storage
- **Stripe** — subscription billing
- **Vercel** — hosting

## Quick Start

```bash
# Install deps
npm install

# Copy env vars
cp .env.example .env.local
# Fill in your API keys

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `OPENAI_API_KEY` | Yes | OpenAI API key (GPT-4o) |
| `STRIPE_SECRET_KEY` | For billing | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | For billing | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For billing | Stripe publishable key |

## Database Setup

Run `supabase/schema.sql` in your Supabase SQL editor to create all tables.

## API Usage

```bash
curl -X POST https://your-domain.com/api/v1/process \
  -H "Authorization: Bearer sk_your_api_key" \
  -F "file=@invoice.jpg"
```

Response:
```json
{
  "success": true,
  "data": {
    "vendor": "Home Depot",
    "date": "2026-03-15",
    "total": 154.66,
    "tax": 11.79,
    "line_items": [...]
  }
}
```

## Pricing

- **Free** — 10 docs/month, all exports
- **Pro** ($29/mo) — 200 docs/month, API access, batch processing
- **Business** ($79/mo) — Unlimited, custom integrations, SSO

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zacharylyonstx/snapledger)

## License

MIT
