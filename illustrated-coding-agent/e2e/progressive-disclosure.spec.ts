import { test, expect } from '@playwright/test';

test.describe('progressive Flight Recorder disclosure', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name === 'chromium') return;
    test.skip();
  });

  test('first-loop scene shows timeline and placeholders for hidden components', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.flight-recorder-panel')).toBeVisible();
    await expect(page.locator('.fr-placeholder')).toHaveCount(3);
  });

  test('tool-invocation scene reveals tool-path component', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="tool-invocation"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.fr-tool-info')).toBeVisible();
  });

  test('compaction scene reveals memory-artifact component', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="memory-retrieval"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.fr-memory-visual')).toBeVisible();
  });
});

test.describe('progressive disclosure under reduced motion', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name === 'reduced-motion') return;
    test.skip();
  });

  test('first-loop shows discrete placeholder states under reduced motion', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    await expect(page.locator('.flight-recorder-panel')).toBeVisible();
    await expect(page.locator('.fr-placeholder')).toHaveCount(0);
  });

  test('full panel renders at memory-retrieval under reduced motion', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="memory-retrieval"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    await expect(page.locator('.fr-context')).toBeVisible();
    await expect(page.locator('.fr-memory-visual')).toBeVisible();
  });
});
