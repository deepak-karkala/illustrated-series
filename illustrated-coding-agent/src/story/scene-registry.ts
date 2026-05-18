import type { ChapterId, SceneId } from './state';
import type { SceneDefinition } from './scene';

export const CHAPTER_ORDER: ChapterId[] = [
  'hook',
  'illusion-break',
  'harness-reveal',
  'flight-recorder',
  'field-guide',
  'appendix',
];

export const CHAPTER_SCENES: Record<ChapterId, SceneId[]> = {
  'hook': ['teaser-cross-section'],
  'illusion-break': ['model-only-misconception'],
  'harness-reveal': ['harness-framing'],
  'flight-recorder': [
    'first-loop',
    'tool-invocation',
    'permission-gate',
    'context-pressure',
    'compaction',
    'memory-retrieval',
    'failure-permission-blocked',
    'failure-tool-failure',
  ],
  'field-guide': ['field-guide-summary'],
  'appendix': ['appendix-method'],
};

export const INTRO_SCENE_DEFINITIONS: SceneDefinition[] = [
  {
    sceneId: 'teaser-cross-section',
    chapterId: 'hook',
    contentBlockIds: ['hook-heading', 'hook-body'],
    targetSimulatorStateId: 'teaser',
    annotations: [
      { id: 'a-model', label: 'Model', position: 'right', colorVar: '--color-model' },
      { id: 'a-harness', label: 'Harness', position: 'top', colorVar: '--color-harness' },
      { id: 'a-tool', label: 'Tool dispatch', position: 'right', colorVar: '--color-tool' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
  },
  {
    sceneId: 'model-only-misconception',
    chapterId: 'illusion-break',
    contentBlockIds: ['illusion-heading', 'illusion-contrast'],
    targetSimulatorStateId: 'model-only',
    annotations: [
      { id: 'a-model-only', label: 'Model only', position: 'right', colorVar: '--color-model' },
      { id: 'a-no-tools', label: 'No tools', position: 'bottom', colorVar: '--color-warning' },
      { id: 'a-no-state', label: 'No memory', position: 'left', colorVar: '--color-warning' },
    ],
    allowedToggles: [],
    emphasis: 'balanced',
  },
  {
    sceneId: 'harness-framing',
    chapterId: 'harness-reveal',
    contentBlockIds: ['harness-heading', 'harness-subsystems'],
    targetSimulatorStateId: 'harness-framing',
    annotations: [
      { id: 'a-harness-frame', label: 'Harness', position: 'top', colorVar: '--color-harness' },
      { id: 'a-model-inner', label: 'Model (inside)', position: 'right', colorVar: '--color-model' },
      { id: 'a-tools', label: 'Tools', position: 'right', colorVar: '--color-tool' },
      { id: 'a-context', label: 'Context', position: 'left', colorVar: '--color-memory' },
      { id: 'a-permissions', label: 'Permissions', position: 'bottom', colorVar: '--color-warning' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
  },
];

export function getSceneIds(chapterId: ChapterId): SceneId[] {
  return CHAPTER_SCENES[chapterId] ?? [];
}

export function getChapterId(sceneId: SceneId): ChapterId | null {
  for (const [chId, scenes] of Object.entries(CHAPTER_SCENES)) {
    if (scenes.includes(sceneId)) return chId as ChapterId;
  }
  return null;
}

export function getSceneDefinition(sceneId: SceneId): SceneDefinition | null {
  return INTRO_SCENE_DEFINITIONS.find((s) => s.sceneId === sceneId) ?? null;
}

export function getNextScene(currentSceneId: SceneId): SceneId | null {
  const chId = getChapterId(currentSceneId);
  if (!chId) return null;

  const scenes = CHAPTER_SCENES[chId];
  const idx = scenes.indexOf(currentSceneId);
  if (idx < scenes.length - 1) return scenes[idx + 1];

  const chIdx = CHAPTER_ORDER.indexOf(chId);
  if (chIdx < CHAPTER_ORDER.length - 1) {
    const nextChId = CHAPTER_ORDER[chIdx + 1];
    return CHAPTER_SCENES[nextChId][0] ?? null;
  }

  return null;
}

export function getPrevScene(currentSceneId: SceneId): SceneId | null {
  const chId = getChapterId(currentSceneId);
  if (!chId) return null;

  const scenes = CHAPTER_SCENES[chId];
  const idx = scenes.indexOf(currentSceneId);
  if (idx > 0) return scenes[idx - 1];

  const chIdx = CHAPTER_ORDER.indexOf(chId);
  if (chIdx > 0) {
    const prevChId = CHAPTER_ORDER[chIdx - 1];
    const prevScenes = CHAPTER_SCENES[prevChId];
    return prevScenes[prevScenes.length - 1] ?? null;
  }

  return null;
}
