import type { StorySessionState, ChapterId, LensMode } from '../story/state';
import { getChapterId, getSceneIds, SCENE_DEFINITIONS } from '../story/scene-registry';
import { INTRO_CONTENT } from '../story/content';

const VALID_CHAPTER_IDS = new Set<ChapterId>([
  'hook',
  'illusion-break',
  'harness-reveal',
  'flight-recorder',
  'field-guide',
  'appendix',
]);

const VALID_LENS_MODES = new Set<LensMode>(['product', 'harness']);

export interface ValidationResult {
  state: StorySessionState;
  warnings: string[];
}

export function validateAndNormalize(state: StorySessionState): ValidationResult {
  const warnings: string[] = [];
  const normalized = { ...state };

  if (!VALID_CHAPTER_IDS.has(normalized.chapterId)) {
    warnings.push(`Invalid chapterId "${normalized.chapterId}", normalizing to "hook"`);
    normalized.chapterId = 'hook';
  }

  const sceneChapter = getChapterId(normalized.sceneId);
  if (sceneChapter && sceneChapter !== normalized.chapterId) {
    warnings.push(
      `Scene-chapter mismatch: scene "${normalized.sceneId}" belongs to "${sceneChapter}", fixing chapterId`,
    );
    normalized.chapterId = sceneChapter;
  }

  const chapterScenes = getSceneIds(normalized.chapterId);
  if (!chapterScenes.includes(normalized.sceneId)) {
    const fixedScene = chapterScenes[0];
    warnings.push(
      `Scene "${normalized.sceneId}" does not belong to chapter "${normalized.chapterId}", normalizing to "${fixedScene}"`,
    );
    normalized.sceneId = fixedScene;
  }

  if (!VALID_LENS_MODES.has(normalized.lensMode)) {
    warnings.push(`Invalid lensMode "${String(normalized.lensMode)}", normalizing to "product"`);
    normalized.lensMode = 'product';
  }

  if (normalized.reducedMotion !== true && normalized.reducedMotion !== false) {
    warnings.push('reducedMotion was not boolean, normalizing to false');
    normalized.reducedMotion = false;
  }

  if (normalized.drawerOpen !== true && normalized.drawerOpen !== false) {
    warnings.push('drawerOpen was not boolean, normalizing to false');
    normalized.drawerOpen = false;
  }

  if (normalized.mobileControlsOpen !== true && normalized.mobileControlsOpen !== false) {
    warnings.push('mobileControlsOpen was not boolean, normalizing to false');
    normalized.mobileControlsOpen = false;
  }

  const sceneDef = SCENE_DEFINITIONS.find((s) => s.sceneId === normalized.sceneId);
  if (sceneDef) {
    normalized.simulatorStateId = sceneDef.targetSimulatorStateId;
  }

  if (normalized.teaserMode && normalized.chapterId !== 'hook') {
    normalized.teaserMode = false;
  }

  return { state: normalized, warnings };
}

export function validateContentSchema(): string[] {
  const warnings: string[] = [];

  for (const def of SCENE_DEFINITIONS) {
    const sceneContent = INTRO_CONTENT.filter((c) => c.sceneId === def.sceneId);

    if (def.requiresKeyInsight) {
      const hasKeyInsight = sceneContent.some((c) => c.keyInsight != null);
      if (!hasKeyInsight) {
        warnings.push(`Scene "${def.sceneId}" requires a key insight but none found in content`);
      }
    }
  }

  return warnings;
}
