# Progress

## Current milestone

1: health checks and graceful shutdown. Not started.

## Done

- Project skeleton: Bun + Hono app with `/healthz`, `/version` and `/slow`; Dockerfile;
  Traefik with a file-based route for blue and green; Compose; CI that tests, builds and
  pushes an image; a k6 load test; the outline of `deploy/deploy.sh`.

## Next

1. Write `/readyz` so it returns 503 once shutdown starts.
2. Write the SIGTERM handler in `app/src/index.ts` (steps are in the comments).
3. Test it: `curl localhost:8080/slow?ms=5000`, then `docker compose stop app-blue` in
   another terminal. The curl should still get its answer.

## Learned

## Bugs that took more than an hour
