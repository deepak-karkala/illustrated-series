import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import { INTRO_CONTENT } from '../../src/story/content';
import { getSceneIds, getChapterId } from '../../src/story/scene-registry';

describe('toy example scene', () => {
  it('toy-example chapter is registered with 4 scenes', () => {
    const scenes = getSceneIds('toy-example');
    expect(scenes).toEqual(['toy-read', 'toy-write', 'toy-test', 'toy-done']);
  });

  it('toy-read maps to toy-example chapter', () => {
    const chId = getChapterId('toy-read');
    expect(chId).toBe('toy-example');
  });

  it('each toy scene has content blocks', () => {
    for (const scId of ['toy-read', 'toy-write', 'toy-test', 'toy-done']) {
      const blocks = INTRO_CONTENT.filter((c) => c.sceneId === scId);
      expect(blocks.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('toy scenes use 4-step timeline with progressive active step', () => {
    const expectations: Record<string, { active: string; past: number; future: number }> = {
      'toy-read': { active: 'Read file', past: 0, future: 3 },
      'toy-write': { active: 'Write change', past: 1, future: 2 },
      'toy-test': { active: 'Run tests', past: 2, future: 1 },
      'toy-done': { active: 'Done', past: 3, future: 0 },
    };

    for (const [sceneId, exp] of Object.entries(expectations)) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId: sceneId as any });
      const vm = selectViewModel(s);

      expect(vm.timelineSteps.length).toBe(4);
      const activeStep = vm.timelineSteps.find((t) => t.status === 'active');
      expect(activeStep?.label).toBe(exp.active);
      expect(vm.timelineSteps.filter((t) => t.status === 'past').length).toBe(exp.past);
      expect(vm.timelineSteps.filter((t) => t.status === 'future').length).toBe(exp.future);
    }
  });

  it('toy scenes use toy panel variant', () => {
    for (const sceneId of ['toy-read', 'toy-write', 'toy-test', 'toy-done']) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId: sceneId as any });
      const vm = selectViewModel(s);

      expect(vm.panelProps.panelVariant).toBe('toy');
    }
  });

  it('toy panel is not affected by failure toggles', () => {
    let session = createDefaultSession();
    session = reduceSession(session, { type: 'SET_SCENE', sceneId: 'toy-read' as any });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' });
    session = reduceSession(session, { type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' });

    const vm = selectViewModel(session);
    expect(vm.recoveryCopy).toBeNull();
    expect(vm.panelProps.permissionState).toBe('none');
    expect(vm.panelProps.activeToolLabel).toBe('read_file');
  });

  it('tool info changes per step', () => {
    const toolExpectations: Record<string, { label: string | null; result: string | null }> = {
      'toy-read': { label: 'read_file', result: 'const userCount = 5;' },
      'toy-write': { label: 'write_file', result: 'userCount → activeUserCount' },
      'toy-test': { label: 'run_tests', result: 'All tests pass' },
      'toy-done': { label: null, result: null },
    };

    for (const [sceneId, exp] of Object.entries(toolExpectations)) {
      const session = createDefaultSession();
      const s = reduceSession(session, { type: 'SET_SCENE', sceneId: sceneId as any });
      const vm = selectViewModel(s);

      expect(vm.panelProps.activeToolLabel).toBe(exp.label);
      expect(vm.panelProps.toolResultSummary).toBe(exp.result);
    }
  });
});
