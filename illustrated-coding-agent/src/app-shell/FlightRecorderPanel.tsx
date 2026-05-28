import type { SimulatorPanelProps, TimelineStep } from '../story/view-model';
import { AgentTimeline } from '../notation/AgentTimeline';
import { ContextMeter } from '../notation/ContextMeter';
import { MemoryArtifact } from '../notation/MemoryArtifact';

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
    { label: 'Tool out ×2', colorVar: '--color-tool' },
  ],
  full: [
    { label: 'System', colorVar: '--color-harness' },
    { label: 'User request', colorVar: '--color-human' },
    { label: 'Plan v2', colorVar: '--color-model' },
    { label: 'Tool out ×3', colorVar: '--color-tool' },
  ],
};

function getContextItems(fillPercent: number) {
  if (fillPercent >= 80) return CONTEXT_ITEMS.full;
  if (fillPercent >= 55) return CONTEXT_ITEMS.mid;
  return CONTEXT_ITEMS.request;
}

function isVisible(components: string[], id: string) {
  return components.includes(id);
}

export function FlightRecorderPanel({ panel, timelineSteps, recoveryCopy }: FlightRecorderPanelProps) {
  const contextItems = getContextItems(panel.contextFillPercent);
  const isPressure = panel.contextFillPercent >= 80;
  const isCompaction = panel.memoryArtifactType === 'compressed';
  const isToy = panel.panelVariant === 'toy';
  const v = panel.visibleComponents;

  return (
    <div className="flight-recorder-panel">
      <div className="fr-timeline">
        <AgentTimeline steps={timelineSteps} />
      </div>

      {isToy && (
        <div className="fr-toy-simplified">
          <p className="fr-toy-hint">Simplified trace — timeline and tool info only.</p>
        </div>
      )}

      {!isToy && (
        <>
          {isVisible(v, 'context-meter') ? (
            <div className="fr-context">
              <ContextMeter
                fillPercent={panel.contextFillPercent}
                items={contextItems}
                compacted={isCompaction}
              />
            </div>
          ) : (
            <div className="fr-placeholder">
              <div className="fr-placeholder-inner">
                <span className="fr-placeholder-label">Context meter</span>
                <span className="fr-placeholder-hint">— visible at Step 4</span>
              </div>
            </div>
          )}

          {isVisible(v, 'tool-path') &&
            isPressure && (
              <div className="fr-pressure-warning">
                <span className="fr-pressure-label">Context pressure warning</span>
                <p className="fr-pressure-text">
                  The context window is near capacity. The model may experience context rot — attention
                  diffusing across stale content, rushing decisions, or skipping verification. The harness
                  must either compact the conversation or offload work to a subagent.
                </p>
              </div>
            )}

          {isVisible(v, 'memory-artifact') &&
            isCompaction && (
              <div className="fr-compaction-states">
                <div className="fr-compaction-before">
                  <span className="fr-compaction-label">Before</span>
                  <div className="fr-compaction-blocks">
                    <span className="fr-compaction-block" style={{ backgroundColor: 'var(--color-model)', opacity: 0.12 }}>Plan detail</span>
                    <span className="fr-compaction-block" style={{ backgroundColor: 'var(--color-tool)', opacity: 0.12 }}>Tool output</span>
                    <span className="fr-compaction-block" style={{ backgroundColor: 'var(--color-human)', opacity: 0.12 }}>Constraints</span>
                  </div>
                </div>
                <span className="fr-compaction-arrow">→</span>
                <div className="fr-compaction-after">
                  <span className="fr-compaction-label">After</span>
                  <div className="fr-compaction-summary">
                    <span className="fr-compaction-block fr-compaction-block--summary">1 summary block</span>
                  </div>
                </div>
              </div>
            )}

          {isVisible(v, 'permission-gate') ? (
            panel.permissionState !== 'none' && (
              <div className="fr-permission-indicator">
                <span className={`fr-permission-chip fr-permission-${panel.permissionState}`}>
                  {panel.permissionLabel || (
                    panel.permissionState === 'checking' ? '⏳ Checking permissions…' :
                    panel.permissionState === 'allowed' ? '✓ Allowed' :
                    '✗ Blocked'
                  )}
                </span>
              </div>
            )
          ) : (
            <div className="fr-placeholder">
              <div className="fr-placeholder-inner">
                <span className="fr-placeholder-label">Permission gate</span>
                <span className="fr-placeholder-hint">— visible at Step 3</span>
              </div>
            </div>
          )}

          {isVisible(v, 'memory-artifact') ? (
            <div className="fr-memory-visual">
              <MemoryArtifact
                variant={
                  panel.memoryArtifactType === 'none' ? 'working' : panel.memoryArtifactType
                }
                label={panel.memoryLabel}
              />
            </div>
          ) : (
            <div className="fr-placeholder">
              <div className="fr-placeholder-inner">
                <span className="fr-placeholder-label">Memory artifact</span>
                <span className="fr-placeholder-hint">— visible at Step 5</span>
              </div>
            </div>
          )}

          {recoveryCopy && (
            <div className="fr-recovery">
              <p className="fr-recovery-text">{recoveryCopy}</p>
            </div>
          )}
        </>
      )}

      {panel.activeToolLabel && (
        <div className="fr-tool-info">
          <span
            className="fr-tool-chip"
            style={{ backgroundColor: `var(--color-tool)`, color: '#fff' }}
          >
            {panel.activeToolLabel}
          </span>
          {panel.toolResultSummary && (
            <span className="fr-tool-result">{panel.toolResultSummary}</span>
          )}
        </div>
      )}
    </div>
  );
}
