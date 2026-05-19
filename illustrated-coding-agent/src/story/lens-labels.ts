import type { LensMode, SceneId } from './state';
import type { TimelineStep } from './view-model';

export interface LensLabels {
  timelineLabels: Record<string, string>;
  toolLabel: string | null;
  toolResult: string | null;
  permissionLabel: (state: string) => string;
  memoryLabel: (state: string) => string;
}

type LensLabelMap = Record<string, LensLabels>;

const PRODUCT_LENS: LensLabelMap = {
  'first-loop': {
    timelineLabels: {},
    toolLabel: 'read_file',
    toolResult: null,
    permissionLabel: () => '',
    memoryLabel: () => 'Working set',
  },
  'tool-invocation': {
    timelineLabels: {},
    toolLabel: 'write_to_file',
    toolResult: 'File written: index.html',
    permissionLabel: () => '✓ Allowed',
    memoryLabel: () => 'Working set',
  },
  'permission-gate': {
    timelineLabels: {},
    toolLabel: 'bash deploy',
    toolResult: null,
    permissionLabel: (s) => (s === 'checking' ? '⏳ Checking permissions…' : s === 'allowed' ? '✓ Allowed' : '✗ Blocked'),
    memoryLabel: () => 'Working set',
  },
  'context-pressure': {
    timelineLabels: {},
    toolLabel: 'search_content',
    toolResult: '12 matches in 4 files',
    permissionLabel: () => '✓ Allowed',
    memoryLabel: () => 'Working set',
  },
  'compaction': {
    timelineLabels: {},
    toolLabel: null,
    toolResult: null,
    permissionLabel: () => '',
    memoryLabel: () => 'Compressed',
  },
  'memory-retrieval': {
    timelineLabels: {},
    toolLabel: null,
    toolResult: null,
    permissionLabel: () => '',
    memoryLabel: () => 'Retrieved',
  },
};

const HARNESS_LENS: LensLabelMap = {
  'first-loop': {
    timelineLabels: {},
    toolLabel: 'grep (codebase search)',
    toolResult: null,
    permissionLabel: () => '',
    memoryLabel: () => 'Context assembly',
  },
  'tool-invocation': {
    timelineLabels: {},
    toolLabel: 'write (tool dispatch)',
    toolResult: 'file.write → index.html (200 OK)',
    permissionLabel: () => '✓ Dispatch allowed',
    memoryLabel: () => 'Context assembly',
  },
  'permission-gate': {
    timelineLabels: {},
    toolLabel: 'process.spawn (bash)',
    toolResult: null,
    permissionLabel: (s) =>
      s === 'checking' ? '⏳ Authorization pipeline…' : s === 'allowed' ? '✓ Authorized' : '✗ Authorization denied',
    memoryLabel: () => 'Context assembly',
  },
  'context-pressure': {
    timelineLabels: {},
    toolLabel: 'grep (multi-file search)',
    toolResult: '12 files matched, 4 returned',
    permissionLabel: () => '✓ Dispatch allowed',
    memoryLabel: () => 'Context near capacity',
  },
  'compaction': {
    timelineLabels: {},
    toolLabel: null,
    toolResult: null,
    permissionLabel: () => '',
    memoryLabel: () => 'Compacted (lossy summarization)',
  },
  'memory-retrieval': {
    timelineLabels: {},
    toolLabel: null,
    toolResult: null,
    permissionLabel: () => '',
    memoryLabel: () => 'Retrieved (from durable store)',
  },
};

export function getLensLabels(sceneId: SceneId, lensMode: LensMode): LensLabels | null {
  const map = lensMode === 'harness' ? HARNESS_LENS : PRODUCT_LENS;
  return map[sceneId] ?? null;
}

export function applyLensLabels(
  timeline: TimelineStep[],
  lens: LensLabels | null,
): TimelineStep[] {
  if (!lens) return timeline;
  return timeline.map((step) => {
    const label = lens.timelineLabels[step.id];
    return label ? { ...step, label } : step;
  });
}
