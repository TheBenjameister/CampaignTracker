const assert = require("node:assert/strict");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright");

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const SITE_URL = process.env.SITE_URL || "http://127.0.0.1:4173/index.html";

async function checkMap(page, expectedWidth) {
  await page.goto(SITE_URL, { waitUntil: "networkidle" });
  await page.locator(".territory-hex").first().waitFor({ state: "visible" });

  assert.equal(await page.locator(".territory-hex").count(), 55, "all 55 territories should render");
  assert.equal(await page.locator("#map-canvas").evaluate((node) => Math.round(node.getBoundingClientRect().width)), expectedWidth);

  await page.getByLabel("Zoom map in").click();
  await page.waitForTimeout(240);
  const zoomedWidth = await page.locator("#map-canvas").evaluate((node) => Math.round(node.getBoundingClientRect().width));
  assert.ok(zoomedWidth > expectedWidth, "zoom in should enlarge the map canvas");

  await page.getByLabel("Reset map zoom").click();
  await page.getByRole("button", { name: /The Crown of Cinders/ }).click();
  assert.equal(await page.locator("#territory-panel h3").textContent(), "The Crown of Cinders");
  assert.equal(await page.locator(".headquarters-safe-block").count(), 1, "headquarters should show its non-assaultable status");
  assert.equal(await page.locator(".deployment-map-image").count(), 0, "headquarters should not have a mission map");

  await page.getByRole("button", { name: /Mourning Peaks/ }).click();
  await page.locator(".deployment-map-image").waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector(".deployment-map-image")?.naturalWidth > 0);
  assert.match(await page.locator(".deployment-map-image").getAttribute("src"), /^assets\/deployments\/.+\.png$/);
  assert.equal(await page.locator(".victor-block").count(), 1, "territory card should include a victor bonus");
  assert.equal(await page.locator(".source-block a").count(), 1, "territory card should link to its source rules");
}

async function verify() {
  const browser = await chromium.launch({ executablePath: EDGE_PATH, headless: true });

  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await desktop.goto(SITE_URL, { waitUntil: "networkidle" });
    await desktop.locator(".territory-hex").first().waitFor({ state: "visible" });
    const desktopCanvasWidth = await desktop.locator("#map-viewport").evaluate((node) => node.clientWidth);
    await checkMap(desktop, desktopCanvasWidth);

    const screenshot = path.join(os.tmpdir(), "dominatus-map-desktop.png");
    await desktop.locator("#war-map").screenshot({ path: screenshot });

    const narrow = await browser.newPage({ viewport: { width: 360, height: 800 } });
    await narrow.goto(SITE_URL, { waitUntil: "networkidle" });
    await narrow.locator(".territory-hex").first().waitFor({ state: "visible" });
    const narrowCanvasWidth = await narrow.locator("#map-viewport").evaluate((node) => node.clientWidth);
    await checkMap(narrow, narrowCanvasWidth);

    const dimensions = await narrow.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    assert.ok(dimensions.document <= dimensions.viewport, "the page should not overflow horizontally");

    console.log(JSON.stringify({ territories: 55, desktopCanvasWidth, narrowCanvasWidth, screenshot }));
  } finally {
    await browser.close();
  }
}

verify().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
