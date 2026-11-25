import { Hono } from "hono";

// Milestone 1 starter. The parts marked YOU WRITE THIS are the core of the
// project and the interview story; see README.md, milestone 1.

const VERSION = process.env.APP_VERSION ?? "dev";
const COLOR = process.env.APP_COLOR ?? "local";
const PORT = Number(process.env.PORT ?? 3000);

const app = new Hono();

// Liveness: "the process is up". Never checks dependencies.
app.get("/healthz", (c) => c.json({ ok: true }));

// Readiness: "send me traffic". YOU WRITE THIS.
// Return 200 only when the app can serve requests (later: database reachable)
// and 503 once shutdown has started, so the proxy stops sending new requests.
app.get("/readyz", (c) => c.json({ ready: true }));

// Which version answered. Used by the load test to see the switch happen.
app.get("/version", (c) => c.json({ version: VERSION, color: COLOR }));

// A deliberately slow endpoint, to prove in-flight requests survive a release.
app.get("/slow", async (c) => {
  await Bun.sleep(Number(c.req.query("ms") ?? 2000));
  return c.json({ done: true, version: VERSION, color: COLOR });
});

const server = Bun.serve({ port: PORT, fetch: app.fetch });
console.log(`listening on :${server.port} version=${VERSION} color=${COLOR}`);

// Graceful shutdown. YOU WRITE THIS.
// On SIGTERM (what `docker stop` sends):
//   1. Mark the app not ready, so /readyz returns 503.
//   2. Wait a few seconds for the proxy to notice and stop routing here.
//   3. Stop accepting new connections and let in-flight requests finish.
//   4. (Milestone 3) let the queue worker finish its current job.
//   5. Exit with code 0.
// Look up: process.on("SIGTERM"), server.stop() and what its argument changes.
