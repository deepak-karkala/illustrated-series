import { describe, it, expect } from 'vitest';
import { INTRO_CONTENT } from '../../src/story/content';
import { SCENE_DEFINITIONS } from '../../src/story/scene-registry';
import type { SceneId } from '../../src/story/state';

describe('content callout completeness', () => {
  function firstScenePerChapter(): SceneId[] {
    const seen = new Set<string>();
    const result: SceneId[] = [];
    for (const def of SCENE_DEFINITIONS) {
      if (!seen.has(def.chapterId)) {
        seen.add(def.chapterId);
        result.push(def.sceneId);
      }
    }
    return result;
  }

  it('every chapter has at least one analogy in its first scene', () => {
    for (const sceneId of firstScenePerChapter()) {
      const blocks = INTRO_CONTENT.filter((c) => c.sceneId === sceneId);
      const hasAnalogy = blocks.some((c) => c.analogy != null && c.analogy.length > 0);
      expect(hasAnalogy).toBe(true);
    }
  });

  it('every chapter has at least one misconception in its first scene', () => {
    for (const sceneId of firstScenePerChapter()) {
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

  it('every chapter with requiresKeyInsight has key insight per lens mode', () => {
    const chaptersWithKeyInsight = new Set(
      SCENE_DEFINITIONS.filter((d) => d.requiresKeyInsight).map((d) => d.chapterId),
    );

    for (const chId of chaptersWithKeyInsight) {
      const sceneIds = SCENE_DEFINITIONS.filter((d) => d.chapterId === chId).map((d) => d.sceneId);
      const allChapterBlocks = INTRO_CONTENT.filter((c) => sceneIds.includes(c.sceneId));
      const lensModes = [...new Set(allChapterBlocks.map((c) => c.lensMode))];

      for (const lens of lensModes) {
        const lensBlocks = allChapterBlocks.filter((c) => c.lensMode === lens);
        const hasKeyInsight = lensBlocks.some((c) => c.keyInsight != null && c.keyInsight.length > 0);
        expect(hasKeyInsight).toBe(true);
      }
    }
  });
});
