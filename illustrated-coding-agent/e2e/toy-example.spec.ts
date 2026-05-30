import { test, expect } from '@playwright/test';

test.describe('toy example walkthrough', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();
  });

  test('toy chapter has four scenes with progressive panel updates', async ({ page }) => {
    await page.goto('/');

    // Scene 1: toy-read
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-read"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await expect(page.locator('[data-scene="toy-read"]')).toBeVisible();
    await expect(page.locator('.fr-tool-chip')).toBeVisible();

    // Scene 2: toy-write
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-write"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await expect(page.locator('[data-scene="toy-write"]')).toBeVisible();

    // Scene 3: toy-test
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-test"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await expect(page.locator('[data-scene="toy-test"]')).toBeVisible();

    // Scene 4: toy-done
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-done"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await expect(page.locator('[data-scene="toy-done"]')).toBeVisible();
  });

  test('toy panel shows simplified trace without context meter or memory artifact', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-read"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.fr-toy-simplified')).toBeVisible();
    await expect(page.locator('.fr-context')).toHaveCount(0);
    await expect(page.locator('.fr-memory-visual')).toHaveCount(0);
  });

  test('analogy callout and key insight are present in toy chapter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('[data-scene="toy-read"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    await expect(page.locator('.callout-analogy')).toBeVisible();
    await page.locator('[data-scene="toy-done"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('.callout-key-insight')).toBeVisible();
  });
});
