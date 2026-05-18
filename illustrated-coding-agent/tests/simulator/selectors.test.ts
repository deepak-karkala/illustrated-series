import { describe, it, expect } from 'vitest';
import { createDefaultSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import type { StorySessionState } from '../../src/story/state';

describe('selectViewModel', () => {
  it('returns a view model with timeline steps from session state', () => {
    const session = createDefaultSession();
    const vm = selectViewModel(session);

    expect(vm.timelineSteps).toHaveLength(8);
    expect(vm.timelineSteps[0].status).toBe('past');
    expect(vm.timelineSteps[2].status).toBe('active');
    expect(vm.timelineSteps[3].status).toBe('future');
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

  it('returns consistent view model for different session configurations', () => {
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
