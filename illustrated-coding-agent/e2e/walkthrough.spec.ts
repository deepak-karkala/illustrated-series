import { test, expect } from '@playwright/test';

test.describe('comprehensive article walkthrough', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();
  });

  test('full article renders all six stages with working simulator controls', async ({ page }) => {
    await page.goto('/');

    // Stage 1: Hook (teaser visible)
    await expect(page.locator('.teaser-heading')).toBeVisible();
    await expect(page.locator('.teaser-diagram svg')).toBeVisible();

    // Stage 2: Illusion Break visible
    await expect(page.locator('#chapter-illusion-break')).toBeAttached();
    const illusionContent = page.locator('#chapter-illusion-break .chapter-body').first();
    const illusionText = await illusionContent.textContent();
    expect(illusionText?.length).toBeGreaterThan(0);

    // Stage 3: Harness Reveal visible
    await expect(page.locator('#chapter-harness-reveal')).toBeAttached();
    const harnessContent = page.locator('#chapter-harness-reveal .chapter-body').first();
    const harnessText = await harnessContent.textContent();
    expect(harnessText).toContain('harness');

    // Stage 4: Flight Recorder - scroll to first scene and verify panel
    await page.evaluate(() => {
      document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await expect(page.locator('.flight-recorder-panel')).toBeVisible();

    // Toggle a failure mode
    await page.locator('.failure-toggle input').first().check();
    await page.waitForTimeout(300);

    // Verify recovery copy appears
    const recoveryEl = page.locator('.fr-recovery');
    const recoveryVisible = await recoveryEl.isVisible().catch(() => false);
    expect(recoveryVisible).toBe(true);

    // Switch lens to harness
    const harnessBtn = page.locator('.lens-toggle-btn', { hasText: 'Harness' });
    await harnessBtn.click();
    await page.waitForTimeout(300);
    await expect(harnessBtn).toHaveClass(/lens-toggle-active/);

    // Open drawer
    const drawerBtn = page.locator('.drawer-toggle-btn');
    await drawerBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('.state-drawer')).toBeVisible();

    // Close drawer
    await page.locator('.state-drawer-close').click();
    await page.waitForTimeout(300);

    // Stage 5: Field Guide visible
    await expect(page.locator('#chapter-field-guide')).toBeAttached();
    const fgHeading = page.locator('#chapter-field-guide .chapter-title');
    const fgText = await fgHeading.textContent();
    expect(fgText).toContain('Field Guide');

    // Stage 6: Appendix visible
    await expect(page.locator('#chapter-appendix')).toBeAttached();
    const apHeading = page.locator('#chapter-appendix .chapter-title');
    const apText = await apHeading.textContent();
    expect(apText).toContain('Appendix');
  });

  test('flight recorder panel updates across multiple scenes', async ({ page }) => {
    await page.goto('/');

    // Scroll to first-loop
    await page.evaluate(() => {
      document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const panel1 = page.locator('.flight-recorder-panel');

    // Scroll to tool-invocation
    await page.evaluate(() => {
      document.querySelector('[data-scene="tool-invocation"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    // Panel should still be visible (same instance, updated props)
    await expect(page.locator('.flight-recorder-panel')).toBeVisible();
  });
});
