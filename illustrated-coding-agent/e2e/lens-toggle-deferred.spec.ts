import { test, expect } from '@playwright/test';

test.describe('lens toggle deferral', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();
  });

  test('lens toggle is not visible in Hook chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.scrollTo({ top: 100, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await expect(page.locator('.lens-toggle')).toHaveCount(0);
  });

  test('lens toggle is not visible in Illusion Break chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="model-only-misconception"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await expect(page.locator('.lens-toggle')).toHaveCount(0);
  });

  test('lens toggle is not visible in Harness Reveal chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="harness-framing"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await expect(page.locator('.lens-toggle')).toHaveCount(0);
  });

  test('lens toggle is visible in Flight Recorder chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.lens-toggle')).toBeVisible();
  });

  test('lens toggle is not visible in toy-example chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-read"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.lens-toggle')).toHaveCount(0);
  });

  test('lens toggle is not visible in Field Guide chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#chapter-field-guide')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    await expect(page.locator('.lens-toggle')).toHaveCount(0);
  });
});
