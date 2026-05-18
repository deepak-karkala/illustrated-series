import type { Annotation, TeaserAnnotation } from '../story/scene';
import type { FailureToggles, LensMode } from '../story/state';

export interface TimelineStep {
  id: string;
  label: string;
  status: 'past' | 'active' | 'future';
}

export interface SimulatorPanelProps {
  timelineSteps: TimelineStep[];
  contextFillPercent: number;
  activeToolLabel: string | null;
  toolResultSummary: string | null;
  permissionState: 'none' | 'checking' | 'allowed' | 'blocked';
  memoryArtifactType: 'none' | 'working' | 'compressed' | 'retrieved' | 'stale';
  harnessVisible: boolean;
}

export interface DrawerProps {
  chapterId: string;
  sceneId: string;
  simulatorStateId: string;
  lensMode: LensMode;
  failureToggles: FailureToggles;
}

export interface DerivedViewModel {
  timelineSteps: TimelineStep[];
  panelProps: SimulatorPanelProps;
  drawerProps: DrawerProps;
  annotations: Annotation[];
  teaserAnnotations: TeaserAnnotation[];
  recoveryCopy: string | null;
  mobileDisclosureState: 'controls' | 'drawer' | 'none';
}
