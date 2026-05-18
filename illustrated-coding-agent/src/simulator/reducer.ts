import type { StorySessionState } from '../story/state';
import { DEFAULT_SESSION_STATE } from '../story/state';

export type SessionAction =
  | { type: 'SET_CHAPTER'; chapterId: string }
  | { type: 'SET_SCENE'; sceneId: string }
  | { type: 'SET_LENS'; lensMode: string }
  | { type: 'TOGGLE_FAILURE'; toggleKey: string }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'SET_TEASER_MODE'; teaserMode: boolean }
  | { type: 'SET_REDUCED_MOTION'; reducedMotion: boolean };

export function createDefaultSession(): StorySessionState {
  return { ...DEFAULT_SESSION_STATE };
}

export function reduceSession(
  state: StorySessionState,
  action: SessionAction,
): StorySessionState {
  switch (action.type) {
    case 'SET_TEASER_MODE':
      return { ...state, teaserMode: action.teaserMode };
    case 'SET_REDUCED_MOTION':
      return { ...state, reducedMotion: action.reducedMotion };
    default:
      return state;
  }
}
