import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

// Reuse installed/bundled Playwright; no production dependency is required.
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const url = process.env.QA_URL || "http://127.0.0.1:4173/molham_portfolio/";
const dir = process.env.QA_DIR || "docs/qa";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  channel: process.env.BROWSER_CHANNEL || "msedge",
});
const results = {
  url,
  browser: browser.version(),
  widths: [],
  checks: [],
  consoleErrors: [],
  failedRequests: [],
};
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (error) => results.consoleErrors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("mailto:"))
    results.consoleErrors.push(message.text());
});
page.on("requestfailed", (request) => {
  if (!request.url().startsWith("mailto:"))
    results.failedRequests.push({
      url: request.url(),
      error: request.failure(),
    });
});
await page.goto(url, { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
assert.equal(await page.getByRole("link", { name: "Skip to content" }).evaluate(el => el === document.activeElement), true);
await page.keyboard.press("Enter");
assert.equal(await page.locator("main").evaluate(el => el === document.activeElement), true);
results.checks.push("Keyboard skip link moves focus to main");
assert.equal(await page.locator("h1").count(), 1);
assert.equal(await page.locator("#projects article").count(), 4);
assert.equal(await page.locator("#experience article").count(), 2);
assert.equal(await page.locator("a button,button a").count(), 0);
assert.equal(await page.locator("html").getAttribute("lang"), "en");
assert.equal(
  await page.locator("link[rel=canonical]").getAttribute("href"),
  "https://ahmadmol.github.io/molham_portfolio/",
);
results.checks.push(
  "Semantics, factual section counts, canonical and valid controls",
);

const localAssets = await page
  .locator("script[src],link[href],a[download]")
  .evaluateAll((els) => [
    ...new Set(
      els
        .map((el) => el.src || el.href)
        .filter((value) => value.includes("/molham_portfolio/")),
    ),
  ]);
const og = await page
  .locator('meta[property="og:image"]')
  .getAttribute("content");
const assetResults = [];
for (const asset of [
  ...localAssets,
  og.replace("https://ahmadmol.github.io", new URL(url).origin),
]) {
  const response = await page.request.get(asset);
  assert.equal(response.status(), 200, asset);
  assetResults.push({
    url: asset,
    status: response.status(),
    type: response.headers()["content-type"],
  });
  if (asset.endsWith(".pdf"))
    assert.equal((await response.body()).subarray(0, 5).toString(), "%PDF-");
}
results.assets = assetResults;
results.checks.push(
  "Every referenced local script/style/font/favicon/CV plus OG image returns 200; PDF magic bytes",
);
assert.equal(await page.locator('a[href="tel:+963967225762"]').count(), 1);
assert.ok(
  (await page.locator('a[href="mailto:molhamalnaab@gmail.com"]').count()) > 0,
);
assert.ok(
  (await page.locator('a[href="https://github.com/ahmadmol"]').count()) > 0,
);
assert.ok(
  (await page
    .locator('a[href="https://www.linkedin.com/in/ahmad-molham-alnaeb"]')
    .count()) > 0,
);

for (const width of [320, 375, 390, 430, 768, 1024, 1200, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(650);
  const geometry = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  assert.ok(
    geometry.document <= width && geometry.body <= width,
    JSON.stringify(geometry),
  );
  await page.screenshot({ path: `${dir}/after-${width}.png`, fullPage: true });
  results.widths.push({ width, ...geometry, overflow: false });
}
await page.setViewportSize({ width: 1440, height: 1000 });
for (const id of ["projects", "experience", "about", "skills", "contact"]) {
  await page.locator(`nav[aria-label=Primary] a[href="#${id}"]`).click();
  await page.waitForTimeout(950);
  const top = await page
    .locator(`#${id} h2`)
    .first()
    .evaluate((el) => el.getBoundingClientRect().top);
  assert.ok(top >= 80 && top < 300, `${id} heading top ${top}`);
  assert.equal(
    await page
      .locator(`nav[aria-label=Primary] a[href="#${id}"]`)
      .getAttribute("aria-current"),
    "location",
  );
}
await page.goBack();
await page.waitForTimeout(700);
assert.equal(new URL(page.url()).hash, "#skills");
results.checks.push(
  "Desktop anchors, sticky heading offsets, active indicators and browser Back",
);

await page.setViewportSize({ width: 390, height: 844 });
const trigger = page.getByRole("button", { name: "Open navigation menu" });
await trigger.click();
const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });
assert.equal(await dialog.isVisible(), true);
assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
assert.equal(
  await page.evaluate(() => document.activeElement.getAttribute("aria-label")),
  "Close navigation menu",
);
await page.keyboard.press("Shift+Tab");
assert.equal(
  await page.evaluate(() => document.activeElement.textContent),
  "Education",
);
await page.keyboard.press("Tab");
assert.equal(
  await page.evaluate(() => document.activeElement.getAttribute("aria-label")),
  "Close navigation menu",
);
await page.keyboard.press("Escape");
assert.equal(await dialog.isVisible(), false);
assert.equal(
  await trigger.evaluate((el) => el === document.activeElement),
  true,
);
assert.notEqual(
  await page.evaluate(() => document.body.style.overflow),
  "hidden",
);
await trigger.click();
await dialog.getByRole("link", { name: "Projects", exact: true }).click();
assert.equal(await dialog.isVisible(), false);
await page.waitForTimeout(700);
assert.equal(new URL(page.url()).hash, "#projects");
await trigger.click();
await page.mouse.click(5, 400);
assert.equal(await dialog.isVisible(), false);
await trigger.click();
await page.setViewportSize({ width: 1200, height: 900 });
await page.waitForTimeout(100);
assert.equal(await dialog.isVisible(), false);
assert.notEqual(
  await page.evaluate(() => document.body.style.overflow),
  "hidden",
);
results.checks.push(
  "Mobile menu open, initial focus, Tab wrap, Escape, focus return, anchor, backdrop, resize and scroll restoration",
);

await page
  .getByRole("button", { name: "Open email draft", exact: true })
  .click();
assert.equal(
  await page.locator("#contact-name").getAttribute("aria-invalid"),
  "true",
);
assert.equal(
  await page
    .locator("#contact-name")
    .evaluate((el) => el === document.activeElement),
  true,
);
await page.getByLabel("Name", { exact: true }).fill("QA & مراجعة");
await page.getByLabel("Email", { exact: true }).fill("invalid");
await page
  .getByLabel("Message", { exact: true })
  .fill("Hello Molham, let’s discuss Android & Flutter.");
await page
  .getByRole("button", { name: "Open email draft", exact: true })
  .click();
assert.equal(
  await page.locator("#contact-email").getAttribute("aria-invalid"),
  "true",
);
await page
  .getByLabel("Email", { exact: true })
  .fill("qa+portfolio@example.com");
await page.getByLabel("Subject (optional)").fill("Android & Flutter? #role");
await page
  .getByRole("button", { name: "Open email draft", exact: true })
  .click();
const draft = await page
  .getByRole("link", { name: "Reopen prepared draft" })
  .getAttribute("href");
const mail = new URL(draft);
assert.equal(mail.pathname, "molhamalnaab@gmail.com");
assert.equal(mail.searchParams.get("subject"), "Android & Flutter? #role");
assert.ok(mail.searchParams.get("body").includes("QA & مراجعة"));
assert.ok(mail.searchParams.get("body").includes("qa+portfolio@example.com"));
assert.equal(
  await page.getByLabel("Name", { exact: true }).inputValue(),
  "QA & مراجعة",
);
assert.equal(await page.getByText("Message sent", { exact: true }).count(), 0);
results.checks.push(
  "Form empty/invalid focus and errors; encoded Unicode, ampersands, plus signs and subject; preserved draft and truthful status",
);

if (process.env.AXE_SCRIPT) {
  await page.addScriptTag({ path: process.env.AXE_SCRIPT });
  results.axe = await page.evaluate(async () => {
    const scan = await window.axe.run(document, {
      runOnly: {
        type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      },
    });
    return {
      violations: scan.violations,
      incomplete: scan.incomplete.map((item) => ({
        id: item.id,
        nodes: item.nodes.length,
      })),
      passes: scan.passes.length,
    };
  });
  assert.equal(
    results.axe.violations.length,
    0,
    JSON.stringify(
      results.axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
}
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(url + "#contact", { waitUntil: "networkidle" });
assert.equal(
  await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  ),
  "auto",
);
assert.equal(
  await page.evaluate(
    () =>
      document.getAnimations().filter((a) => a.playState === "running").length,
  ),
  0,
);
await page.getByRole("link", { name: "Back to top" }).click();
await page.waitForTimeout(100);
assert.ok((await page.evaluate(() => scrollY)) < 100);
await page.getByRole("link", { name: "Explore Projects" }).click();
assert.equal(new URL(page.url()).hash, "#projects");
await page.getByRole("link", { name: "Get in Touch" }).click();
assert.equal(new URL(page.url()).hash, "#contact");
results.checks.push(
  "Reduced motion: no running animations, immediate scroll, back-to-top and hero CTAs",
);

const noJS = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const noJSPage = await noJS.newPage();
await noJSPage.goto(url);
assert.equal(await noJSPage.locator("h1").isVisible(), true);
assert.equal(await noJSPage.locator("#projects article").count(), 4);
assert.equal(
  await noJSPage
    .locator("#contact")
    .evaluate((el) => getComputedStyle(el).opacity),
  "1",
);
assert.equal(await noJSPage.locator("a[download]").first().isVisible(), true);
await noJSPage.screenshot({ path: `${dir}/no-js-390.png`, fullPage: true });
await noJS.close();
results.checks.push(
  "JavaScript-disabled: hero, projects, contact and CV remain present and visible",
);
assert.equal(
  results.consoleErrors.length,
  0,
  JSON.stringify(results.consoleErrors),
);
assert.equal(
  results.failedRequests.length,
  0,
  JSON.stringify(results.failedRequests),
);
await writeFile(
  `${dir}/browser-results.json`,
  JSON.stringify(results, null, 2),
);
await browser.close();
console.log(JSON.stringify(results, null, 2));
