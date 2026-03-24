#!/bin/bash
# SnapLedger Tunnel Watchdog
# Checks if cloudflared tunnel is running, restarts if not
# Run via: pm2 start tunnel-watchdog.sh --name tunnel-watchdog --cron "*/5 * * * *"

TUNNEL_URL="http://localhost:3100"

# Check if cloudflared is running
if ! pgrep -f "cloudflared tunnel" > /dev/null; then
    echo "$(date) - Tunnel down, restarting..."
    cloudflared tunnel --url $TUNNEL_URL --protocol http2 &
    sleep 10
    echo "$(date) - Tunnel restarted"
else
    echo "$(date) - Tunnel is running"
fi
