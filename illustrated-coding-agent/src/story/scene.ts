import type { ChapterId, SceneId, LensMode } from './state';

export interface Annotation {
  id: string;
  label: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  colorVar: string;
}

export interface MisconceptionCallout {
  wrong: string;
  actual: string;
  whyItMatters: string;
}

export type InlineDiagramId =
  | 'bare-vs-harnessed'
  | 'chef-and-kitchen'
  | 'harness-subsystems'
  | 'loop-cycle'
  | 'tool-dispatch-sequence'
  | 'permission-funnel'
  | 'context-fill'
  | 'compaction-before-after'
  | 'session-handoff'
  | 'blocked-action-path'
  | 'error-recovery-loop';

export type FlightRecorderComponentId =
  | 'timeline'
  | 'tool-path'
  | 'permission-gate'
  | 'context-meter'
  | 'memory-artifact';

export interface ContentBlock {
  id: string;
  chapterId: ChapterId;
  sceneId: SceneId;
  heading: string;
  body: string;
  lensMode: LensMode;
  analogy?: string;
  keyInsight?: string;
  misconception?: MisconceptionCallout;
}

export interface SceneDefinition {
  sceneId: SceneId;
  chapterId: ChapterId;
  contentBlockIds: string[];
  targetSimulatorStateId: string;
  annotations: Annotation[];
  allowedToggles: string[];
  emphasis: 'narrative' | 'simulator' | 'balanced';
  inlineDiagram?: InlineDiagramId;
  requiresKeyInsight?: boolean;
  progressivePanelComponents?: FlightRecorderComponentId[];
}

export interface TeaserAnnotation {
  id: string;
  label: string;
  colorVar: string;
  x: number;
  y: number;
  width: number;
}
