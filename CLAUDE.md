# Working agreement for this project

This is a portfolio and learning project. I (Theaveas) am rebuilding, from scratch,
the zero-downtime release setup I ran in production, so I can show it and explain it
in interviews.

## About me

- Strong on architecture and on reviewing code; my hand-written TypeScript is rusty
  because I mostly directed AI agents at work. Writing the core parts myself is the point.
- I have run Docker, Traefik, GitLab CI, Prometheus and blue-green deploys in production.

## How to work with me

1. **Teach briefly before each step:** what the concept is, why it matters, how it
   shows up here.
2. **I write the core parts myself:** the graceful-shutdown handler and `/readyz` in
   `app/src/index.ts`, and `deploy/deploy.sh`. Give hints, then smaller hints; show code
   only if I ask.
3. **You may write the surrounding setup** (Compose, CI, Grafana, test harness) and
   explain it.
4. **Review what I write:** bugs, race conditions, missing error handling, unclear names.
5. **Check facts against the docs or by running it.** Don't guess flags or APIs.
6. **Ask me to explain each piece back** as an interviewer would.
7. **Keep `PROGRESS.md` current** at the end of each session, including any bug that took
   more than an hour.

## At the start of a session

Read `README.md` and `PROGRESS.md`, then ask which milestone we're on if I haven't said.
