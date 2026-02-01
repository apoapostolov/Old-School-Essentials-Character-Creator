#!/usr/bin/env bash
# OSE Character Creator - Dev Server Runner (Linux)

set -e

# Change to project directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[setup] Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[error] npm install failed"
        exit 1
    fi
fi

# Direct mode: forward args to npm run
if [ $# -gt 0 ]; then
    npm run "$@"
    exit $?
fi

# Default: run dev server
echo "[run] Starting OSE Character Creator dev server..."
echo "[run] Opening browser at http://localhost:3000/"
sleep 2
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000/
fi
npm run dev
