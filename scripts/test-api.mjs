import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

// Uses a real PostgreSQL database. Run db:seed and build:server first.
const content = JSON.parse(
  await readFile(new URL("../content/portfolio.json", import.meta.url), "utf8"),
);
const port = 14000 + Math.floor(Math.random() * 1000);
const server = spawn(process.execPath, ["server/dist/server/src/main.js"], {
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
server.stdout.on("data", (data) => {
  logs += data;
});
server.stderr.on("data", (data) => {
  logs += data;
});
const base = `http://127.0.0.1:${port}/api`;

try {
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    if (server.exitCode !== null) throw new Error(`API exited: ${logs}`);
    try {
      const response = await fetch(`${base}/health`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Wait for server startup. */
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert(ready, `API or PostgreSQL failed to become healthy: ${logs}`);
  for (const key of ["profile", "projects", "posts"]) {
    const response = await fetch(`${base}/${key}`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), content[key]);
  }
  const detail = await fetch(`${base}/projects/ryu-deco`);
  assert.equal(detail.status, 200);
  assert.deepEqual(await detail.json(), content.projects[0]);
  assert.equal((await fetch(`${base}/projects/missing-project`)).status, 404);
  assert.equal(
    (
      await fetch(`${base}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      })
    ).status,
    404,
  );
  console.log(
    "API integration passed: PostgreSQL health, seeded content, project detail, 404, read-only routes.",
  );
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => {
    if (server.exitCode !== null) resolve();
    else server.once("exit", resolve);
  });
}
