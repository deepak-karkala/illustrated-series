import type { LensMode } from '../story/state';
import type { SessionAction } from '../simulator/reducer';

interface LensToggleProps {
  lensMode: LensMode;
  dispatch: React.Dispatch<SessionAction>;
}

export function LensToggle({ lensMode, dispatch }: LensToggleProps) {
  return (
    <div className="lens-toggle">
      <span className="lens-toggle-label">Lens</span>
      <button
        type="button"
        className={`lens-toggle-btn ${lensMode === 'product' ? 'lens-toggle-active' : ''}`}
        onClick={() => dispatch({ type: 'SET_LENS', lensMode: 'product' })}
        aria-pressed={lensMode === 'product'}
      >
        Product
      </button>
      <button
        type="button"
        className={`lens-toggle-btn ${lensMode === 'harness' ? 'lens-toggle-active' : ''}`}
        onClick={() => dispatch({ type: 'SET_LENS', lensMode: 'harness' })}
        aria-pressed={lensMode === 'harness'}
      >
        Harness
      </button>
    </div>
  );
}
