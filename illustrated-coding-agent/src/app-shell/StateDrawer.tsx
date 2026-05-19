import type { DrawerProps } from '../story/view-model';
import type { SimulatorPanelProps } from '../story/view-model';

interface StateDrawerProps {
  drawer: DrawerProps;
  panel: SimulatorPanelProps;
  open: boolean;
  onClose: () => void;
}

export function StateDrawer({ drawer, panel, open, onClose }: StateDrawerProps) {
  if (!open) return null;

  return (
    <div className="state-drawer-backdrop" onClick={onClose}>
      <aside
        className="state-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Agent state inspector"
      >
        <div className="state-drawer-header">
          <h3 className="state-drawer-title">State Inspector</h3>
          <button className="state-drawer-close" onClick={onClose} aria-label="Close drawer">
            ✕
          </button>
        </div>

        <div className="state-drawer-body">
          <div className="state-drawer-section">
            <h4 className="state-drawer-section-title">Position</h4>
            <StateRow label="Chapter" value={drawer.chapterId} />
            <StateRow label="Scene" value={drawer.sceneId} />
            <StateRow label="Simulator state" value={drawer.simulatorStateId} mono />
          </div>

          <div className="state-drawer-section">
            <h4 className="state-drawer-section-title">Lens & Controls</h4>
            <StateRow label="Lens mode" value={drawer.lensMode === 'product' ? 'Product' : 'Harness'} />
            <StateRow label="Tool active" value={panel.activeToolLabel ?? '(none)'} mono />
            <StateRow label="Permission" value={panel.permissionState} />
            <StateRow label="Context fill" value={`${panel.contextFillPercent}%`} mono />
            <StateRow label="Memory" value={panel.memoryArtifactType} />
          </div>

          <div className="state-drawer-section">
            <h4 className="state-drawer-section-title">Failure Toggles</h4>
            <StateRow
              label="Permission blocked"
              value={drawer.failureToggles.permissionBlocked ? 'ON' : 'OFF'}
              warning={drawer.failureToggles.permissionBlocked}
            />
            <StateRow
              label="Tool failure"
              value={drawer.failureToggles.toolFailure ? 'ON' : 'OFF'}
              warning={drawer.failureToggles.toolFailure}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

function StateRow({
  label,
  value,
  mono,
  warning,
}: {
  label: string;
  value: string;
  mono?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="state-drawer-row">
      <span className="state-drawer-label">{label}</span>
      <span className={`state-drawer-value${mono ? ' state-drawer-value-mono' : ''}${warning ? ' state-drawer-value-warning' : ''}`}>
        {value}
      </span>
    </div>
  );
}
