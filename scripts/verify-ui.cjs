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
  assert.equal(await page.locator(".objective-terrain-block").count(), 1, "battlefields should explain the objective-terrain convention");
  assert.match(await page.locator(".objective-terrain-block").textContent(), /entire terrain area is the objective/i);
  assert.equal(await page.locator(".victor-block").count(), 1, "territory card should include a victor bonus");
  assert.equal(await page.locator(".source-block a").count(), 1, "territory card should link to its source rules");

  await page.getByRole("button", { name: /Crownfire Battery/ }).click();
  assert.equal(await page.locator("#territory-panel h3").textContent(), "Crownfire Battery");
  assert.match(await page.locator("#territory-panel").textContent(), /Annihilator Cannon/);
  assert.match(await page.locator(".victor-block").textContent(), /5-inch blast marker/);
  assert.equal(await page.locator(".source-block a").count(), 2, "cannon card should link its mission source and Horus Heresy inspiration");
}

async function checkDispositions(page, useNavigation = false) {
  if (useNavigation) {
    await page.locator('a[href="#dispositions"]').click();
    await page.waitForTimeout(120);
    const bounds = await page.evaluate(() => ({
      headerBottom: document.querySelector(".site-header").getBoundingClientRect().bottom,
      headingTop: document.querySelector("#dispositions h2").getBoundingClientRect().top
    }));
    assert.ok(bounds.headingTop >= bounds.headerBottom, "the disposition heading should clear the sticky header");
  } else {
    await page.locator("#dispositions").scrollIntoViewIfNeeded();
  }
  assert.equal(await page.locator(".disposition-card").count(), 5, "all five dispositions should render");
  assert.equal(await page.locator(".agenda-sequence li").count(), 3, "the choose, reveal and resolve sequence should render");
  assert.match(await page.locator("#dispositions").textContent(), /territory mission determines the battle/i);
}

async function verify() {
  const browser = await chromium.launch({ executablePath: EDGE_PATH, headless: true });

  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await desktop.goto(SITE_URL, { waitUntil: "networkidle" });
    await desktop.locator(".territory-hex").first().waitFor({ state: "visible" });
    const desktopCanvasWidth = await desktop.locator("#map-viewport").evaluate((node) => node.clientWidth);
    await checkMap(desktop, desktopCanvasWidth);
    await checkDispositions(desktop, true);

    const screenshot = path.join(os.tmpdir(), "dominatus-map-desktop.png");
    await desktop.locator("#war-map").screenshot({ path: screenshot });
    const dispositionsScreenshot = path.join(os.tmpdir(), "dominatus-dispositions-desktop.png");
    await desktop.locator("#dispositions").screenshot({ path: dispositionsScreenshot });

    const narrow = await browser.newPage({ viewport: { width: 360, height: 800 } });
    await narrow.goto(SITE_URL, { waitUntil: "networkidle" });
    await narrow.locator(".territory-hex").first().waitFor({ state: "visible" });
    const narrowCanvasWidth = await narrow.locator("#map-viewport").evaluate((node) => node.clientWidth);
    await checkMap(narrow, narrowCanvasWidth);
    await checkDispositions(narrow);

    const dimensions = await narrow.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    assert.ok(dimensions.document <= dimensions.viewport, "the page should not overflow horizontally");

    console.log(JSON.stringify({ territories: 55, desktopCanvasWidth, narrowCanvasWidth, screenshot, dispositionsScreenshot }));
  } finally {
    await browser.close();
  }
}

verify().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
