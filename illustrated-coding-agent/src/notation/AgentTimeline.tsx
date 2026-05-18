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
  const startX = 50;
  const startY = 30;
  const stepSpacing = 52;

  return (
    <svg
      viewBox="0 0 520 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 560 }}
      role="img"
      aria-label="Agent loop timeline showing past, active, and future steps"
    >
      <line
        x1={startX}
        y1={startY}
        x2={startX + (steps.length - 1) * stepSpacing}
        y2={startY}
        stroke="var(--color-metal)"
        strokeWidth={2}
        opacity={0.3}
      />

      {steps.map((step, i) => {
        const cx = startX + i * stepSpacing;
        const style = STATUS_STYLES[step.status];
        const isActive = step.status === 'active';

        return (
          <g key={step.id}>
            <circle
              cx={cx}
              cy={startY}
              r={isActive ? 6 : 4}
              fill={style.fill}
              fillOpacity={style.opacity}
              stroke={style.fill}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={style.opacity}
            />
            {isActive && (
              <circle
                cx={cx}
                cy={startY}
                r={10}
                fill="none"
                stroke="var(--color-harness)"
                strokeWidth={1}
                opacity={0.3}
              />
            )}
            <text
              x={cx}
              y={startY + 22}
              fontFamily="var(--font-mono)"
              fontSize={isActive ? 9 : 8}
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
