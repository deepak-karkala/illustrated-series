import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import { getLensLabels } from '../../src/story/lens-labels';
import type { SceneId } from '../../src/story/state';

describe('lens switch semantic invariants', () => {
  const sceneIds: SceneId[] = [
    'first-loop',
    'tool-invocation',
    'permission-gate',
    'context-pressure',
    'compaction',
    'memory-retrieval',
  ];

  it('lens switch does not change timeline step count', () => {
    for (const sceneId of sceneIds) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId });
      const product = selectViewModel(s);
      const harness = selectViewModel({ ...s, lensMode: 'harness' });

      expect(harness.timelineSteps.length).toBe(product.timelineSteps.length);
    }
  });

  it('lens switch does not change context fill percent', () => {
    for (const sceneId of sceneIds) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId });
      const product = selectViewModel(s);
      const harness = selectViewModel({ ...s, lensMode: 'harness' });

      expect(harness.panelProps.contextFillPercent).toBe(product.panelProps.contextFillPercent);
    }
  });

  it('lens switch does not change permission state', () => {
    for (const sceneId of sceneIds) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId });
      const product = selectViewModel(s);
      const harness = selectViewModel({ ...s, lensMode: 'harness' });

      expect(harness.panelProps.permissionState).toBe(product.panelProps.permissionState);
    }
  });

  it('lens switch does not change memory artifact type', () => {
    for (const sceneId of sceneIds) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId });
      const product = selectViewModel(s);
      const harness = selectViewModel({ ...s, lensMode: 'harness' });

      expect(harness.panelProps.memoryArtifactType).toBe(product.panelProps.memoryArtifactType);
    }
  });

  it('lens switch does not change drawer props', () => {
    for (const sceneId of sceneIds) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId });
      const product = selectViewModel(s);
      const harness = selectViewModel({ ...s, lensMode: 'harness' });

      expect(harness.drawerProps.chapterId).toBe(product.drawerProps.chapterId);
      expect(harness.drawerProps.sceneId).toBe(product.drawerProps.sceneId);
      expect(harness.drawerProps.simulatorStateId).toBe(product.drawerProps.simulatorStateId);
      expect(harness.drawerProps.failureToggles).toEqual(product.drawerProps.failureToggles);
    }
  });

  it('lens switch changes tool labels for scenes with harness mappings', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'tool-invocation' });
    const product = selectViewModel(s);
    const harness = selectViewModel({ ...s, lensMode: 'harness' });

    expect(harness.panelProps.activeToolLabel).not.toBe(product.panelProps.activeToolLabel);
    expect(harness.panelProps.activeToolLabel).toContain('dispatch');
  });

  it('lens switch changes tool result labels for harness lens', () => {
    const session = createDefaultSession();
    const s = reduceSession(session, { type: 'SET_SCENE', sceneId: 'tool-invocation' });
    const product = selectViewModel(s);
    const harness = selectViewModel({ ...s, lensMode: 'harness' });

    expect(harness.panelProps.toolResultSummary).not.toBe(product.panelProps.toolResultSummary);
  });

  it('failure toggles still degrade correctly under harness lens', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_LENS', lensMode: 'harness' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.permissionState).toBe('blocked');
    expect(vm.recoveryCopy).toBeTruthy();
  });

  it('both toggles produce stale memory under harness lens', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_LENS', lensMode: 'harness' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });
    const vm = selectViewModel(session);

    expect(vm.panelProps.memoryArtifactType).toBe('stale');
  });

  it('lens labels exist for known FR scenes', () => {
    for (const sceneId of sceneIds) {
      const labels = getLensLabels(sceneId, 'harness');
      expect(labels).not.toBeNull();
    }
  });
});

describe('lens reducer', () => {
  it('SET_LENS toggles from product to harness', () => {
    const session = createDefaultSession();
    const result = reduceSession(session, { type: 'SET_LENS', lensMode: 'harness' });

    expect(result.lensMode).toBe('harness');
    expect(result).not.toBe(session);
  });

  it('SET_LENS preserves all other state fields', () => {
    const session = createDefaultSession();
    const result = reduceSession(session, { type: 'SET_LENS', lensMode: 'harness' });

    expect(result.chapterId).toBe(session.chapterId);
    expect(result.sceneId).toBe(session.sceneId);
    expect(result.failureToggles).toEqual(session.failureToggles);
    expect(result.drawerOpen).toBe(session.drawerOpen);
  });

  it('SET_LENS back to product after harness', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_LENS', lensMode: 'harness' });
    session = reduceSession(session, { type: 'SET_LENS', lensMode: 'product' });

    expect(session.lensMode).toBe('product');
  });
});
