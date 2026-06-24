import { test, expect } from '@playwright/test';

test.describe('mobile progressive disclosure', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile') test.skip();
  });

  test('lens toggle visible on narrow viewport', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="tool-invocation"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    await expect(page.locator('.lens-toggle-btn').first()).toBeVisible();
  });

  test('controls expander is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      document.querySelector('[data-scene="tool-invocation"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    const expander = page.locator('.fr-controls-expand');
    await expect(expander).toBeVisible();
  });
});

test.describe('reduced-motion', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'reduced-motion') test.skip();
  });

  test('page content is readable and interactive under reduced motion', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('.teaser-heading');
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('lens-toggle button is clickable under reduced motion', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="tool-invocation"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    const productBtn = page.locator('.lens-toggle-btn', { hasText: 'Product' });
    await expect(productBtn).toBeVisible();
    expect(await productBtn.isEnabled()).toBe(true);
  });
});
