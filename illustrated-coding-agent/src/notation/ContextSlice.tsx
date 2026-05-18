interface ContextItem {
  label: string;
  colorVar: string;
}

interface ContextSliceProps {
  items: ContextItem[];
  cropped?: boolean;
}

export function ContextSlice({ items, cropped = true }: ContextSliceProps) {
  const containerX = 35;
  const containerY = 60;
  const containerW = 180;
  const itemH = 24;
  const itemGap = 4;
  const containerH = items.length * (itemH + itemGap) + 16;

  return (
    <g>
      <rect
        x={containerX}
        y={containerY}
        width={containerW}
        height={containerH}
        rx={8}
        fill="var(--color-paper)"
        stroke="var(--color-metal)"
        strokeWidth={1}
      />
      {cropped && (
        <rect
          x={containerX + containerW}
          y={containerY}
          width={20}
          height={containerH}
          fill="var(--color-paper)"
          stroke="none"
        />
      )}
      <text
        x={containerX + 10}
        y={containerY - 6}
        fontFamily="var(--font-mono)"
        fontSize={9}
        fill="var(--color-metal-deep)"
      >
        CONTEXT WINDOW
      </text>
      {items.map((item, i) => (
        <g key={i}>
          <rect
            x={containerX + 8}
            y={containerY + 10 + i * (itemH + itemGap)}
            width={containerW - (cropped ? 28 : 16)}
            height={itemH}
            rx={4}
            fill={`var(${item.colorVar})`}
            fillOpacity={0.12}
            stroke={`var(${item.colorVar})`}
            strokeWidth={0.5}
            strokeOpacity={0.4}
          />
          <text
            x={containerX + 16}
            y={containerY + 10 + i * (itemH + itemGap) + 15}
            fontFamily="var(--font-mono)"
            fontSize={9}
            fill={`var(${item.colorVar})`}
          >
            {item.label}
          </text>
        </g>
      ))}
    </g>
  );
}
