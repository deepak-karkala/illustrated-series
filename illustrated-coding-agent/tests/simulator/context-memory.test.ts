import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';

describe('context state derivation', () => {
  it('first-loop has moderate context fill', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    const vm = selectViewModel(frSession);

    expect(vm.panelProps.contextFillPercent).toBe(45);
    expect(vm.panelProps.contextFillPercent).toBeLessThan(75);
  });

  it('context-pressure scene exceeds the warning threshold', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'context-pressure' });
    const vm = selectViewModel(frSession);

    expect(vm.panelProps.contextFillPercent).toBe(85);
    expect(vm.panelProps.contextFillPercent).toBeGreaterThanOrEqual(75);
  });

  it('compaction scene drops context fill after compaction', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    const vm = selectViewModel(frSession);

    expect(vm.panelProps.contextFillPercent).toBe(50);
    expect(vm.panelProps.memoryArtifactType).toBe('compressed');
  });

  it('memory-retrieval restores context from durable storage', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'memory-retrieval' });
    const vm = selectViewModel(frSession);

    expect(vm.panelProps.contextFillPercent).toBe(40);
    expect(vm.panelProps.memoryArtifactType).toBe('retrieved');
  });

  it('context fill increases progressively across the loop', () => {
    const session = createDefaultSession();
    const scenes = ['first-loop', 'tool-invocation', 'permission-gate', 'context-pressure'] as const;
    const fills = scenes.map((sc) => {
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId: sc });
      return selectViewModel(s).panelProps.contextFillPercent;
    });

    expect(fills[0]).toBeLessThan(fills[1]);
    expect(fills[1]).toBeLessThan(fills[2]);
    expect(fills[2]).toBeLessThan(fills[3]);
  });
});

describe('memory artifact type derivation', () => {
  it('most scenes show working memory artifact', () => {
    const session = createDefaultSession();

    for (const sceneId of ['first-loop', 'tool-invocation', 'permission-gate', 'context-pressure'] as const) {
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId });
      const vm = selectViewModel(s);
      expect(vm.panelProps.memoryArtifactType).toBe('working');
    }
  });

  it('compaction scene sets compressed artifact', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    const vm = selectViewModel(s);

    expect(vm.panelProps.memoryArtifactType).toBe('compressed');
  });

  it('memory-retrieval scene sets retrieved artifact', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'memory-retrieval' });
    const vm = selectViewModel(s);

    expect(vm.panelProps.memoryArtifactType).toBe('retrieved');
  });

  it('memory artifact type is distinct between compaction and retrieval', () => {
    const session = createDefaultSession();
    const compS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    const retS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'memory-retrieval' });

    expect(selectViewModel(compS).panelProps.memoryArtifactType).not.toBe(
      selectViewModel(retS).panelProps.memoryArtifactType,
    );
  });

  it('memory artifact type resets to working on non-memory scenes', () => {
    const session = createDefaultSession();
    const compS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    expect(selectViewModel(compS).panelProps.memoryArtifactType).toBe('compressed');

    const nextS = reduceSession(compS, { type: 'SET_SCENE', sceneId: 'first-loop' });
    expect(selectViewModel(nextS).panelProps.memoryArtifactType).toBe('working');
  });
});

describe('all four memory artifact variants', () => {
  it('emits working by default for active FR scenes', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    expect(selectViewModel(s).panelProps.memoryArtifactType).toBe('working');
  });

  it('emits compressed for compaction scene', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    expect(selectViewModel(s).panelProps.memoryArtifactType).toBe('compressed');
  });

  it('emits retrieved for memory-retrieval scene', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'memory-retrieval' });
    expect(selectViewModel(s).panelProps.memoryArtifactType).toBe('retrieved');
  });

  it('emits stale when both failure toggles are active', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.memoryArtifactType).toBe('stale');
    expect(vm.recoveryCopy).toContain('Both failure modes');
  });
});

describe('continuity across scenes', () => {
  it('timeline steps accumulate state through the loop', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    const vm = selectViewModel(frSession);

    const pastSteps = vm.timelineSteps.filter((s) => s.status === 'past');
    const futureSteps = vm.timelineSteps.filter((s) => s.status === 'future');
    expect(pastSteps.length).toBeGreaterThan(0);
    expect(futureSteps.length).toBeGreaterThan(0);
    expect(vm.timelineSteps.some((s) => s.status === 'active')).toBe(true);
  });

  it('timeline progresses forward as scenes advance', () => {
    const session = createDefaultSession();
    const firstS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    const lastS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'memory-retrieval' });

    const firstPast = selectViewModel(firstS).timelineSteps.filter((s) => s.status === 'past').length;
    const lastPast = selectViewModel(lastS).timelineSteps.filter((s) => s.status === 'past').length;

    expect(lastPast).toBeGreaterThan(firstPast);
  });

  it('context-pressure scene derives correct pressure context items', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'context-pressure' });
    const vm = selectViewModel(s);

    expect(vm.panelProps.contextFillPercent).toBe(85);
    expect(vm.timelineSteps.filter((t) => t.status === 'past').length).toBe(6);
  });

  it('compaction preserves the timeline state while resetting fill', () => {
    const session = createDefaultSession();
    const beforeS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'context-pressure' });
    const afterS = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });

    const beforeFill = selectViewModel(beforeS).panelProps.contextFillPercent;
    const afterFill = selectViewModel(afterS).panelProps.contextFillPercent;

    expect(afterFill).toBeLessThan(beforeFill);
  });
});
