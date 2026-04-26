#!/usr/bin/env bash
# Axis Archi — one-shot launcher (bash version).
# Usage:  ./run.sh          → install deps if needed, start dev server
#         ./run.sh build    → production build, then start
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "✗ node not found. Install Node 18+ from https://nodejs.org" >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "▸ Installing dependencies..."
  npm install --no-audit --no-fund --loglevel=error
fi

mode="${1:-dev}"
case "$mode" in
  dev)
    echo "▸ Starting dev server on http://localhost:3000"
    npm run dev
    ;;
  build|prod)
    echo "▸ Building production bundle..."
    npm run build
    echo "▸ Starting production server on http://localhost:3000"
    npm run start
    ;;
  *)
    echo "Usage: ./run.sh [dev|build]" >&2
    exit 1
    ;;
esac
