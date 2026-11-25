import { expect, test } from "bun:test";

// Replace with real tests as you build: readiness flips to 503 on shutdown,
// /slow still completes after SIGTERM, and so on.
test("placeholder", () => {
  expect(1 + 1).toBe(2);
});
