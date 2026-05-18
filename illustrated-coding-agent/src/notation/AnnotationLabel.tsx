interface AnnotationLabelProps {
  label: string;
  colorVar: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export function AnnotationLabel({
  label,
  colorVar,
  x,
  y,
  targetX,
  targetY,
  side = 'right',
}: AnnotationLabelProps) {
  const textPadding = 12;
  const estimatedWidth = label.length * 7 + textPadding * 2;

  const dx = side === 'right' ? 1 : side === 'left' ? -1 : 0;
  const dy = side === 'top' ? -1 : side === 'bottom' ? 1 : 0;

  return (
    <g>
      <circle
        cx={targetX}
        cy={targetY}
        r={3}
        fill={`var(${colorVar})`}
      />
      <line
        x1={targetX + dx * 8}
        y1={targetY + dy * 8}
        x2={x - dx * (estimatedWidth / 2)}
        y2={y}
        stroke={`var(${colorVar})`}
        strokeWidth={1}
        strokeDasharray="3 2"
      />
      <rect
        x={x - estimatedWidth / 2}
        y={y - 10}
        width={estimatedWidth}
        height={20}
        rx={4}
        fill={`var(${colorVar})`}
        fillOpacity={0.1}
        stroke={`var(${colorVar})`}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 4}
        fontFamily="var(--font-mono)"
        fontSize={10}
        fontWeight={600}
        fill={`var(${colorVar})`}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}
