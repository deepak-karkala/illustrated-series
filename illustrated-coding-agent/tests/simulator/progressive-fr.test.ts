import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import type { FlightRecorderComponentId } from '../../src/story/scene';

describe('progressive Flight Recorder reveal', () => {
  it('returns visible components for each FR scene', () => {
    const expectations: Record<string, FlightRecorderComponentId[]> = {
      'first-loop': ['timeline', 'tool-path'],
      'tool-invocation': ['timeline', 'tool-path'],
      'permission-gate': ['timeline', 'tool-path', 'permission-gate'],
      'context-pressure': ['timeline', 'tool-path', 'permission-gate', 'context-meter'],
      'compaction': ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
      'memory-retrieval': ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
      'failure-permission-blocked': ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
      'failure-tool-failure': ['timeline', 'tool-path', 'permission-gate', 'context-meter', 'memory-artifact'],
    };

    for (const [sceneId, expected] of Object.entries(expectations)) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId: sceneId as any });
      const vm = selectViewModel(s);
      expect(vm.panelProps.visibleComponents).toEqual(expected);
    }
  });

  it('returns empty visible components for non-simulator scenes', () => {
    const nonSim = ['teaser-cross-section', 'model-only-misconception', 'field-guide-summary', 'appendix-method'];
    for (const sceneId of nonSim) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId: sceneId as any });
      const vm = selectViewModel(s);
      expect(vm.panelProps.visibleComponents).toEqual([]);
    }
  });

  it('first FR scene shows timeline and tool path visible', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    const vm = selectViewModel(s);
    expect(vm.panelProps.visibleComponents).toEqual(['timeline', 'tool-path']);
  });
});
