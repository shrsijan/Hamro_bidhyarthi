#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

cleanup() {
  echo ""
  echo "Shutting down..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
  echo "Done."
}
trap cleanup EXIT INT TERM

# --- Python venv setup ---
VENV_DIR="$BACKEND_DIR/.venv"
if [ ! -d "$VENV_DIR" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv "$VENV_DIR"
fi
source "$VENV_DIR/bin/activate"

echo "Installing backend dependencies..."
pip install -q -r "$BACKEND_DIR/requirements.txt"

# --- Seed database if it doesn't exist ---
if [ ! -f "$BACKEND_DIR/hamro.db" ]; then
  echo "Seeding database with demo data..."
  python "$BACKEND_DIR/seed.py"
fi

# --- Frontend dependencies ---
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install --prefix "$FRONTEND_DIR"
fi

# --- Start both servers ---
echo ""
echo "Starting backend  → http://localhost:8000"
echo "Starting frontend → http://localhost:5173"
echo ""

cd "$BACKEND_DIR"
python -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

wait $BACKEND_PID $FRONTEND_PID
