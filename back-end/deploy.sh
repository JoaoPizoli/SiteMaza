#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "==> Atualizando repositório..."
git -C "$REPO_ROOT" pull origin main

echo "==> Reconstruindo e subindo os containers do back-end..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d --build

echo "==> Back-end implantado com sucesso!"
