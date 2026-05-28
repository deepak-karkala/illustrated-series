import { describe, it, expect } from 'vitest';
import { INTRO_CONTENT } from '../../src/story/content';
import { SCENE_DEFINITIONS } from '../../src/story/scene-registry';
import type { SceneId } from '../../src/story/state';

describe('content callout completeness', () => {
  const narrativeSceneIds: SceneId[] = [
    'teaser-cross-section',
    'model-only-misconception',
    'harness-framing',
    'first-loop',
    'tool-invocation',
    'permission-gate',
    'context-pressure',
    'compaction',
    'memory-retrieval',
    'failure-permission-blocked',
    'failure-tool-failure',
    'field-guide-summary',
    'appendix-method',
  ];

  it('every narrative scene has at least one analogy across all lens modes', () => {
    for (const sceneId of narrativeSceneIds) {
      const blocks = INTRO_CONTENT.filter((c) => c.sceneId === sceneId);
      const hasAnalogy = blocks.some((c) => c.analogy != null && c.analogy.length > 0);
      expect(hasAnalogy).toBe(true);
    }
  });

  it('every narrative scene has at least one misconception across all lens modes', () => {
    for (const sceneId of narrativeSceneIds) {
      const blocks = INTRO_CONTENT.filter((c) => c.sceneId === sceneId);
      const hasMisconception = blocks.some(
        (c) => c.misconception != null
          && c.misconception.wrong.length > 0
          && c.misconception.actual.length > 0
          && c.misconception.whyItMatters.length > 0,
      );
      expect(hasMisconception).toBe(true);
    }
  });

  it('every scene with requiresKeyInsight has a product-lens key insight', () => {
    for (const def of SCENE_DEFINITIONS) {
      if (!def.requiresKeyInsight) continue;

      const blocks = INTRO_CONTENT.filter(
        (c) => c.sceneId === def.sceneId && c.lensMode === 'product',
      );
      const hasKeyInsight = blocks.some((c) => c.keyInsight != null && c.keyInsight.length > 0);
      expect(hasKeyInsight).toBe(true);
    }
  });

  it('scenes with both lens modes have key insight for harness lens too', () => {
    for (const def of SCENE_DEFINITIONS) {
      if (!def.requiresKeyInsight) continue;

      const allSceneBlocks = INTRO_CONTENT.filter((c) => c.sceneId === def.sceneId);
      const lensModes = [...new Set(allSceneBlocks.map((c) => c.lensMode))];

      for (const lens of lensModes) {
        const lensBlocks = allSceneBlocks.filter((c) => c.lensMode === lens);
        const hasKeyInsight = lensBlocks.some((c) => c.keyInsight != null && c.keyInsight.length > 0);
        expect(hasKeyInsight).toBe(true);
      }
    }
  });
});
