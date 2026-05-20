import type { StorySessionState, ChapterId, SceneId, LensMode } from '../story/state';
import { DEFAULT_SESSION_STATE } from '../story/state';
import type { FailureToggles } from '../story/state';

export type SessionAction =
  | { type: 'SET_CHAPTER'; chapterId: ChapterId }
  | { type: 'SET_SCENE'; sceneId: SceneId }
  | { type: 'SET_LENS'; lensMode: LensMode }
  | { type: 'TOGGLE_FAILURE'; toggleKey: keyof FailureToggles }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'TOGGLE_MOBILE_CONTROLS' }
  | { type: 'SET_TEASER_MODE'; teaserMode: boolean }
  | { type: 'SET_REDUCED_MOTION'; reducedMotion: boolean };

export function createDefaultSession(): StorySessionState {
  return {
    ...DEFAULT_SESSION_STATE,
    failureToggles: { ...DEFAULT_SESSION_STATE.failureToggles },
  };
}

export function reduceSession(
  state: StorySessionState,
  action: SessionAction,
): StorySessionState {
  switch (action.type) {
    case 'SET_CHAPTER':
      return { ...state, chapterId: action.chapterId };
    case 'SET_SCENE':
      return { ...state, sceneId: action.sceneId };
    case 'SET_LENS':
      return { ...state, lensMode: action.lensMode };
    case 'TOGGLE_FAILURE':
      return {
        ...state,
        failureToggles: {
          ...state.failureToggles,
          [action.toggleKey]: !state.failureToggles[action.toggleKey],
        },
      };
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen };
    case 'TOGGLE_MOBILE_CONTROLS':
      return { ...state, mobileControlsOpen: !state.mobileControlsOpen };
    case 'SET_TEASER_MODE':
      return { ...state, teaserMode: action.teaserMode };
    case 'SET_REDUCED_MOTION':
      return { ...state, reducedMotion: action.reducedMotion };
  }
}
