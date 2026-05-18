import { describe, it, expect } from 'vitest';
import { validateAndNormalize } from '../../src/simulator/validation';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import type { StorySessionState } from '../../src/story/state';
import type { ChapterId } from '../../src/story/state';

describe('validateAndNormalize', () => {
  it('passes through a valid default session', () => {
    const session = createDefaultSession();
    const result = validateAndNormalize(session);

    expect(result.warnings).toHaveLength(0);
    expect(result.state).toEqual(session);
  });

  it('normalizes invalid chapterId to hook', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      chapterId: 'nonexistent' as ChapterId,
    });

    expect(result.state.chapterId).toBe('hook');
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('fixes mismatched scene by correcting chapterId first', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      chapterId: 'hook',
      sceneId: 'first-loop',
    });

    expect(result.state.chapterId).toBe('flight-recorder');
    expect(result.state.sceneId).toBe('first-loop');
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('fixes scene-chapter mismatch by updating chapterId', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      chapterId: 'hook',
      sceneId: 'harness-framing',
    });

    expect(result.state.chapterId).toBe('harness-reveal');
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('normalizes invalid lensMode to product', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      lensMode: 'invalid' as any,
    });

    expect(result.state.lensMode).toBe('product');
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('normalizes non-boolean reducedMotion to false', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      reducedMotion: undefined as any,
    });

    expect(result.state.reducedMotion).toBe(false);
  });

  it('syncs simulatorStateId from scene definition', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      sceneId: 'harness-framing',
      chapterId: 'harness-reveal',
      simulatorStateId: 'outdated',
    });

    expect(result.state.simulatorStateId).toBe('harness-framing');
  });
});

describe('success-path transitions', () => {
  it('progresses through intro stages deterministically', () => {
    let session = createDefaultSession();

    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'illusion-break' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'model-only-misconception' });
    expect(session.chapterId).toBe('illusion-break');
    expect(session.sceneId).toBe('model-only-misconception');

    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'harness-reveal' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'harness-framing' });
    expect(session.chapterId).toBe('harness-reveal');

    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    expect(session.chapterId).toBe('flight-recorder');
  });

  it('progresses through flight-recorder scenes', () => {
    const session = createDefaultSession();
    const frSession: StorySessionState = {
      ...session,
      chapterId: 'flight-recorder',
      sceneId: 'first-loop',
    };

    const vm1 = selectViewModel(frSession);
    expect(vm1.timelineSteps[2].status).toBe('active');

    const s2 = reduceSession(frSession, { type: 'SET_SCENE', sceneId: 'tool-invocation' });
    const vm2 = selectViewModel(s2);
    expect(vm2.panelProps.activeToolLabel).toBe('write_to_file');

    const s3 = reduceSession(s2, { type: 'SET_SCENE', sceneId: 'permission-gate' });
    const vm3 = selectViewModel(s3);
    expect(vm3.panelProps.permissionState).toBe('checking');

    const s4 = reduceSession(s3, { type: 'SET_SCENE', sceneId: 'context-pressure' });
    const vm4 = selectViewModel(s4);
    expect(vm4.panelProps.contextFillPercent).toBe(85);

    const s5 = reduceSession(s4, { type: 'SET_SCENE', sceneId: 'compaction' });
    const vm5 = selectViewModel(s5);
    expect(vm5.panelProps.memoryArtifactType).toBe('compressed');
    expect(vm5.panelProps.contextFillPercent).toBe(50);

    const s6 = reduceSession(s5, { type: 'SET_SCENE', sceneId: 'memory-retrieval' });
    const vm6 = selectViewModel(s6);
    expect(vm6.panelProps.memoryArtifactType).toBe('retrieved');
  });

  it('view model stays coherent through full happy path', () => {
    const session = createDefaultSession();
    const scenes = [
      'first-loop',
      'tool-invocation',
      'permission-gate',
      'context-pressure',
      'compaction',
      'memory-retrieval',
    ] as const;

    const results = scenes.map((sceneId) => {
      const s: StorySessionState = { ...session, chapterId: 'flight-recorder', sceneId };
      return selectViewModel(s);
    });

    for (const vm of results) {
      expect(vm.panelProps.harnessVisible).toBe(true);
      expect(vm.drawerProps.chapterId).toBe('flight-recorder');
      expect(vm.recoveryCopy).toBeNull();
    }
  });

  it('state is validated after each transition in happy path', () => {
    let session = createDefaultSession();

    const scenes = [
      'first-loop',
      'tool-invocation',
      'permission-gate',
      'context-pressure',
      'compaction',
      'memory-retrieval',
    ] as const;

    for (const sceneId of scenes) {
      session = reduceSession(session, {
        type: 'SET_SCENE',
        sceneId,
      });
      session = reduceSession(session, {
        type: 'SET_CHAPTER',
        chapterId: 'flight-recorder',
      });

      const { warnings } = validateAndNormalize(session);
      expect(warnings).toHaveLength(0);
    }
  });
});
