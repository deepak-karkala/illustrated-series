interface ContextMeterProps {
  fillPercent: number;
  items?: { label: string; colorVar: string }[];
  compacted?: boolean;
}

export function ContextMeter({ fillPercent, items = [], compacted = false }: ContextMeterProps) {
  const barX = 60;
  const barY = 30;
  const barW = 280;
  const barH = 32;
  const fillW = (barW - 4) * (fillPercent / 100);

  const warningActive = fillPercent >= 75;

  return (
    <svg
      viewBox="0 0 400 130"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 400 }}
      role="img"
      aria-label={`Context window at ${fillPercent}% capacity`}
    >
      <text
        x={barX}
        y={barY - 8}
        fontFamily="var(--font-mono)"
        fontSize={12}
        fontWeight={600}
        fill="var(--color-memory)"
      >
        CONTEXT WINDOW
      </text>
      <text
        x={barX + barW}
        y={barY - 8}
        fontFamily="var(--font-mono)"
        fontSize={12}
        fill={warningActive ? 'var(--color-warning)' : 'var(--color-metal-deep)'}
        textAnchor="end"
        fontWeight={warningActive ? 600 : 400}
      >
        {fillPercent}%
      </text>

      <rect
        x={barX}
        y={barY}
        width={barW}
        height={barH}
        rx={6}
        fill="var(--color-paper-deep)"
        stroke={warningActive ? 'var(--color-warning)' : 'var(--color-metal)'}
        strokeWidth={warningActive ? 2 : 1}
      />

      <rect
        x={barX + 2}
        y={barY + 2}
        width={Math.max(fillW, 0)}
        height={barH - 4}
        rx={4}
        fill="var(--color-memory)"
        fillOpacity={0.35}
      />

      <line
        x1={barX + barW * 0.75}
        y1={barY - 4}
        x2={barX + barW * 0.75}
        y2={barY + barH + 4}
        stroke="var(--color-warning)"
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.6}
      />

      {compacted && (
        <g>
          <rect
            x={barX + barW / 2}
            y={barY + 8}
            width={24}
            height={16}
            rx={3}
            fill="var(--color-warning)"
            fillOpacity={0.15}
            stroke="var(--color-warning)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <text
            x={barX + barW / 2 + 12}
            y={barY + 19}
            fontFamily="var(--font-mono)"
            fontSize={7}
            fill="var(--color-warning)"
            textAnchor="middle"
          >
            →
          </text>
          <rect
            x={barX + barW / 2 + 30}
            y={barY + 8}
            width={20}
            height={16}
            rx={3}
            fill="var(--color-memory)"
            fillOpacity={0.2}
            stroke="var(--color-memory)"
            strokeWidth={1}
          />
        </g>
      )}

      {items.slice(0, 4).map((item, i) => (
        <g key={i}>
          <rect
            x={barX + 8 + i * 65}
            y={barY + barH + 14}
            width={56}
            height={16}
            rx={3}
            fill={`var(${item.colorVar})`}
            fillOpacity={0.1}
            stroke={`var(${item.colorVar})`}
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
          <text
            x={barX + 8 + i * 65 + 28}
            y={barY + barH + 25}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill={`var(${item.colorVar})`}
            textAnchor="middle"
          >
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
