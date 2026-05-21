import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import { validateAndNormalize } from '../../src/simulator/validation';
import { CHAPTER_ORDER } from '../../src/story/scene-registry';
import type { StorySessionState } from '../../src/story/state';

describe('rapid state transitions', () => {
  it('rapid sequential SET_SCENE dispatches produce correct final state', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'tool-invocation' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });

    expect(session.sceneId).toBe('compaction');
    expect(session.chapterId).toBe('flight-recorder');
  });

  it('rapid chapter changes preserve the last SET_CHAPTER', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'illusion-break' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'harness-reveal' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });

    expect(session.chapterId).toBe('flight-recorder');
  });

  it('interleaved chapter and scene dispatches stay coherent', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'harness-reveal' });
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'harness-framing' });

    expect(session.chapterId).toBe('harness-reveal');
    expect(session.sceneId).toBe('harness-framing');
  });
});

describe('impossible state rejection via validation', () => {
  it('validateAndNormalize catches non-existent chapter', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      chapterId: 'nonexistent' as any,
    });

    expect(result.state.chapterId).toBe('hook');
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('validateAndNormalize catches scene from wrong chapter', () => {
    const result = validateAndNormalize({
      ...createDefaultSession(),
      chapterId: 'hook',
      sceneId: 'compaction',
    });

    expect(result.state.chapterId).toBe('flight-recorder');
    expect(result.state.sceneId).toBe('compaction');
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('validateAndNormalize handles completely garbled state', () => {
    const result = validateAndNormalize({
      chapterId: 'invalid' as any,
      sceneId: 'invalid' as any,
      lensMode: 'invalid' as any,
      failureToggles: { permissionBlocked: 'yes' as any, toolFailure: null as any },
      reducedMotion: 'maybe' as any,
      drawerOpen: null as any,
      mobileControlsOpen: undefined as any,
      teaserMode: 1 as any,
      simulatorStateId: '',
    });

    expect(result.state.chapterId).toBe('hook');
    expect(result.state.sceneId).toBe('teaser-cross-section');
    expect(result.state.lensMode).toBe('product');
    expect(result.state.reducedMotion).toBe(false);
    expect(result.state.drawerOpen).toBe(false);
    expect(result.state.mobileControlsOpen).toBe(false);
    expect(result.warnings.length).toBeGreaterThanOrEqual(5);
  });
});

describe('selector handles partial state gracefully', () => {
  it('selectViewModel returns coherent output for default state', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.panelProps).toBeDefined();
    expect(vm.drawerProps).toBeDefined();
    expect(vm.panelProps.harnessVisible).toBe(true);
  });

  it('selectViewModel returns null recoveryCopy when state is valid', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.recoveryCopy).toBeNull();
  });

  it('selectViewModel handles unknown scene gracefully', () => {
    const session: StorySessionState = {
      ...createDefaultSession(),
      sceneId: 'nonexistent' as any,
    };
    const vm = selectViewModel(session);

    expect(vm.panelProps).toBeDefined();
    expect(vm.panelProps.activeToolLabel).toBeNull();
    expect(vm.panelProps.contextFillPercent).toBe(45);
  });
});

describe('chapter ordering is deterministic', () => {
  it('CHAPTER_ORDER is immutable and complete', () => {
    expect(CHAPTER_ORDER).toHaveLength(6);
    expect(CHAPTER_ORDER[0]).toBe('hook');
    expect(CHAPTER_ORDER[5]).toBe('appendix');
  });

  it('rapid scroll through all chapters follows deterministic order', () => {
    let session = createDefaultSession();

    for (const chId of CHAPTER_ORDER) {
      session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: chId });
      expect(session.chapterId).toBe(chId);
    }
  });
});
