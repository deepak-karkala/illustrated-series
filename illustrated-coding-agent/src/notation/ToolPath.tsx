interface ToolPathProps {
  modelLabel?: string;
  toolLabel?: string;
}

export function ToolPath({
  modelLabel = 'MODEL',
  toolLabel = 'read_file',
}: ToolPathProps) {
  const modelX = 100;
  const modelY = 200;
  const modelW = 80;
  const modelH = 46;
  const toolX = 250;
  const toolY = 200;
  const toolW = 100;
  const toolH = 46;

  return (
    <g>
      <defs>
        <marker
          id="arrowhead-tool"
          viewBox="0 0 10 7"
          refX={9}
          refY={3.5}
          markerWidth={8}
          markerHeight={6}
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="var(--color-tool)"
          />
        </marker>
      </defs>
      <rect
        x={modelX}
        y={modelY}
        width={modelW}
        height={modelH}
        rx={8}
        fill="var(--color-model)"
        fillOpacity={0.12}
        stroke="var(--color-model)"
        strokeWidth={1.5}
      />
      <text
        x={modelX + modelW / 2}
        y={modelY + 18}
        fontFamily="var(--font-mono)"
        fontSize={10}
        fontWeight={600}
        fill="var(--color-model)"
        textAnchor="middle"
      >
        {modelLabel}
      </text>
      <text
        x={modelX + modelW / 2}
        y={modelY + 34}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-model)"
        textAnchor="middle"
        fillOpacity={0.7}
      >
        reasoning engine
      </text>

      <line
        x1={modelX + modelW}
        y1={modelY + modelH / 2}
        x2={toolX}
        y2={toolY + toolH / 2}
        stroke="var(--color-tool)"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead-tool)"
      />
      <text
        x={(modelX + modelW + toolX) / 2}
        y={modelY + modelH / 2 - 8}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-tool)"
        textAnchor="middle"
      >
        tool call
      </text>

      <rect
        x={toolX}
        y={toolY}
        width={toolW}
        height={toolH}
        rx={6}
        fill="var(--color-tool)"
        fillOpacity={0.12}
        stroke="var(--color-tool)"
        strokeWidth={1.5}
      />
      <text
        x={toolX + toolW / 2}
        y={toolY + 18}
        fontFamily="var(--font-mono)"
        fontSize={9}
        fontWeight={600}
        fill="var(--color-tool)"
        textAnchor="middle"
      >
        TOOL
      </text>
      <text
        x={toolX + toolW / 2}
        y={toolY + 34}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-tool)"
        textAnchor="middle"
        fillOpacity={0.7}
      >
        {toolLabel}
      </text>
    </g>
  );
}
