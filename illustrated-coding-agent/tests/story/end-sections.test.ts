import { describe, it, expect } from 'vitest';
import { INTRO_CONTENT } from '../../src/story/content';
import {
  CHAPTER_ORDER,
  CHAPTER_SCENES,
  SCENE_DEFINITIONS,
  getNextScene,
  getPrevScene,
} from '../../src/story/scene-registry';
import type { ChapterId } from '../../src/story/state';

describe('field guide and appendix section ordering', () => {
  it('field-guide comes after flight-recorder in CHAPTER_ORDER', () => {
    const frIdx = CHAPTER_ORDER.indexOf('flight-recorder');
    const fgIdx = CHAPTER_ORDER.indexOf('field-guide');
    expect(fgIdx).toBeGreaterThan(frIdx);
  });

  it('appendix comes after field-guide in CHAPTER_ORDER', () => {
    const fgIdx = CHAPTER_ORDER.indexOf('field-guide');
    const apIdx = CHAPTER_ORDER.indexOf('appendix');
    expect(apIdx).toBeGreaterThan(fgIdx);
  });

  it('appendix is the last chapter', () => {
    const apIdx = CHAPTER_ORDER.indexOf('appendix');
    expect(apIdx).toBe(CHAPTER_ORDER.length - 1);
  });

  it('getNextScene from last FR scene goes to field-guide', () => {
    const next = getNextScene('failure-tool-failure');
    expect(next).toBe('field-guide-summary');
  });

  it('getNextScene from field-guide goes to appendix', () => {
    const next = getNextScene('field-guide-summary');
    expect(next).toBe('appendix-method');
  });

  it('getNextScene from appendix returns null', () => {
    expect(getNextScene('appendix-method')).toBeNull();
  });

  it('getPrevScene from field-guide returns last FR scene', () => {
    const prev = getPrevScene('field-guide-summary');
    expect(prev).toBe('failure-tool-failure');
  });

  it('field-guide and appendix have exactly one scene each', () => {
    expect(CHAPTER_SCENES['field-guide']).toHaveLength(1);
    expect(CHAPTER_SCENES['appendix']).toHaveLength(1);
  });
});

describe('field guide and appendix content validity', () => {
  const fgBlockIds = INTRO_CONTENT
    .filter((c) => c.chapterId === 'field-guide')
    .map((c) => c.id);

  const apBlockIds = INTRO_CONTENT
    .filter((c) => c.chapterId === 'appendix')
    .map((c) => c.id);

  it('field guide has at least 4 content blocks', () => {
    expect(fgBlockIds.length).toBeGreaterThanOrEqual(4);
  });

  it('appendix has at least 4 content blocks', () => {
    expect(apBlockIds.length).toBeGreaterThanOrEqual(4);
  });

  it('field guide content blocks belong to field-guide-summary scene', () => {
    for (const block of INTRO_CONTENT.filter((c) => c.chapterId === 'field-guide')) {
      expect(block.sceneId).toBe('field-guide-summary');
    }
  });

  it('appendix content blocks belong to appendix-method scene', () => {
    for (const block of INTRO_CONTENT.filter((c) => c.chapterId === 'appendix')) {
      expect(block.sceneId).toBe('appendix-method');
    }
  });

  it('every field-guide scene definition references existing content', () => {
    const fgDef = SCENE_DEFINITIONS.find((d) => d.sceneId === 'field-guide-summary');
    expect(fgDef).toBeDefined();
    for (const blockId of fgDef!.contentBlockIds) {
      expect(fgBlockIds).toContain(blockId);
    }
  });

  it('every appendix scene definition references existing content', () => {
    const apDef = SCENE_DEFINITIONS.find((d) => d.sceneId === 'appendix-method');
    expect(apDef).toBeDefined();
    for (const blockId of apDef!.contentBlockIds) {
      expect(apBlockIds).toContain(blockId);
    }
  });

  it('field-guide scene has narrative emphasis', () => {
    const def = SCENE_DEFINITIONS.find((d) => d.sceneId === 'field-guide-summary');
    expect(def!.emphasis).toBe('narrative');
  });

  it('appendix scene has narrative emphasis', () => {
    const def = SCENE_DEFINITIONS.find((d) => d.sceneId === 'appendix-method');
    expect(def!.emphasis).toBe('narrative');
  });
});

describe('missing content fails loudly', () => {
  it('no content block references a non-existent chapter', () => {
    const validChapters = new Set<ChapterId>(CHAPTER_ORDER);

    for (const block of INTRO_CONTENT) {
      expect(validChapters.has(block.chapterId)).toBe(true);
    }
  });

  it('no content block references a non-existent scene', () => {
    for (const block of INTRO_CONTENT) {
      const chapterScenes = CHAPTER_SCENES[block.chapterId];
      expect(chapterScenes).toBeDefined();
      expect(chapterScenes).toContain(block.sceneId);
    }
  });

  it('every scene definition has at least one content block', () => {
    for (const def of SCENE_DEFINITIONS) {
      expect(def.contentBlockIds.length).toBeGreaterThan(0);
    }
  });

  it('every content block id is unique', () => {
    const ids = INTRO_CONTENT.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
