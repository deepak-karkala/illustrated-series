export type ChapterId = 'hook' | 'illusion-break' | 'harness-reveal' | 'flight-recorder' | 'field-guide' | 'appendix';

export type SceneId =
  | 'teaser-cross-section'
  | 'model-only-misconception'
  | 'harness-framing'
  | 'first-loop'
  | 'tool-invocation'
  | 'permission-gate'
  | 'context-pressure'
  | 'compaction'
  | 'memory-retrieval'
  | 'failure-permission-blocked'
  | 'failure-tool-failure'
  | 'field-guide-summary'
  | 'appendix-method';

export type LensMode = 'product' | 'harness';

export interface FailureToggles {
  permissionBlocked: boolean;
  toolFailure: boolean;
}

export interface StorySessionState {
  chapterId: ChapterId;
  sceneId: SceneId;
  lensMode: LensMode;
  failureToggles: FailureToggles;
  reducedMotion: boolean;
  drawerOpen: boolean;
  mobileControlsOpen: boolean;
  teaserMode: boolean;
  simulatorStateId: string;
}

export const DEFAULT_SESSION_STATE: StorySessionState = {
  chapterId: 'hook',
  sceneId: 'teaser-cross-section',
  lensMode: 'product',
  failureToggles: {
    permissionBlocked: false,
    toolFailure: false,
  },
  reducedMotion: false,
  drawerOpen: false,
  mobileControlsOpen: false,
  teaserMode: true,
  simulatorStateId: 'teaser',
};
