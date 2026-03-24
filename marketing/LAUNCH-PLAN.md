# SnapLedger Launch Plan

## Status: LIVE ⚡
- URL: https://recycling-fair-pill-paso.trycloudflare.com (temporary)
- Server: PM2 on Zak's Mac, port 3100
- Tunnel: Cloudflare quick tunnel

## Immediate TODO (Zak needs to do these)

### 1. Stripe Setup (5 min)
1. Go to https://dashboard.stripe.com/payment-links
2. Create 2 payment links:
   - **Pro Plan**: $29/month recurring → get the link
   - **Business Plan**: $79/month recurring → get the link
3. Give me the links and I'll wire them into the pricing section

### 2. Vercel Deploy (2 min)
1. Go to https://vercel.com/new
2. Import `zacharylyonstx/snapledger` 
3. Add env var: `OPENAI_API_KEY` = the key from mean-cat project
4. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` = `https://placeholder.supabase.co`
5. Add env vars: `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `placeholder`
6. Click Deploy

### 3. Domain (optional, $12/year)
- Buy snapledger.com or snapledger.io
- Point to Vercel

## Launch Posts Ready
See `marketing/launch-posts.md` for copy-paste ready posts for:
- Reddit: r/smallbusiness, r/Entrepreneur, r/SaaS, r/Bookkeeping
- LinkedIn
- Twitter/X thread
- Hacker News (Show HN)

## Revenue Projections
- Free tier costs ~$0.01/doc in OpenAI API costs
- Pro at $29/mo: ~$0.03/doc cost, 200 docs = $6 cost → $23 margin
- Business at $79/mo: unlimited but most users process 500-1000/mo → ~$15-30 cost → $49-64 margin
- Break even on API costs: ~3 Pro subscribers

## Growth Levers
1. SEO: "AI receipt scanner", "invoice data extraction", "receipt to CSV"
2. Reddit organic posts (ready)
3. Build in public on Twitter
4. Product Hunt launch (week 2)
5. Direct outreach to bookkeepers and accountants
