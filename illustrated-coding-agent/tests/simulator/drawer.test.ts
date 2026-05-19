import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';

describe('drawer state', () => {
  it('TOGGLE_DRAWER opens the drawer', () => {
    const session = createDefaultSession();
    expect(session.drawerOpen).toBe(false);

    const result = reduceSession(session, { type: 'TOGGLE_DRAWER' });
    expect(result.drawerOpen).toBe(true);
  });

  it('TOGGLE_DRAWER closes the drawer', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_DRAWER' });
    session = reduceSession(session, { type: 'TOGGLE_DRAWER' });

    expect(session.drawerOpen).toBe(false);
  });

  it('drawer stays open across scene changes', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_DRAWER' });
    expect(session.drawerOpen).toBe(true);

    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    expect(session.drawerOpen).toBe(true);

    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    expect(session.drawerOpen).toBe(true);
  });

  it('TOGGLE_DRAWER does not affect other state', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_DRAWER' });

    expect(session.drawerOpen).toBe(true);
    expect(session.failureToggles.permissionBlocked).toBe(true);
  });
});

describe('drawerProps reflect current state', () => {
  it('drawer shows correct chapter and scene', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    const vm = selectViewModel(session);

    expect(vm.drawerProps.chapterId).toBe('flight-recorder');
    expect(vm.drawerProps.sceneId).toBe('first-loop');
  });

  it('drawer reflects current lens mode', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_LENS', lensMode: 'harness' });
    const vm = selectViewModel(session);

    expect(vm.drawerProps.lensMode).toBe('harness');
  });

  it('drawer reflects failure toggle state', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });
    const vm = selectViewModel(session);

    expect(vm.drawerProps.failureToggles.toolFailure).toBe(true);
    expect(vm.drawerProps.failureToggles.permissionBlocked).toBe(false);
  });

  it('drawer syncs simulatorStateId from scene definition', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'compaction' });
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });
    const vm = selectViewModel(session);

    expect(vm.drawerProps.simulatorStateId).toBe('compaction');
  });

  it('drawerProps are never null or undefined', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.drawerProps.chapterId).toBeDefined();
    expect(vm.drawerProps.sceneId).toBeDefined();
    expect(vm.drawerProps.simulatorStateId).toBeDefined();
    expect(vm.drawerProps.lensMode).toBeDefined();
    expect(vm.drawerProps.failureToggles).toBeDefined();
  });

  it('drawerProps update when scene changes within same chapter', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_CHAPTER', chapterId: 'flight-recorder' });

    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    expect(selectViewModel(session).drawerProps.sceneId).toBe('first-loop');

    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'tool-invocation' });
    expect(selectViewModel(session).drawerProps.sceneId).toBe('tool-invocation');
  });
});

describe('dev overlay gating', () => {
  it('import.meta.env.DEV is defined', () => {
    expect(import.meta.env.DEV).toBeDefined();
  });

  it('import.meta.env.PROD is defined', () => {
    expect(import.meta.env.PROD).toBeDefined();
  });

  it('DEV and PROD are mutually exclusive', () => {
    if (import.meta.env.DEV) {
      expect(import.meta.env.PROD).toBe(false);
    } else {
      expect(import.meta.env.PROD).toBe(true);
    }
  });
});
