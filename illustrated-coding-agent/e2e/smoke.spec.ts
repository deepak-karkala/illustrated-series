import { test, expect } from '@playwright/test';

test('page loads and renders the teaser viewport', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toBeVisible();

  const heading = page.locator('.teaser-heading');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('coding agent');
});

test('teaser renders the system diagram SVG', async ({ page }) => {
  await page.goto('/');

  const svg = page.locator('svg');
  await expect(svg).toBeVisible();

  await expect(svg).toHaveAttribute('aria-label', 'Coding agent system diagram');
});

test('page applies paper background color from DESIGN.md tokens', async ({ page }) => {
  await page.goto('/');

  const bgColor = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });

  expect(bgColor).toBe('rgb(244, 240, 232)');
});

test('teaser heading uses Fraunces font', async ({ page }) => {
  await page.goto('/');

  const fontFamily = await page.evaluate(() => {
    const el = document.querySelector('.teaser-heading');
    return el ? getComputedStyle(el).fontFamily : '';
  });

  expect(fontFamily).toContain('Fraunces');
});

test('teaser contains a partial cross-section, not a generic hero', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.teaser-diagram')).toBeVisible();
  await expect(page.locator('.teaser-diagram svg')).toBeVisible();
});
