import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import type { StorySessionState } from '../../src/story/state';

describe('selectViewModel', () => {
  it('returns timeline steps for flight-recorder scenes', () => {
    const session = createDefaultSession();
    const frSession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'first-loop' });
    const vm = selectViewModel(frSession);

    expect(vm.timelineSteps).toHaveLength(8);
    expect(vm.timelineSteps[0].status).toBe('past');
    expect(vm.timelineSteps[2].status).toBe('active');
    expect(vm.timelineSteps[3].status).toBe('future');
  });

  it('returns empty timeline for non-FR scenes (teaser has no loop)', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.timelineSteps).toHaveLength(0);
  });

  it('derives panel props from scene', () => {
    const session = reduceSession(createDefaultSession(), {
      type: 'SET_SCENE',
      sceneId: 'tool-invocation',
    });
    const vm = selectViewModel(session);

    expect(vm.panelProps.activeToolLabel).toBe('write_to_file');
    expect(vm.panelProps.toolResultSummary).toContain('index.html');
  });

  it('returns permission-checking state for permission-gate scene', () => {
    const session = reduceSession(createDefaultSession(), {
      type: 'SET_SCENE',
      sceneId: 'permission-gate',
    });
    const vm = selectViewModel(session);

    expect(vm.panelProps.permissionState).toBe('checking');
  });

  it('returns compaction memory artifact for compaction scene', () => {
    const session = reduceSession(createDefaultSession(), {
      type: 'SET_SCENE',
      sceneId: 'compaction',
    });
    const vm = selectViewModel(session);

    expect(vm.panelProps.memoryArtifactType).toBe('compressed');
    expect(vm.panelProps.contextFillPercent).toBe(50);
  });

  it('returns high context fill for context-pressure scene', () => {
    const session = reduceSession(createDefaultSession(), {
      type: 'SET_SCENE',
      sceneId: 'context-pressure',
    });
    const vm = selectViewModel(session);

    expect(vm.panelProps.contextFillPercent).toBe(85);
  });

  it('returns teaser annotations for the teaser scene', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.teaserAnnotations.length).toBeGreaterThan(0);
    expect(vm.teaserAnnotations[0]).toHaveProperty('id');
    expect(vm.teaserAnnotations[0]).toHaveProperty('label');
    expect(vm.teaserAnnotations[0]).toHaveProperty('colorVar');
  });

  it('returns harness-visible panel props', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.panelProps.harnessVisible).toBe(true);
  });

  it('reflects session state in drawer props', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.drawerProps.chapterId).toBe(session.chapterId);
    expect(vm.drawerProps.sceneId).toBe(session.sceneId);
    expect(vm.drawerProps.lensMode).toBe(session.lensMode);
  });

  it('returns null recovery copy when state is valid', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.recoveryCopy).toBeNull();
  });

  it('returns consistent view model for different lens modes', () => {
    const session: StorySessionState = {
      ...createDefaultSession(),
      chapterId: 'hook',
      sceneId: 'teaser-cross-section',
      lensMode: 'harness',
      failureToggles: { permissionBlocked: false, toolFailure: false },
    };
    const vm = selectViewModel(session);

    expect(vm.drawerProps.lensMode).toBe('harness');
  });
});
