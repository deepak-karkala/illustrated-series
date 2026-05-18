import type { FailureToggles } from '../story/state';
import type { SessionAction } from '../simulator/reducer';

interface FailureModeTogglesProps {
  toggles: FailureToggles;
  dispatch: React.Dispatch<SessionAction>;
}

export function FailureModeToggles({ toggles, dispatch }: FailureModeTogglesProps) {
  return (
    <div className="failure-toggles">
      <span className="failure-toggles-label">Failure Mode Theater</span>
      <label className="failure-toggle">
        <input
          type="checkbox"
          checked={toggles.permissionBlocked}
          onChange={() => dispatch({ type: 'TOGGLE_FAILURE', toggleKey: 'permissionBlocked' })}
        />
        <span className="failure-toggle-text">Permission blocked</span>
      </label>
      <label className="failure-toggle">
        <input
          type="checkbox"
          checked={toggles.toolFailure}
          onChange={() => dispatch({ type: 'TOGGLE_FAILURE', toggleKey: 'toolFailure' })}
        />
        <span className="failure-toggle-text">Tool failure</span>
      </label>
    </div>
  );
}
