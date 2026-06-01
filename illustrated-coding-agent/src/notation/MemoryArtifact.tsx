type MemoryVariant = 'working' | 'compressed' | 'retrieved' | 'stale';

interface MemoryArtifactProps {
  variant: MemoryVariant;
  label?: string;
}

const VARIANT_STYLES: Record<MemoryVariant, { stroke: string; dash: string; opacity: number; label: string }> = {
  working: {
    stroke: 'var(--color-model)',
    dash: 'none',
    opacity: 1,
    label: 'Working set',
  },
  compressed: {
    stroke: 'var(--color-warning)',
    dash: '4 3',
    opacity: 0.7,
    label: 'Compressed',
  },
  retrieved: {
    stroke: 'var(--color-memory)',
    dash: 'none',
    opacity: 0.85,
    label: 'Retrieved',
  },
  stale: {
    stroke: 'var(--color-metal-deep)',
    dash: '3 3',
    opacity: 0.45,
    label: 'Stale',
  },
};

export function MemoryArtifact({ variant, label }: MemoryArtifactProps) {
  const style = VARIANT_STYLES[variant];
  const displayLabel = label ?? style.label;

  const x = 20;
  const y = 20;
  const w = 180;
  const h = 72;

  return (
    <svg
      viewBox="0 0 240 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 240 }}
      role="img"
      aria-label={`Memory artifact: ${displayLabel}`}
    >
      <text
        x={x + 10}
        y={y - 4}
        fontFamily="var(--font-mono)"
        fontSize={11}
        fontWeight={600}
        fill="var(--color-memory)"
      >
        MEMORY
      </text>

      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={`${style.stroke}`}
        fillOpacity={variant === 'stale' ? 0.04 : 0.08}
        stroke={style.stroke}
        strokeWidth={1.5}
        strokeDasharray={style.dash}
        opacity={style.opacity}
      />

      {variant === 'compressed' && (
        <>
          <rect
            x={x + 12}
            y={y + 10}
            width={50}
            height={18}
            rx={3}
            fill="var(--color-warning)"
            fillOpacity={0.1}
            stroke="var(--color-warning)"
            strokeWidth={0.5}
            strokeDasharray="2 2"
          />
          <rect
            x={x + 68}
            y={y + 10}
            width={50}
            height={18}
            rx={3}
            fill="var(--color-warning)"
            fillOpacity={0.1}
            stroke="var(--color-warning)"
            strokeWidth={0.5}
            strokeDasharray="2 2"
          />
          <rect
            x={x + 124}
            y={y + 10}
            width={44}
            height={18}
            rx={3}
            fill="var(--color-warning)"
            fillOpacity={0.1}
            stroke="var(--color-warning)"
            strokeWidth={0.5}
            strokeDasharray="2 2"
          />

          <text
            x={x + w / 2}
            y={y + 41}
            fontFamily="var(--font-mono)"
            fontSize={10}
            fill="var(--color-warning)"
            textAnchor="middle"
          >
            →
          </text>

          <rect
            x={x + 55}
            y={y + 32}
            width={68}
            height={22}
            rx={4}
            fill="var(--color-memory)"
            fillOpacity={0.15}
            stroke="var(--color-memory)"
            strokeWidth={1}
          />
          <text
            x={x + 89}
            y={y + 47}
            fontFamily="var(--font-mono)"
            fontSize={10}
            fontWeight={600}
            fill="var(--color-memory)"
            textAnchor="middle"
          >
            1 summary
          </text>
        </>
      )}

      {variant === 'working' && (
        <>
          <rect
            x={x + 12}
            y={y + 12}
            width={58}
            height={18}
            rx={3}
            fill="var(--color-model)"
            fillOpacity={0.1}
            stroke="var(--color-model)"
            strokeWidth={0.5}
          />
          <text
            x={x + 41}
            y={y + 24}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-model)"
            textAnchor="middle"
          >
            Current plan
          </text>

          <rect
            x={x + 12}
            y={y + 35}
            width={64}
            height={18}
            rx={3}
            fill="var(--color-tool)"
            fillOpacity={0.1}
            stroke="var(--color-tool)"
            strokeWidth={0.5}
          />
          <text
            x={x + 44}
            y={y + 47}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-tool)"
            textAnchor="middle"
          >
            Tool results
          </text>

          <rect
            x={x + 82}
            y={y + 12}
            width={50}
            height={18}
            rx={3}
            fill="var(--color-human)"
            fillOpacity={0.1}
            stroke="var(--color-human)"
            strokeWidth={0.5}
          />
          <text
            x={x + 107}
            y={y + 24}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-human)"
            textAnchor="middle"
          >
            Constraints
          </text>
        </>
      )}

      {variant === 'retrieved' && (
        <>
          <line
            x1={x + w / 2}
            y1={y - 8}
            x2={x + w / 2}
            y2={y}
            stroke="var(--color-memory)"
            strokeWidth={1.5}
            strokeDasharray="2 2"
            markerEnd="url(#arrow-retrieve)"
          />
          <defs>
            <marker
              id="arrow-retrieve"
              viewBox="0 0 10 7"
              refX={5}
              refY={7}
              markerWidth={6}
              markerHeight={5}
              orient="auto"
            >
              <polygon points="0 0, 5 7, 10 0" fill="var(--color-memory)" />
            </marker>
          </defs>
          <text
            x={x + w / 2}
            y={y - 14}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-memory)"
            textAnchor="middle"
          >
            from durable store
          </text>

          <rect
            x={x + 14}
            y={y + 12}
            width={60}
            height={18}
            rx={3}
            fill="var(--color-memory)"
            fillOpacity={0.12}
            stroke="var(--color-memory)"
            strokeWidth={0.5}
          />
          <text
            x={x + 44}
            y={y + 24}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-memory)"
            textAnchor="middle"
          >
            Project structure
          </text>

          <rect
            x={x + 14}
            y={y + 35}
            width={50}
            height={18}
            rx={3}
            fill="var(--color-memory)"
            fillOpacity={0.12}
            stroke="var(--color-memory)"
            strokeWidth={0.5}
          />
          <text
            x={x + 39}
            y={y + 47}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-memory)"
            textAnchor="middle"
          >
            Last decisions
          </text>

          <rect
            x={x + 74}
            y={y + 12}
            width={48}
            height={18}
            rx={3}
            fill="var(--color-memory)"
            fillOpacity={0.12}
            stroke="var(--color-memory)"
            strokeWidth={0.5}
          />
          <text
            x={x + 98}
            y={y + 24}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill="var(--color-memory)"
            textAnchor="middle"
          >
            Conventions
          </text>
        </>
      )}

      {variant === 'stale' && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 4}
          fontFamily="var(--font-mono)"
          fontSize={12}
          fill="var(--color-metal-deep)"
          textAnchor="middle"
          opacity={0.4}
        >
          Stale context
        </text>
      )}

      <text
        x={x + w / 2}
        y={y + h + 16}
        fontFamily="var(--font-mono)"
        fontSize={11}
        fontWeight={600}
        fill={style.stroke}
        textAnchor="middle"
        opacity={style.opacity}
      >
        {displayLabel}
      </text>
    </svg>
  );
}
