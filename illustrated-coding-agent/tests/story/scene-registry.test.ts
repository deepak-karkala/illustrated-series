import { describe, it, expect } from 'vitest';
import {
  CHAPTER_ORDER,
  CHAPTER_SCENES,
  SCENE_DEFINITIONS,
  getSceneIds,
  getChapterId,
  getSceneDefinition,
  getNextScene,
  getPrevScene,
} from '../../src/story/scene-registry';
import { INTRO_CONTENT } from '../../src/story/content';
import type { SceneId } from '../../src/story/state';

describe('chapter-to-scene mapping', () => {
  it('maps hook chapter to teaser-cross-section scene', () => {
    const scenes = getSceneIds('hook');
    expect(scenes).toEqual(['teaser-cross-section']);
  });

  it('maps illusion-break chapter to model-only-misconception scene', () => {
    const scenes = getSceneIds('illusion-break');
    expect(scenes).toEqual(['model-only-misconception']);
  });

  it('maps harness-reveal chapter to harness-framing scene', () => {
    const scenes = getSceneIds('harness-reveal');
    expect(scenes).toEqual(['harness-framing']);
  });

  it('maps flight-recorder chapter to all loop and failure scenes', () => {
    const scenes = getSceneIds('flight-recorder');
    expect(scenes).toContain('first-loop');
    expect(scenes).toContain('tool-invocation');
    expect(scenes).toContain('permission-gate');
    expect(scenes).toContain('context-pressure');
    expect(scenes).toContain('compaction');
    expect(scenes).toContain('memory-retrieval');
    expect(scenes).toContain('failure-permission-blocked');
    expect(scenes).toContain('failure-tool-failure');
  });
});

describe('scene-to-chapter reverse lookup', () => {
  it('maps teaser-cross-section to hook', () => {
    expect(getChapterId('teaser-cross-section')).toBe('hook');
  });

  it('maps model-only-misconception to illusion-break', () => {
    expect(getChapterId('model-only-misconception')).toBe('illusion-break');
  });

  it('maps harness-framing to harness-reveal', () => {
    expect(getChapterId('harness-framing')).toBe('harness-reveal');
  });

  it('maps every defined scene to a valid chapter', () => {
    for (const def of SCENE_DEFINITIONS) {
      const chId = getChapterId(def.sceneId);
      expect(chId).not.toBeNull();
      expect(CHAPTER_ORDER).toContain(chId!);
    }
  });
});

describe('scene navigation', () => {
  it('getNextScene advances within the same chapter', () => {
    const next = getNextScene('first-loop');
    expect(next).toBe('tool-invocation');
  });

  it('getNextScene crosses chapter boundaries on last scene', () => {
    const next = getNextScene('harness-framing');
    expect(next).toBe('first-loop');
  });

  it('getPrevScene retreats within the same chapter', () => {
    const prev = getPrevScene('tool-invocation');
    expect(prev).toBe('first-loop');
  });

  it('getPrevScene crosses chapter boundaries on first scene', () => {
    const prev = getPrevScene('first-loop');
    expect(prev).toBe('harness-framing');
  });

  it('getNextScene returns null at end of all chapters', () => {
    const next = getNextScene('appendix-method');
    expect(next).toBeNull();
  });

  it('getPrevScene returns null at start of all chapters', () => {
    const prev = getPrevScene('teaser-cross-section');
    expect(prev).toBeNull();
  });

  it('getNextScene/getPrevScene are symmetric within the middle', () => {
    const scenes: SceneId[] = [
      'teaser-cross-section',
      'model-only-misconception',
      'harness-framing',
      'first-loop',
      'tool-invocation',
    ];
    for (let i = 0; i < scenes.length - 1; i++) {
      const next = getNextScene(scenes[i]);
      expect(next).toBe(scenes[i + 1]);
      const back = getPrevScene(next!);
      expect(back).toBe(scenes[i]);
    }
  });
});

describe('scene definitions', () => {
  it('every intro scene definition references existing content blocks', () => {
    const allContentIds = new Set(INTRO_CONTENT.map((c) => c.id));

    for (const def of SCENE_DEFINITIONS) {
      for (const blockId of def.contentBlockIds) {
        expect(allContentIds.has(blockId)).toBe(true);
      }
    }
  });

  it('every intro scene definition has a valid chapterId', () => {
    for (const def of SCENE_DEFINITIONS) {
      expect(CHAPTER_ORDER).toContain(def.chapterId);
    }
  });

  it('getSceneDefinition returns the correct definition', () => {
    const def = getSceneDefinition('model-only-misconception');
    expect(def).not.toBeNull();
    expect(def!.chapterId).toBe('illusion-break');
    expect(def!.emphasis).toBe('balanced');
  });

  it('getSceneDefinition returns null for unknown scenes', () => {
    const def = getSceneDefinition('nonexistent' as SceneId);
    expect(def).toBeNull();
  });
});

describe('content modules', () => {
  it('every content block maps to a valid chapter', () => {
    for (const block of INTRO_CONTENT) {
      expect(CHAPTER_ORDER).toContain(block.chapterId);
    }
  });

  it('every content block maps to a valid scene', () => {
    for (const block of INTRO_CONTENT) {
      const chapterScenes = CHAPTER_SCENES[block.chapterId];
      expect(chapterScenes).toContain(block.sceneId);
    }
  });

  it('hook chapter has content for its scene', () => {
    const hookContent = INTRO_CONTENT.filter((c) => c.chapterId === 'hook');
    expect(hookContent.length).toBeGreaterThan(0);
    expect(hookContent.every((c) => c.sceneId === 'teaser-cross-section')).toBe(true);
  });

  it('illusion-break chapter has content for its scene', () => {
    const content = INTRO_CONTENT.filter((c) => c.chapterId === 'illusion-break');
    expect(content.length).toBeGreaterThan(0);
    expect(content.every((c) => c.sceneId === 'model-only-misconception')).toBe(true);
  });

  it('harness-reveal chapter has content for its scene', () => {
    const content = INTRO_CONTENT.filter((c) => c.chapterId === 'harness-reveal');
    expect(content.length).toBeGreaterThan(0);
    expect(content.every((c) => c.sceneId === 'harness-framing')).toBe(true);
  });
});

describe('chapter order', () => {
  it('contains all six stages', () => {
    expect(CHAPTER_ORDER).toEqual([
      'hook',
      'illusion-break',
      'harness-reveal',
      'flight-recorder',
      'field-guide',
      'appendix',
    ]);
  });

  it('every chapter has at least one scene', () => {
    for (const chId of CHAPTER_ORDER) {
      const scenes = CHAPTER_SCENES[chId];
      expect(scenes.length).toBeGreaterThan(0);
    }
  });
});
