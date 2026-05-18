import type { ChapterId, SceneId, LensMode } from './state';

export interface Annotation {
  id: string;
  label: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  colorVar: string;
}

export interface ContentBlock {
  id: string;
  chapterId: ChapterId;
  sceneId: SceneId;
  heading: string;
  body: string;
  lensMode: LensMode;
}

export interface SceneDefinition {
  sceneId: SceneId;
  chapterId: ChapterId;
  contentBlockIds: string[];
  targetSimulatorStateId: string;
  annotations: Annotation[];
  allowedToggles: string[];
  emphasis: 'narrative' | 'simulator' | 'balanced';
}

export interface TeaserAnnotation {
  id: string;
  label: string;
  colorVar: string;
  x: number;
  y: number;
  width: number;
}
