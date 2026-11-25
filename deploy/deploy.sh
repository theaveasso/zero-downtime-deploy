#!/usr/bin/env bash
# Blue-green release. YOU WRITE THIS (milestone 2). Steps:
#
#   1. Work out which colour is live (read traefik/dynamic/live.yml) and which is idle.
#   2. Start the idle colour with the new image:
#        docker compose --profile green up -d --no-deps app-<idle>
#   3. Wait until the idle colour's /readyz returns 200 (poll with a timeout;
#      give up and stop it if it never becomes ready).
#   4. (Milestone 3) run the database migration.
#   5. Switch traffic: rewrite live.yml so the router's service is app-<idle>.
#      Write to a temp file and mv it into place, so Traefik never reads half a file.
#   6. Stop the old colour: docker compose stop app-<live>
#      (sends SIGTERM; your graceful shutdown drains it).
#
# Usage: deploy/deploy.sh <image-tag>
set -euo pipefail

echo "not written yet: see the steps above and README.md, milestone 2" >&2
exit 1
