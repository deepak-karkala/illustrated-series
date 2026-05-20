import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';

describe('session state', () => {
  it('creates a default session with teaser mode enabled', () => {
    const session = createDefaultSession();

    expect(session.teaserMode).toBe(true);
    expect(session.chapterId).toBe('hook');
    expect(session.sceneId).toBe('teaser-cross-section');
    expect(session.lensMode).toBe('product');
    expect(session.drawerOpen).toBe(false);
    expect(session.mobileControlsOpen).toBe(false);
    expect(session.reducedMotion).toBe(false);
  });

  it('creates a default session with safe failure toggles', () => {
    const session = createDefaultSession();

    expect(session.failureToggles.permissionBlocked).toBe(false);
    expect(session.failureToggles.toolFailure).toBe(false);
  });

  it('default session state respects initial simulator state id', () => {
    const session = createDefaultSession();

    expect(session.simulatorStateId).toBe('teaser');
  });

  it('deep-copies failureToggles so sessions are isolated', () => {
    const s1 = createDefaultSession();
    const s2 = createDefaultSession();

    s1.failureToggles.permissionBlocked = true;

    expect(s2.failureToggles.permissionBlocked).toBe(false);
  });
});

describe('reduceSession', () => {
  it('reduces SET_TEASER_MODE', () => {
    const session = createDefaultSession();

    const result = reduceSession(session, {
      type: 'SET_TEASER_MODE',
      teaserMode: false,
    });

    expect(result.teaserMode).toBe(false);
    expect(result).not.toBe(session);
  });

  it('reduces SET_REDUCED_MOTION', () => {
    const session = createDefaultSession();

    const result = reduceSession(session, {
      type: 'SET_REDUCED_MOTION',
      reducedMotion: true,
    });

    expect(result.reducedMotion).toBe(true);
  });

  it('reduces SET_CHAPTER', () => {
    const session = createDefaultSession();

    const result = reduceSession(session, {
      type: 'SET_CHAPTER',
      chapterId: 'harness-reveal',
    });

    expect(result.chapterId).toBe('harness-reveal');
  });

  it('reduces SET_SCENE', () => {
    const session = createDefaultSession();

    const result = reduceSession(session, {
      type: 'SET_SCENE',
      sceneId: 'harness-framing',
    });

    expect(result.sceneId).toBe('harness-framing');
  });

  it('reduces SET_LENS', () => {
    const session = createDefaultSession();

    const result = reduceSession(session, {
      type: 'SET_LENS',
      lensMode: 'harness',
    });

    expect(result.lensMode).toBe('harness');
  });

  it('reduces TOGGLE_FAILURE', () => {
    const session = createDefaultSession();

    expect(session.failureToggles.permissionBlocked).toBe(false);

    const result = reduceSession(session, {
      type: 'TOGGLE_FAILURE',
      toggleKey: 'permissionBlocked',
    });

    expect(result.failureToggles.permissionBlocked).toBe(true);
    expect(session.failureToggles.permissionBlocked).toBe(false);
  });

  it('reduces TOGGLE_DRAWER', () => {
    const session = createDefaultSession();

    expect(session.drawerOpen).toBe(false);

    const result = reduceSession(session, { type: 'TOGGLE_DRAWER' });

    expect(result.drawerOpen).toBe(true);
  });

  it('reduces TOGGLE_MOBILE_CONTROLS', () => {
    const session = createDefaultSession();

    expect(session.mobileControlsOpen).toBe(false);

    const result = reduceSession(session, { type: 'TOGGLE_MOBILE_CONTROLS' });

    expect(result.mobileControlsOpen).toBe(true);
  });

  it('does not mutate original state', () => {
    const session = createDefaultSession();

    reduceSession(session, {
      type: 'SET_CHAPTER',
      chapterId: 'harness-reveal',
    });

    expect(session.chapterId).toBe('hook');
  });
});
