import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';

describe('failure mode toggles', () => {
  it('TOGGLE_FAILURE sets permissionBlocked to true', () => {
    const session = createDefaultSession();
    const result = reduceSession(session, {
      type: 'TOGGLE_FAILURE',
      toggleKey: 'permissionBlocked',
    });

    expect(result.failureToggles.permissionBlocked).toBe(true);
    expect(result.failureToggles.toolFailure).toBe(false);
  });

  it('TOGGLE_FAILURE toggles permissionBlocked back to false', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });

    expect(session.failureToggles.permissionBlocked).toBe(false);
  });

  it('both toggles can be active simultaneously', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });

    expect(session.failureToggles.permissionBlocked).toBe(true);
    expect(session.failureToggles.toolFailure).toBe(true);
  });

  it('toggles do not affect other state fields', () => {
    const session = createDefaultSession();
    const result = reduceSession(session, {
      type: 'TOGGLE_FAILURE',
      toggleKey: 'permissionBlocked',
    });

    expect(result.chapterId).toBe(session.chapterId);
    expect(result.sceneId).toBe(session.sceneId);
    expect(result.lensMode).toBe(session.lensMode);
    expect(result.drawerOpen).toBe(session.drawerOpen);
  });
});

describe('degraded panel props from failure toggles', () => {
  it('no toggles produce no recovery copy', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.recoveryCopy).toBeNull();
  });

  it('permissionBlocked sets permissionState to blocked and generates recovery', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.permissionState).toBe('blocked');
    expect(vm.recoveryCopy).toBeTruthy();
    expect(vm.recoveryCopy).toContain('permission pipeline');
    expect(vm.recoveryCopy).toContain('harness protecting');
  });

  it('toolFailure overrides tool state and generates recovery', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.toolResultSummary).toContain('test assertion failed');
    expect(vm.recoveryCopy).toBeTruthy();
    expect(vm.recoveryCopy).toContain('Recovery, not blind retry');
  });

  it('both toggles produce layered recovery copy', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });
    const vm = selectViewModel(session);

    expect(vm.recoveryCopy).toContain('Both failure modes');
    expect(vm.recoveryCopy).toContain('layered problems');
  });

  it('recovery copy is editorial, not generic app-error', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    const vm = selectViewModel(session);

    expect(vm.recoveryCopy).not.toContain('Error:');
    expect(vm.recoveryCopy).not.toContain('stack trace');
    expect(vm.recoveryCopy).not.toContain('undefined');
  });

  it('permissionBlocked degradation is independent of active scene', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    const toggled = reduceSession(frSession, {
      type: 'TOGGLE_FAILURE',
      toggleKey: 'permissionBlocked',
    });
    const vm = selectViewModel(toggled);

    expect(vm.panelProps.permissionState).toBe('blocked');
    expect(vm.recoveryCopy).toBeTruthy();
  });

  it('toggle state persists through scene changes', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });

    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    expect(session.failureToggles.toolFailure).toBe(true);

    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    expect(session.failureToggles.toolFailure).toBe(true);
  });
});

describe('failure scene definitions', () => {
  it('failure-permission-blocked scene degrades permission state', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'failure-permission-blocked' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.permissionState).toBe('blocked');
  });

  it('failure-tool-failure scene shows tool error', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'failure-tool-failure' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.toolResultSummary).toContain('compilation error');
  });
});
