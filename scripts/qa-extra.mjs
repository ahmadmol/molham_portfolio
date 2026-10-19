import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const url = process.env.QA_URL || "http://127.0.0.1:4173/molham_portfolio/";
const dir = process.env.QA_DIR || "docs/qa";
const channel = process.env.BROWSER_CHANNEL || "msedge";
const results = {};
const browser = await chromium.launch({ headless: true, channel });
const context = await browser.newContext({
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Copy email address" }).click();
assert.equal(
  await page.evaluate(() => navigator.clipboard.readText()),
  "molhamalnaab@gmail.com",
);
await page.evaluate(() =>
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: async () => {
        throw new Error("Unavailable");
      },
    },
    configurable: true,
  }),
);
await page.getByRole("button", { name: "Copy email address" }).click();
assert.equal(
  await page
    .getByRole("status")
    .getByText("Copy this address: molhamalnaab@gmail.com")
    .isVisible(),
  true,
);
results.clipboard = "Copy success and unavailable-clipboard fallback pass";
for (const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${dir}/hero-${width}.png` });
  if (width === 390 || width === 1440) {
    // Capture page coordinates without scrolling; avoid sticky-header and
    // in-flight reveal artifacts in the section-detail evidence.
    for (const id of ["projects", "experience", "contact"]) {
      const clip = await page.locator(`#${id}`).evaluate(el => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left, y: rect.top + scrollY, width: rect.width, height: rect.height };
      });
      await page.screenshot({ path: `${dir}/${id}-${width}.png`, fullPage: true, clip });
    }
  }
}
const blocked = await browser.newContext({
  viewport: { width: 390, height: 844 },
});
await blocked.route("**/*.js", (route) => route.abort());
const delayedPage = await blocked.newPage();
await delayedPage.goto(url);
assert.equal(await delayedPage.locator("h1").isVisible(), true);
assert.equal(await delayedPage.locator("#contact").isVisible(), true);
await delayedPage.screenshot({
  path: `${dir}/blocked-js-390.png`,
  fullPage: true,
});
results.blockedJavaScript =
  "Hero and contact visible with every JavaScript request blocked";
await blocked.close();
await browser.close();

// Chromium's current default storage-partition key is "x" (empty relative path).
// Use a new temporary browser profile; never change the user's browser settings.
const profile = await mkdtemp(join(tmpdir(), "portfolio-zoom-"));
await mkdir(join(profile, "Default"));
await writeFile(
  join(profile, "Default", "Preferences"),
  JSON.stringify({
    partition: { default_zoom_level: { x: Math.log(2) / Math.log(1.2) } },
  }),
);
const zoomContext = await chromium.launchPersistentContext(profile, {
  channel,
  headless: true,
  viewport: null,
  args: ["--window-size=1440,1000"],
});
const zoomPage = await zoomContext.newPage();
await zoomPage.goto(url, { waitUntil: "networkidle" });
results.zoom = await zoomPage.evaluate(() => ({
  viewport: innerWidth,
  devicePixelRatio,
  scrollWidth: document.documentElement.scrollWidth,
}));
assert.equal(results.zoom.devicePixelRatio, 2);
assert.ok(results.zoom.scrollWidth <= results.zoom.viewport);
await zoomPage.screenshot({ path: `${dir}/zoom-200.png`, fullPage: true });
await zoomContext.close();

const rgb = (hex) =>
  hex
    .match(/\w\w/g)
    .map((s) => parseInt(s, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
const luminance = (hex) =>
  rgb(hex).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
results.contrast = [];
for (const bg of ["050a18", "0a1224", "0f1a2f"])
  for (const fg of ["e6ecf5", "a6b2c7", "94a2ba", "34d399", "fca5a5"]) {
    const contrast = ratio(fg, bg);
    assert.ok(contrast >= 4.5);
    results.contrast.push({ fg, bg, ratio: Number(contrast.toFixed(2)) });
  }
results.primaryButtonContrast = ratio("03140f", "10b981");
assert.ok(results.primaryButtonContrast >= 4.5);
results.externalLinks = [];
for (const target of [
  "https://github.com/ahmadmol",
  "https://www.linkedin.com/in/ahmad-molham-alnaeb",
]) {
  try {
    const response = await fetch(target, {
      signal: AbortSignal.timeout(20000),
    });
    results.externalLinks.push({
      url: target,
      status: response.status,
      urlAfterRedirect: response.url,
    });
  } catch (error) {
    results.externalLinks.push({ url: target, error: error.message });
  }
}
await writeFile(`${dir}/extra-results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
