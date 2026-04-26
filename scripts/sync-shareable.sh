#!/usr/bin/env bash
# Sync web/  →  web-shareable/  (a clean, portable copy with no git/vercel/node state)
#
# Usage:  bash scripts/sync-shareable.sh        (run from web/ or anywhere)
#
# What gets copied:   all source files, public assets, app.py, run.sh, README.md
# What gets excluded: .git, .vercel, node_modules, .next, .originals, .env*, .DS_Store
#
# Re-run this whenever you've made changes in web/ that you want to share.

set -euo pipefail

# Resolve paths relative to this script so the command works from any CWD.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$(cd "$SCRIPT_DIR/.." && pwd)"
PARENT="$(cd "$SRC/.." && pwd)"
DEST="$PARENT/web-shareable"

echo "▸ Source:      $SRC"
echo "▸ Destination: $DEST"

if ! command -v rsync >/dev/null 2>&1; then
  echo "✗ rsync not found on PATH." >&2
  exit 1
fi

mkdir -p "$DEST"

rsync -a --delete \
  --exclude '.git/' \
  --exclude '.vercel/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude '.originals/' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '.DS_Store' \
  --exclude 'scripts/' \
  --exclude '*.bak' \
  --exclude 'AGENTS.md' \
  --exclude 'README.md' \
  "$SRC"/ "$DEST"/

# Drop a marker so the shareable copy can identify itself
cat > "$DEST/.shareable" <<EOF
This folder is a clean, portable copy of the Axis Architects website.
Regenerated from: $SRC
Generated at:    $(date "+%Y-%m-%d %H:%M:%S %Z")
Do NOT edit files here directly — your changes will be overwritten on the next sync.
Edit in the working folder, then re-run scripts/sync-shareable.sh.
EOF

echo "✓ Synced. Contents:"
du -sh "$DEST"
echo
echo "To run from a fresh shell:"
echo "  cd \"$DEST\""
echo "  python3 app.py        # OR  ./run.sh   OR  npm install && npm run dev"
