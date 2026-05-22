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

    // Stage 5: Field Guide — scroll to and verify in viewport
    await page.evaluate(() => {
      document.querySelector('#chapter-field-guide')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const fgInView = await page.evaluate(() => {
      const el = document.querySelector('#chapter-field-guide');
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(fgInView).toBe(true);

    // Stage 6: Appendix — scroll to and verify in viewport
    await page.evaluate(() => {
      document.querySelector('#chapter-appendix')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const apInView = await page.evaluate(() => {
      const el = document.querySelector('#chapter-appendix');
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(apInView).toBe(true);
  });

  test('sticky flight recorder panel is a single persistent element', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      document.querySelector('[data-scene="first-loop"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    const panel = page.locator('.flight-recorder-panel');
    await expect(panel).toBeVisible();

    await panel.evaluate((el) => el.setAttribute('data-persistence-marker', 'true'));

    await page.evaluate(() => {
      document.querySelector('[data-scene="compaction"]')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    const afterPanel = page.locator('.flight-recorder-panel[data-persistence-marker="true"]');
    await expect(afterPanel).toBeVisible();
  });
});
