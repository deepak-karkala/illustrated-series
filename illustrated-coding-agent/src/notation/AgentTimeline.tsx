import type { TimelineStep } from '../story/view-model';

interface AgentTimelineProps {
  steps: TimelineStep[];
}

const STATUS_STYLES = {
  past: { fill: 'var(--color-metal)', opacity: 0.4 },
  active: { fill: 'var(--color-harness)', opacity: 1 },
  future: { fill: 'var(--color-metal)', opacity: 0.2 },
} as const;

export function AgentTimeline({ steps }: AgentTimelineProps) {
  const startX = 40;
  const lineY = 50;
  const stepSpacing = 62;

  return (
    <svg
      viewBox="0 0 540 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 540 }}
      role="img"
      aria-label="Agent loop timeline showing past, active, and future steps"
    >
      <line
        x1={startX}
        y1={lineY}
        x2={startX + (steps.length - 1) * stepSpacing}
        y2={lineY}
        stroke="var(--color-metal)"
        strokeWidth={2}
        opacity={0.3}
      />

      {steps.map((step, i) => {
        const cx = startX + i * stepSpacing;
        const style = STATUS_STYLES[step.status];
        const isActive = step.status === 'active';
        const above = i % 2 === 0;
        const labelY = above ? lineY - 16 : lineY + 28;

        return (
          <g key={step.id}>
            <circle
              cx={cx}
              cy={lineY}
              r={isActive ? 7 : 5}
              fill={style.fill}
              fillOpacity={style.opacity}
              stroke={style.fill}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={style.opacity}
            />
            {isActive && (
              <circle
                cx={cx}
                cy={lineY}
                r={12}
                fill="none"
                stroke="var(--color-harness)"
                strokeWidth={1}
                opacity={0.3}
              />
            )}
            <text
              x={cx}
              y={labelY}
              fontFamily="var(--font-mono)"
              fontSize={isActive ? 10 : 9}
              fontWeight={isActive ? 600 : 400}
              fill={style.fill}
              textAnchor="middle"
              opacity={isActive ? 1 : 0.7}
            >
              {step.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
