import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server renders the complete Horizon Atlas experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Horizon Atlas/);
  assert.match(html, /WE.*DESIGN/);
  assert.match(html, /INTERVENTION LAB/);
  assert.match(html, /FUTURE COMPARISON/);
  assert.match(html, /aria-label="Clean energy investment"/);
  assert.match(html, /MODEL THE IMPOSSIBLE/);
  assert.match(html, /LOAD A PATHWAY/);
  assert.match(html, /data-run-simulation/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/);
  assert.doesNotMatch(html, /Â|Ã|â€|â€”|â€¦/);
});

test("source includes accessibility and responsive safeguards", async () => {
  const [page, css, layout, pkg] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /requestAnimationFrame/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /prefers-reduced-motion/);
  assert.match(page, /trapFocus/);
  assert.match(page, /aria-label=/);
  assert.match(page, /disabled=\{running/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(css, /@media\(max-width:720px\)/);
  assert.ok((css.match(/@keyframes/g) ?? []).length >= 12, "expected a rich motion system");
  assert.match(layout, /interactive planetary intelligence lab/i);
  assert.doesNotMatch(pkg, /react-loading-skeleton/);
});
