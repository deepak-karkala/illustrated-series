import { describe, it, expect } from 'vitest';
import { createDefaultSession } from '../../src/simulator/reducer';

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

  it('reduces SET_TEASER_MODE action correctly', async () => {
    const session = createDefaultSession();
    const { reduceSession } = await import('../../src/simulator/reducer');

    const result = reduceSession(session, {
      type: 'SET_TEASER_MODE',
      teaserMode: false,
    });

    expect(result.teaserMode).toBe(false);
  });

  it('reduces SET_REDUCED_MOTION action correctly', async () => {
    const session = createDefaultSession();
    const { reduceSession } = await import('../../src/simulator/reducer');

    const result = reduceSession(session, {
      type: 'SET_REDUCED_MOTION',
      reducedMotion: true,
    });

    expect(result.reducedMotion).toBe(true);
  });

  it('ignores unknown action types', async () => {
    const session = createDefaultSession();
    const { reduceSession } = await import('../../src/simulator/reducer');

    const result = reduceSession(session, {
      type: 'TOGGLE_DRAWER',
    } as any);

    expect(result).toEqual(session);
  });
});
