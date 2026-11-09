#!/usr/bin/env sh
set -e
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Install Node.js LTS from https://nodejs.org/en/download first."
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm ci
fi
npm run dev
