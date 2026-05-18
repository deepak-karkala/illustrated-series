import type { StorySessionState, SceneId } from '../story/state';
import type { DerivedViewModel, TimelineStep, SimulatorPanelProps } from '../story/view-model';

const ALL_TIMELINE_STEPS: TimelineStep[] = [
  { id: 'l-1', label: 'Request intake', status: 'future' },
  { id: 'l-2', label: 'Harness frames task', status: 'future' },
  { id: 'l-3', label: 'Model reads context', status: 'future' },
  { id: 'l-4', label: 'Model proposes action', status: 'future' },
  { id: 'l-5', label: 'Harness checks permissions', status: 'future' },
  { id: 'l-6', label: 'Tool executes', status: 'future' },
  { id: 'l-7', label: 'Observation returns', status: 'future' },
  { id: 'l-8', label: 'Context updates', status: 'future' },
];

function timelineForScene(sceneId: SceneId): TimelineStep[] {
  const activeIndex: Record<SceneId, number | null> = {
    'teaser-cross-section': null,
    'model-only-misconception': null,
    'harness-framing': null,
    'first-loop': 2,
    'tool-invocation': 4,
    'permission-gate': 5,
    'context-pressure': 6,
    'compaction': 7,
    'memory-retrieval': 7,
    'failure-permission-blocked': 5,
    'failure-tool-failure': 6,
    'field-guide-summary': null,
    'appendix-method': null,
  };

  const idx = activeIndex[sceneId];
  if (idx === null) return [];

  return ALL_TIMELINE_STEPS.map((s, i) => ({
    ...s,
    status: i < idx ? 'past' : i === idx ? 'active' : 'future',
  } as TimelineStep));
}

function panelForScene(sceneId: SceneId): SimulatorPanelProps {
  const defaults: SimulatorPanelProps = {
    timelineSteps: [],
    contextFillPercent: 45,
    activeToolLabel: null,
    toolResultSummary: null,
    permissionState: 'none',
    memoryArtifactType: 'none',
    harnessVisible: true,
  };

  const sceneProps: Partial<Record<SceneId, Partial<SimulatorPanelProps>>> = {
    'first-loop': {
      contextFillPercent: 45,
      activeToolLabel: 'read_file',
      toolResultSummary: null,
      permissionState: 'none',
    },
    'tool-invocation': {
      contextFillPercent: 55,
      activeToolLabel: 'write_to_file',
      toolResultSummary: 'File written: index.html',
      permissionState: 'allowed',
    },
    'permission-gate': {
      contextFillPercent: 62,
      activeToolLabel: 'bash',
      toolResultSummary: null,
      permissionState: 'checking',
    },
    'context-pressure': {
      contextFillPercent: 85,
      activeToolLabel: 'search_content',
      toolResultSummary: '12 matches in 4 files',
      permissionState: 'allowed',
    },
    'compaction': {
      contextFillPercent: 50,
      activeToolLabel: null,
      toolResultSummary: null,
      permissionState: 'none',
      memoryArtifactType: 'compressed',
    },
    'memory-retrieval': {
      contextFillPercent: 40,
      activeToolLabel: null,
      toolResultSummary: null,
      permissionState: 'none',
      memoryArtifactType: 'retrieved',
    },
  };

  return { ...defaults, ...(sceneProps[sceneId] ?? {}) };
}

export function selectViewModel(state: StorySessionState): DerivedViewModel {
  const timelineSteps = timelineForScene(state.sceneId);
  const panelProps = panelForScene(state.sceneId);

  return {
    timelineSteps,
    panelProps: {
      ...panelProps,
      timelineSteps,
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
