import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import { DevOverlay } from '../../src/app-shell/DevOverlay';
import { render, screen } from '@testing-library/react';

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
  it('DevOverlay renders DEBUG label in dev builds', () => {
    const state = createDefaultSession();
    render(<DevOverlay state={state} warnings={[]} />);

    expect(screen.getByText('DEBUG')).toBeTruthy();
    expect(screen.getByText(state.chapterId)).toBeTruthy();
    expect(screen.getByText(state.sceneId)).toBeTruthy();
  });

  it('DevOverlay renders validation warnings when present', () => {
    const state = createDefaultSession();
    render(<DevOverlay state={state} warnings={['test warning A', 'test warning B']} />);

    expect(screen.getByText(/warnings \(2\)/)).toBeTruthy();
    expect(screen.getByText('test warning A')).toBeTruthy();
    expect(screen.getByText('test warning B')).toBeTruthy();
  });

  it('DevOverlay shows failure toggle state', () => {
    const session = reduceSession(createDefaultSession(), {
      type: 'TOGGLE_FAILURE',
      toggleKey: 'permissionBlocked',
    });

    render(<DevOverlay state={session} warnings={[]} />);

    const trueElements = screen.getAllByText('true');
    expect(trueElements.length).toBeGreaterThanOrEqual(1);
    const falseElements = screen.getAllByText('false');
    expect(falseElements.length).toBeGreaterThanOrEqual(1);
  });

  it('import.meta.env.DEV is true during test run', () => {
    expect(import.meta.env.DEV).toBe(true);
  });
});
