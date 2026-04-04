#!/bin/bash
# Runs Lighthouse mobile audits against every site and prints a summary.
# Requires: production server running on port 3100.
set -e

export CHROME_PATH=/home/bsambrone/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome
mkdir -p /tmp/lighthouse

sites=(apex pigmilk inflatableanchors dehydratedwater strategicvoid stratify truegrit)

for site in "${sites[@]}"; do
  if [ "$site" = "apex" ]; then
    url="http://localhost:3100/"
  else
    url="http://localhost:3100/?site=$site"
  fi

  echo "Running Lighthouse for $site..."
  npx lighthouse "$url" \
    --output=json --output-path="/tmp/lighthouse/$site.json" \
    --quiet \
    --chrome-flags="--headless --no-sandbox" \
    --only-categories=performance 2>&1 | tail -5
done

echo ""
echo "=== Mobile Lighthouse Results ==="
echo ""
printf "%-20s %8s %8s %8s %8s %8s\n" "Site" "Perf" "LCP" "FCP" "TBT" "CLS"
printf "%-20s %8s %8s %8s %8s %8s\n" "----" "----" "---" "---" "---" "---"

for site in "${sites[@]}"; do
  node -e "
    const r = JSON.parse(require('fs').readFileSync('/tmp/lighthouse/$site.json', 'utf-8'));
    const perf = Math.round(r.categories.performance.score * 100);
    const lcp = r.audits['largest-contentful-paint'].displayValue;
    const fcp = r.audits['first-contentful-paint'].displayValue;
    const tbt = r.audits['total-blocking-time'].displayValue;
    const cls = r.audits['cumulative-layout-shift'].displayValue;
    console.log(['$site'.padEnd(20), String(perf).padStart(8), lcp.padStart(8), fcp.padStart(8), tbt.padStart(8), cls.padStart(8)].join(' '));
  "
done
