// Load test to run during a release:  k6 run k6/release.js
import http from "k6/http";
import { check } from "k6";

export const options = { vus: 20, duration: "60s" };

export default function () {
  const res = http.get("http://localhost:8080/version");
  check(res, { "status is 200": (r) => r.status === 200 });
}
