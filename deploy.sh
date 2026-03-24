#!/bin/bash
# SnapLedger One-Click Deploy
# Just run: ./deploy.sh
# It handles everything - login, env vars, deployment.

set -e

echo ""
echo "  ⚡ SnapLedger Deploy"
echo "  ==================="
echo ""

# Check for Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "  Installing Vercel CLI..."
    npm install -g vercel
fi

# Check auth - login if needed
if ! vercel whoami &> /dev/null 2>&1; then
    echo "  📱 Need to login to Vercel first (opens browser)..."
    echo ""
    vercel login
    echo ""
fi

VERCEL_USER=$(vercel whoami 2>/dev/null)
echo "  ✓ Logged in as: $VERCEL_USER"

# Deploy
echo ""
echo "  🚀 Deploying to production..."
echo ""

vercel --yes --prod \
    -e OPENAI_API_KEY="${OPENAI_API_KEY:?Set OPENAI_API_KEY env var first}" \
    -e NEXT_PUBLIC_APP_URL="" \
    -e NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co" \
    -e NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder"

echo ""
echo "  ✅ SnapLedger is LIVE!"
echo "  Check your Vercel dashboard for the URL."
echo ""
