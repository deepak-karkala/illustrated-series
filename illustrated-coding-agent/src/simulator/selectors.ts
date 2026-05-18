import type { StorySessionState } from '../story/state';
import type { DerivedViewModel } from '../story/view-model';
import type { TimelineStep } from '../story/view-model';

export function selectViewModel(state: StorySessionState): DerivedViewModel {
  const timelineSteps: TimelineStep[] = [
    { id: 'l-1', label: 'Request intake', status: 'past' },
    { id: 'l-2', label: 'Harness frames task', status: 'past' },
    { id: 'l-3', label: 'Model reads context', status: 'active' },
    { id: 'l-4', label: 'Model proposes action', status: 'future' },
    { id: 'l-5', label: 'Harness checks permissions', status: 'future' },
    { id: 'l-6', label: 'Tool executes', status: 'future' },
    { id: 'l-7', label: 'Observation returns', status: 'future' },
    { id: 'l-8', label: 'Context updates', status: 'future' },
  ];

  return {
    timelineSteps,
    panelProps: {
      timelineSteps,
      contextFillPercent: 45,
      activeToolLabel: 'read_file',
      toolResultSummary: null,
      permissionState: 'none',
      memoryArtifactType: 'none',
      harnessVisible: true,
    },
    drawerProps: {
      chapterId: state.chapterId,
      sceneId: state.sceneId,
      simulatorStateId: state.simulatorStateId,
      lensMode: state.lensMode,
      failureToggles: state.failureToggles,
    },
    annotations: [],
    teaserAnnotations: [
      {
        id: 't-harness',
        label: 'Harness',
        colorVar: '--color-harness',
        x: 10,
        y: 20,
        width: 140,
      },
      {
        id: 't-model',
        label: 'Model',
        colorVar: '--color-model',
        x: 50,
        y: 55,
        width: 110,
      },
      {
        id: 't-tool',
        label: 'Tool dispatch',
        colorVar: '--color-tool',
        x: 25,
        y: 72,
        width: 160,
      },
    ],
    recoveryCopy: null,
    mobileDisclosureState: 'none',
  };
}
