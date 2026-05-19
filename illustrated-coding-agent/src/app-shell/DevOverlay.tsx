import type { StorySessionState } from '../story/state';

interface DevOverlayProps {
  state: StorySessionState;
  warnings: string[];
}

export function DevOverlay({ state, warnings }: DevOverlayProps) {
  if (!import.meta.env.DEV) return null;

  return (
    <div className="dev-overlay">
      <div className="dev-overlay-toggle">DEBUG</div>
      <div className="dev-overlay-panel">
        <div className="dev-row">
          <span className="dev-label">chapter</span>
          <span className="dev-value">{state.chapterId}</span>
        </div>
        <div className="dev-row">
          <span className="dev-label">scene</span>
          <span className="dev-value">{state.sceneId}</span>
        </div>
        <div className="dev-row">
          <span className="dev-label">sim-state</span>
          <span className="dev-value">{state.simulatorStateId}</span>
        </div>
        <div className="dev-row">
          <span className="dev-label">lens</span>
          <span className="dev-value">{state.lensMode}</span>
        </div>
        <div className="dev-row">
          <span className="dev-label">fail:perm</span>
          <span className={`dev-value${state.failureToggles.permissionBlocked ? ' dev-warn' : ''}`}>
            {String(state.failureToggles.permissionBlocked)}
          </span>
        </div>
        <div className="dev-row">
          <span className="dev-label">fail:tool</span>
          <span className={`dev-value${state.failureToggles.toolFailure ? ' dev-warn' : ''}`}>
            {String(state.failureToggles.toolFailure)}
          </span>
        </div>
        <div className="dev-row">
          <span className="dev-label">reduced-motion</span>
          <span className="dev-value">{String(state.reducedMotion)}</span>
        </div>
        <div className="dev-row">
          <span className="dev-label">drawer</span>
          <span className="dev-value">{String(state.drawerOpen)}</span>
        </div>
        <div className="dev-row">
          <span className="dev-label">teaser</span>
          <span className="dev-value">{String(state.teaserMode)}</span>
        </div>
        {warnings.length > 0 && (
          <div className="dev-warnings">
            <span className="dev-label">warnings ({warnings.length})</span>
            {warnings.map((w, i) => (
              <div key={i} className="dev-warning">{w}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
