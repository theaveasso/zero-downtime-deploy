# zero-downtime-deploy

Release a new version of a service while it's under load, and drop zero requests.

> Status: milestone 1 in progress. See [PROGRESS.md](PROGRESS.md).

This is a clean-room rebuild of the release setup I ran in production at a streaming
company: blue-green deploys, graceful shutdown, and background jobs that survive a release.

## How it works

```
            ┌──────────── Traefik (reverse proxy) ───────────────┐
request ──▶│  routes 100% of traffic to the "live" colour        │
            └───────────────┬───────────────────────┬────────────┘
                            ▼                       ▼
                     app-blue (v1)           app-green (v2, idle)
                            │                       │
                            └────── Postgres ───────┘
                                    Redis (job queue)
                            Prometheus ──▶ Grafana
```

A release:

1. CI builds `app:<commit>` and pushes it to the GitHub container registry.
2. `deploy/deploy.sh` starts the idle colour with the new image.
3. It waits for the idle colour's `/readyz` to pass.
4. It runs the database migration, which only adds and never removes (expand, then contract later).
5. It rewrites `traefik/dynamic/live.yml` so Traefik sends traffic to the new colour.
6. The old colour gets SIGTERM, finishes in-flight requests and its current job, and exits.

Rollback is the same switch in reverse.

## Run it

```sh
docker compose up -d --build          # Traefik + app-blue
curl localhost:8080/version           # {"version":"dev","color":"blue"}
deploy/deploy.sh <image-tag>          # release to the idle colour
k6 run k6/release.js                  # run during a release; expect 0 failures
```

Traefik dashboard: http://localhost:8081. From milestone 3, add `--profile m3` for Postgres,
Redis, Prometheus (http://localhost:9090) and Grafana (http://localhost:3001).

## Milestones

| # | Goal | Done when |
|---|---|---|
| 1 | Health checks and graceful shutdown | `docker stop` during a `/slow` request still returns the response |
| 2 | Blue-green switch with Traefik | `deploy/deploy.sh` moves traffic with no failed requests in k6 |
| 3 | Queue, migrations, metrics | A job running during a release finishes; Grafana shows the switch |
| 4 | CI and results | A stranger can run it from this README; results below are filled in |

## Results

_To fill in at milestone 4: the k6 summary during a release, a Grafana screenshot of
traffic moving from blue to green, and a short recording._

## What was hard

_To fill in as I go._
