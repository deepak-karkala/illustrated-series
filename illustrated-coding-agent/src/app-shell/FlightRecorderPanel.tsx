import type { SimulatorPanelProps, TimelineStep } from '../story/view-model';
import { AgentTimeline } from '../notation/AgentTimeline';
import { ContextMeter } from '../notation/ContextMeter';

interface FlightRecorderPanelProps {
  panel: SimulatorPanelProps;
  timelineSteps: TimelineStep[];
  recoveryCopy: string | null;
}

const CONTEXT_ITEMS: Record<string, { label: string; colorVar: string }[]> = {
  request: [
    { label: 'System', colorVar: '--color-harness' },
    { label: 'User request', colorVar: '--color-human' },
    { label: 'Plan', colorVar: '--color-model' },
    { label: 'Tool output', colorVar: '--color-tool' },
  ],
  mid: [
    { label: 'System', colorVar: '--color-harness' },
    { label: 'User request', colorVar: '--color-human' },
    { label: 'Plan', colorVar: '--color-model' },
    { label: 'Tool out × 2', colorVar: '--color-tool' },
  ],
  full: [
    { label: 'System', colorVar: '--color-harness' },
    { label: 'User request', colorVar: '--color-human' },
    { label: 'Plan', colorVar: '--color-model' },
    { label: 'Tool out × 3', colorVar: '--color-tool' },
  ],
};

function getContextItems(fillPercent: number) {
  if (fillPercent >= 80) return CONTEXT_ITEMS.full;
  if (fillPercent >= 55) return CONTEXT_ITEMS.mid;
  return CONTEXT_ITEMS.request;
}

export function FlightRecorderPanel({ panel, timelineSteps, recoveryCopy }: FlightRecorderPanelProps) {
  const contextItems = getContextItems(panel.contextFillPercent);

  return (
    <div className="flight-recorder-panel">
      <div className="fr-timeline">
        <AgentTimeline steps={timelineSteps} />
      </div>
      <div className="fr-context">
        <ContextMeter
          fillPercent={panel.contextFillPercent}
          items={contextItems}
          compacted={panel.memoryArtifactType === 'compressed'}
        />
      </div>
      {panel.activeToolLabel && (
        <div className="fr-tool-info">
          <span
            className="fr-tool-chip"
            style={{
              backgroundColor: `var(--color-tool)`,
              color: '#fff',
            }}
          >
            {panel.activeToolLabel}
          </span>
          {panel.toolResultSummary && (
            <span className="fr-tool-result">{panel.toolResultSummary}</span>
          )}
        </div>
      )}
      {panel.permissionState !== 'none' && (
        <div className="fr-permission-indicator">
          <span
            className={`fr-permission-chip fr-permission-${panel.permissionState}`}
          >
            {panel.permissionState === 'checking' && '⏳ Checking permissions…'}
            {panel.permissionState === 'allowed' && '✓ Allowed'}
            {panel.permissionState === 'blocked' && '✗ Blocked'}
          </span>
        </div>
      )}
      {panel.memoryArtifactType !== 'none' && (
        <div className="fr-memory-indicator">
          <span className="fr-memory-chip">
            {panel.memoryArtifactType === 'compressed' && '🧠 Compaction saved 3 blocks → 1 summary'}
            {panel.memoryArtifactType === 'retrieved' && '🧠 Retrieved session notes from last run'}
          </span>
        </div>
      )}
      {recoveryCopy && (
        <div className="fr-recovery">
          <p className="fr-recovery-text">{recoveryCopy}</p>
        </div>
      )}
    </div>
  );
}
