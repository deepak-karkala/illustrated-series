import { describe, it, expect } from 'vitest';
import { createDefaultSession, reduceSession } from '../../src/simulator/reducer';
import { selectViewModel } from '../../src/simulator/selectors';
import { validateContentSchema } from '../../src/simulator/validation';
import { INTRO_CONTENT } from '../../src/story/content';
import { getSceneIds, getChapterId } from '../../src/story/scene-registry';

describe('toy example scene', () => {
  it('toy-example chapter is registered', () => {
    const scenes = getSceneIds('toy-example');
    expect(scenes.length).toBeGreaterThan(0);
    expect(scenes[0]).toBe('toy-example-rename');
  });

  it('toy-example-rename maps to toy-example chapter', () => {
    const chId = getChapterId('toy-example-rename');
    expect(chId).toBe('toy-example');
  });

  it('toy scene has content blocks', () => {
    const blocks = INTRO_CONTENT.filter((c) => c.sceneId === 'toy-example-rename');
    expect(blocks.length).toBeGreaterThanOrEqual(5);
  });

  it('toy scene produces simplified timeline with 3 steps', () => {
    const session = createDefaultSession();
    const toySession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'toy-example-rename' });
    const vm = selectViewModel(toySession);

    expect(vm.timelineSteps.length).toBe(3);
    expect(vm.timelineSteps[0].label).toBe('Read file');
    expect(vm.timelineSteps[1].label).toBe('Rename');
    expect(vm.timelineSteps[2].label).toBe('Verify');
  });

  it('toy scene panel uses toy variant with no context meter', () => {
    const session = createDefaultSession();
    const toySession = reduceSession(session, { type: 'SET_SCENE', sceneId: 'toy-example-rename' });
    const vm = selectViewModel(toySession);

    expect(vm.panelProps.panelVariant).toBe('toy');
    expect(vm.panelProps.activeToolLabel).toBe('read_file');
  });

  it('toy scene passes content schema validation', () => {
    const warnings = validateContentSchema();
    const toyWarnings = warnings.filter((w) => w.includes('toy-example-rename'));
    expect(toyWarnings).toHaveLength(0);
  });
});
