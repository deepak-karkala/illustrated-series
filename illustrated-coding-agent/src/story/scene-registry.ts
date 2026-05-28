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

export const SCENE_DEFINITIONS: SceneDefinition[] = [
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
    inlineDiagram: 'bare-vs-harnessed',
    requiresKeyInsight: true,
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
    inlineDiagram: 'chef-and-kitchen',
    requiresKeyInsight: true,
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
    inlineDiagram: 'harness-subsystems',
    requiresKeyInsight: true,
  },
  {
    sceneId: 'first-loop',
    chapterId: 'flight-recorder',
    contentBlockIds: ['loop-intro', 'loop-request-intake'],
    targetSimulatorStateId: 'first-loop',
    annotations: [
      { id: 'a-timeline', label: 'Agent timeline', position: 'top', colorVar: '--color-harness' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
    inlineDiagram: 'loop-cycle',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline'],
  },
  {
    sceneId: 'tool-invocation',
    chapterId: 'flight-recorder',
    contentBlockIds: ['tool-invocation-intro', 'tool-dispatch'],
    targetSimulatorStateId: 'tool-invocation',
    annotations: [
      { id: 'a-tool-card', label: 'Tool card', position: 'right', colorVar: '--color-tool' },
    ],
    allowedToggles: [],
    emphasis: 'balanced',
    inlineDiagram: 'tool-dispatch-sequence',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path'],
  },
  {
    sceneId: 'permission-gate',
    chapterId: 'flight-recorder',
    contentBlockIds: ['permission-intro', 'permission-approval'],
    targetSimulatorStateId: 'permission-gate',
    annotations: [
      { id: 'a-gate', label: 'Permission gate', position: 'top', colorVar: '--color-warning' },
    ],
    allowedToggles: [],
    emphasis: 'balanced',
    inlineDiagram: 'permission-funnel',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path', 'permission-gate'],
  },
  {
    sceneId: 'context-pressure',
    chapterId: 'flight-recorder',
    contentBlockIds: ['context-intro', 'context-pressure-body'],
    targetSimulatorStateId: 'context-pressure',
    annotations: [
      { id: 'a-context-meter', label: 'Context meter', position: 'right', colorVar: '--color-memory' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
    inlineDiagram: 'context-fill',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path', 'permission-gate', 'context-meter'],
  },
  {
    sceneId: 'compaction',
    chapterId: 'flight-recorder',
    contentBlockIds: ['compaction-intro', 'compaction-tradeoff'],
    targetSimulatorStateId: 'compaction',
    annotations: [
      { id: 'a-compaction', label: 'Compaction', position: 'right', colorVar: '--color-memory' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
    inlineDiagram: 'compaction-before-after',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
  },
  {
    sceneId: 'memory-retrieval',
    chapterId: 'flight-recorder',
    contentBlockIds: ['memory-intro', 'memory-retrieval-body'],
    targetSimulatorStateId: 'memory-retrieval',
    annotations: [
      { id: 'a-memory', label: 'Memory retrieval', position: 'right', colorVar: '--color-memory' },
    ],
    allowedToggles: [],
    emphasis: 'balanced',
    inlineDiagram: 'session-handoff',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
  },
  {
    sceneId: 'failure-permission-blocked',
    chapterId: 'flight-recorder',
    contentBlockIds: ['failure-permission-intro', 'failure-permission-recovery'],
    targetSimulatorStateId: 'failure-permission-blocked',
    annotations: [
      { id: 'a-perm-blocked', label: 'Permission denied', position: 'top', colorVar: '--color-warning' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
    inlineDiagram: 'blocked-action-path',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
  },
  {
    sceneId: 'failure-tool-failure',
    chapterId: 'flight-recorder',
    contentBlockIds: ['failure-tool-intro', 'failure-tool-recovery'],
    targetSimulatorStateId: 'failure-tool-failure',
    annotations: [
      { id: 'a-tool-fail', label: 'Tool failed', position: 'top', colorVar: '--color-warning' },
    ],
    allowedToggles: [],
    emphasis: 'simulator',
    inlineDiagram: 'error-recovery-loop',
    requiresKeyInsight: true,
    progressivePanelComponents: ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
  },
  {
    sceneId: 'field-guide-summary',
    chapterId: 'field-guide',
    contentBlockIds: [
      'field-guide-intro',
      'field-guide-harness',
      'field-guide-context',
      'field-guide-boundaries',
      'field-guide-verify',
    ],
    targetSimulatorStateId: 'field-guide',
    annotations: [],
    allowedToggles: [],
    emphasis: 'narrative',
    requiresKeyInsight: true,
  },
  {
    sceneId: 'appendix-method',
    chapterId: 'appendix',
    contentBlockIds: [
      'appendix-intro',
      'appendix-corpus',
      'appendix-simulator',
      'appendix-reuse',
      'appendix-consulting',
    ],
    targetSimulatorStateId: 'appendix',
    annotations: [],
    allowedToggles: [],
    emphasis: 'narrative',
    requiresKeyInsight: false,
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
  return SCENE_DEFINITIONS.find((s) => s.sceneId === sceneId) ?? null;
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
