#!/usr/bin/env python3
"""
Axis Archi — one-shot launcher.

Usage:
    python3 app.py            # install deps if needed, then start dev server on http://localhost:3000
    python3 app.py --build    # production build, then start
    python3 app.py --port 4000

This is a thin Python wrapper around `npm install` / `npm run dev` / `npm run start`.
The website itself is a Next.js application — Python is only used here as a convenience runner.
"""
import argparse
import os
import shutil
import subprocess
import sys
import time
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_PORT = 3000


def info(msg):
    print(f"\033[36m▸\033[0m {msg}")


def warn(msg):
    print(f"\033[33m!\033[0m {msg}")


def fail(msg):
    print(f"\033[31m✗\033[0m {msg}", file=sys.stderr)
    sys.exit(1)


def require(bin_name, install_hint):
    if shutil.which(bin_name) is None:
        fail(f"`{bin_name}` not found on PATH. {install_hint}")


def ensure_deps():
    if (ROOT / "node_modules").is_dir():
        info("Dependencies already installed (node_modules present).")
        return
    info("Installing dependencies — this may take a minute...")
    rc = subprocess.call(
        ["npm", "install", "--no-audit", "--no-fund", "--loglevel=error"],
        cwd=ROOT,
    )
    if rc != 0:
        fail("npm install failed.")
    info("Dependencies installed.")


def run_dev(port):
    env = os.environ.copy()
    env["PORT"] = str(port)
    info(f"Starting dev server on http://localhost:{port} — Ctrl+C to stop.")
    # Open browser shortly after the server boots (best-effort).
    if env.get("NO_BROWSER", "") not in ("1", "true"):
        try:
            import threading
            threading.Timer(2.5, lambda: webbrowser.open(f"http://localhost:{port}")).start()
        except Exception:
            pass
    rc = subprocess.call(["npm", "run", "dev", "--", "-p", str(port)], cwd=ROOT, env=env)
    sys.exit(rc)


def run_prod(port):
    info("Building production bundle...")
    rc = subprocess.call(["npm", "run", "build"], cwd=ROOT)
    if rc != 0:
        fail("Production build failed.")
    info(f"Starting production server on http://localhost:{port}.")
    env = os.environ.copy()
    env["PORT"] = str(port)
    rc = subprocess.call(["npm", "run", "start", "--", "-p", str(port)], cwd=ROOT, env=env)
    sys.exit(rc)


def main():
    parser = argparse.ArgumentParser(description="Run the Axis Archi website.")
    parser.add_argument("--build", action="store_true", help="Production build + start instead of dev mode.")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help=f"Port (default {DEFAULT_PORT}).")
    parser.add_argument("--no-browser", action="store_true", help="Do not auto-open the browser.")
    args = parser.parse_args()

    require("node", "Install Node 18+ from https://nodejs.org")
    require("npm", "Comes with Node — please install Node 18+.")

    if args.no_browser:
        os.environ["NO_BROWSER"] = "1"

    ensure_deps()
    if args.build:
        run_prod(args.port)
    else:
        run_dev(args.port)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nstopped.")
