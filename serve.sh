#!/usr/bin/env bash
# Lokal forhåndsvisning af Camino-PWA'en.
# Starter en webserver i repoet og åbner siden i Windows-Chrome (WSL).
#
# Brug:   ./serve.sh          (port 8000)
#         ./serve.sh 3000     (valgfri port)
set -euo pipefail

PORT="${1:-8000}"
URL="http://localhost:${PORT}/"
cd "$(dirname "$0")"

echo "Forhåndsvisning kører på ${URL}"
echo "Tryk Ctrl+C for at stoppe."

# Start webserveren i baggrunden, og sørg for at den dræbes når scriptet stopper
python3 -m http.server "${PORT}" --bind 127.0.0.1 &
SRV=$!
trap 'kill "${SRV}" 2>/dev/null || true' EXIT

# Vent til serveren svarer, åbn så Windows-Chrome (ignorér hvis ikke i WSL)
sleep 1
if command -v cmd.exe >/dev/null 2>&1; then
  cmd.exe /c start chrome "${URL}" >/dev/null 2>&1 || true
fi

# Hold scriptet kørende sammen med serveren
wait "${SRV}"
