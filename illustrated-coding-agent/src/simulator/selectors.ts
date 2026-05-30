import type { StorySessionState, SceneId, FailureToggles } from '../story/state';
import type { DerivedViewModel, TimelineStep, SimulatorPanelProps } from '../story/view-model';
import { getLensLabels, applyLensLabels } from '../story/lens-labels';
import { SCENE_DEFINITIONS } from '../story/scene-registry';

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
  if (sceneId.startsWith('toy-')) {
    const toySteps: { id: string; label: string }[] = [
      { id: 't-1', label: 'Read file' },
      { id: 't-2', label: 'Write change' },
      { id: 't-3', label: 'Run tests' },
      { id: 't-4', label: 'Done' },
    ];
    const activeMap: Record<string, number> = {
      'toy-read': 0,
      'toy-write': 1,
      'toy-test': 2,
      'toy-done': 3,
    };
    const activeIdx = activeMap[sceneId] ?? 0;
    return toySteps.map((s, i) => ({
      ...s,
      status: i < activeIdx ? 'past' : i === activeIdx ? 'active' : 'future',
    } as TimelineStep));
  }

  const activeIndex: Record<SceneId, number | null> = {
    'teaser-cross-section': null,
    'model-only-misconception': null,
    'harness-framing': null,
    'toy-example-rename': null,
    'toy-read': null,
    'toy-write': null,
    'toy-test': null,
    'toy-done': null,
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

function basePanelForScene(sceneId: SceneId): SimulatorPanelProps {
  const sceneProps: Record<string, Partial<SimulatorPanelProps>> = {
    'toy-read': {
      panelVariant: 'toy',
      activeToolLabel: 'read_file',
      toolResultSummary: 'const userCount = 5;',
    },
    'toy-write': {
      panelVariant: 'toy',
      activeToolLabel: 'write_file',
      toolResultSummary: 'userCount → activeUserCount',
    },
    'toy-test': {
      panelVariant: 'toy',
      activeToolLabel: 'run_tests',
      toolResultSummary: 'All tests pass',
    },
    'toy-done': {
      panelVariant: 'toy',
      activeToolLabel: null,
      toolResultSummary: null,
    },
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
    'failure-permission-blocked': {
      contextFillPercent: 65,
      activeToolLabel: 'bash',
      toolResultSummary: null,
      permissionState: 'blocked',
    },
    'failure-tool-failure': {
      contextFillPercent: 58,
      activeToolLabel: 'run_build',
      toolResultSummary: 'Exit code 1: compilation error',
      permissionState: 'allowed',
    },
  };

  const defaults: SimulatorPanelProps = {
    panelVariant: 'full',
    visibleComponents: [],
    timelineSteps: [],
    contextFillPercent: 45,
    activeToolLabel: null,
    toolResultSummary: null,
    permissionState: 'none',
    permissionLabel: '',
    memoryArtifactType: 'working',
    memoryLabel: 'Working set',
    harnessVisible: true,
  };

  return { ...defaults, ...(sceneProps[sceneId] ?? {}) };
}

function applyFailureToggles(
  base: SimulatorPanelProps,
  toggles: FailureToggles,
): { panel: SimulatorPanelProps; recoveryCopy: string | null } {
  if (!toggles.permissionBlocked && !toggles.toolFailure) {
    return { panel: base, recoveryCopy: null };
  }

  const panel = { ...base };
  let recoveryCopy: string | null = null;

  if (toggles.permissionBlocked) {
    panel.permissionState = 'blocked';
    recoveryCopy =
      'The permission pipeline intercepted a risky action — a command that could affect files outside the sandbox. The harness denied it and returned a structured reason. The agent read the denial, re-planned, and found an alternative that worked within the allowed boundaries. This is the harness protecting the system — not a bug, a feature.';
  }

  if (toggles.toolFailure) {
    panel.activeToolLabel = panel.activeToolLabel ?? 'run_test';
    panel.toolResultSummary = 'Exit code 2: test assertion failed';
    recoveryCopy =
      'The tool executed but returned a failure. The agent read the error output — a test assertion that did not match — traced it back to a logic error in the generated code, and corrected it. Recovery, not blind retry, is what separates durable agents from brittle ones. The harness preserved the error context and let the model reason about it.';
  }

  if (toggles.permissionBlocked && toggles.toolFailure) {
    panel.memoryArtifactType = 'stale';
    recoveryCopy =
      'Both failure modes are active. The agent first hit a permission block, then encountered a tool failure on the alternate path. This is what real debugging looks like — layered problems, not single-point fixes. The harness tracked both failures and the agent navigated through them sequentially.';
  }

  return { panel, recoveryCopy };
}

export function selectViewModel(state: StorySessionState): DerivedViewModel {
  const timelineSteps = timelineForScene(state.sceneId);
  const basePanel = basePanelForScene(state.sceneId);
  const { panel: degradedPanel, recoveryCopy } = basePanel.panelVariant === 'toy'
    ? { panel: basePanel, recoveryCopy: null }
    : applyFailureToggles(basePanel, state.failureToggles);

  const lensLabels = getLensLabels(state.sceneId, state.lensMode);
  const lensTimeline = applyLensLabels(timelineSteps, lensLabels);
  const sceneDef = SCENE_DEFINITIONS.find((s) => s.sceneId === state.sceneId);
  const lensPanel: SimulatorPanelProps = {
    ...degradedPanel,
    visibleComponents: sceneDef?.progressivePanelComponents ?? [],
    timelineSteps: lensTimeline,
    activeToolLabel: lensLabels?.toolLabel ?? degradedPanel.activeToolLabel,
    toolResultSummary: lensLabels?.toolResult ?? degradedPanel.toolResultSummary,
    permissionLabel: lensLabels?.permissionLabel(degradedPanel.permissionState) ?? degradedPanel.permissionLabel,
    memoryLabel: lensLabels?.memoryLabel(degradedPanel.memoryArtifactType) ?? degradedPanel.memoryLabel,
  };

  return {
    timelineSteps: lensTimeline,
    panelProps: lensPanel,
    drawerProps: {
      chapterId: state.chapterId,
      sceneId: state.sceneId,
      simulatorStateId: sceneDef?.targetSimulatorStateId ?? state.simulatorStateId,
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
        y: 120,
        width: 110,
      },
      {
        id: 't-tool',
        label: 'Tool dispatch',
        colorVar: '--color-tool',
        x: 25,
        y: 170,
        width: 160,
      },
    ],
    recoveryCopy,
    mobileDisclosureState: 'none',
  };
}
