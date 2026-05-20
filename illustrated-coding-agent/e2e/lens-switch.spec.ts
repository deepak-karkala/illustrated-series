import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.project.name !== 'chromium') test.skip();
});

test('lens toggle switches product to harness and back', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  const productBtn = page.locator('.lens-toggle-btn', { hasText: 'Product' });
  const harnessBtn = page.locator('.lens-toggle-btn', { hasText: 'Harness' });

  await expect(productBtn).toBeVisible();
  await expect(harnessBtn).toBeVisible();

  await expect(productBtn).toHaveClass(/lens-toggle-active/);
  await expect(harnessBtn).not.toHaveClass(/lens-toggle-active/);

  await harnessBtn.click();
  await expect(harnessBtn).toHaveClass(/lens-toggle-active/);
  await expect(productBtn).not.toHaveClass(/lens-toggle-active/);

  await productBtn.click();
  await expect(productBtn).toHaveClass(/lens-toggle-active/);
  await expect(harnessBtn).not.toHaveClass(/lens-toggle-active/);
});

test('lens switch preserves causal panel state', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  const contextMeter = page.locator('[aria-label*="Context window at"]');
  const initialText = await contextMeter.textContent();

  const harnessBtn = page.locator('.lens-toggle-btn', { hasText: 'Harness' });
  await harnessBtn.click();
  await page.waitForTimeout(300);

  const afterSwitchText = await contextMeter.textContent();

  expect(afterSwitchText).toBe(initialText);
});
