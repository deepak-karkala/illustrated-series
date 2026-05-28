export function BareVsHarnessedDiagram() {
  const midX = 280;

  const leftCol = 30;
  const rightCol = midX + 20;
  const colW = 230;

  const userY = 30;
  const userW = 160;
  const userH = 36;

  const userLabel = 'User: "build a landing page"';

  const modelW = 120;
  const modelH = 50;

  const boxRX = 8;

  const sectionY = 185;

  return (
    <svg
      viewBox="0 0 560 340"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 560 }}
      role="img"
      aria-label="Side-by-side comparison: bare model vs coding agent"
    >
      {/* ── Divider ─────────────────────── */}
      <line
        x1={midX}
        y1={24}
        x2={midX}
        y2={320}
        stroke="var(--color-metal)"
        strokeWidth={1}
        strokeDasharray="4 6"
        opacity={0.5}
      />

      {/* ═══════════════════════════════════
          LEFT: Bare Model (ChatGPT)
          ═══════════════════════════════════ */}
      <text
        x={leftCol + colW / 2}
        y={24}
        fontFamily="var(--font-ui)"
        fontSize={12}
        fontWeight={700}
        fill="var(--color-metal-deep)"
        textAnchor="middle"
      >
        ChatGPT / Bare Model
      </text>

      {/* User prompt box */}
      <rect x={leftCol + (colW - userW) / 2} y={userY} width={userW} height={userH} rx={boxRX} fill="var(--color-human)" fillOpacity={0.1} stroke="var(--color-human)" strokeWidth={1} />
      <text
        x={leftCol + colW / 2}
        y={userY + userH / 2 + 4}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-human)"
        textAnchor="middle"
      >
        {userLabel}
      </text>

      {/* Arrow down */}
      <line x1={leftCol + colW / 2} y1={userY + userH} x2={leftCol + colW / 2} y2={96} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#arrow-down-metal)" />
      <defs>
        <marker id="arrow-down-metal" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={7} markerHeight={5} orient="auto">
          <polygon points="0 0, 5 7, 10 0" fill="var(--color-metal)" />
        </marker>
      </defs>

      {/* Model box */}
      <rect x={leftCol + (colW - modelW) / 2} y={100} width={modelW} height={modelH} rx={boxRX} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.5} />
      <text
        x={leftCol + colW / 2}
        y={125}
        fontFamily="var(--font-mono)"
        fontSize={10}
        fontWeight={600}
        fill="var(--color-model)"
        textAnchor="middle"
      >
        MODEL
      </text>
      <text
        x={leftCol + colW / 2}
        y={140}
        fontFamily="var(--font-mono)"
        fontSize={7}
        fill="var(--color-model)"
        textAnchor="middle"
        fillOpacity={0.7}
      >
        text in → text out
      </text>

      {/* Arrow down from model */}
      <line x1={leftCol + colW / 2} y1={150} x2={leftCol + colW / 2} y2={170} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#arrow-down-metal)" />

      {/* Text output box */}
      <rect x={leftCol + 30} y={174} width={colW - 60} height={34} rx={boxRX} fill="var(--color-metal)" fillOpacity={0.08} stroke="var(--color-metal)" strokeWidth={1} />
      <text
        x={leftCol + colW / 2}
        y={196}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-metal-deep)"
        textAnchor="middle"
      >
        &lt;html&gt;...text output...
      </text>

      {/* Summary callout */}
      <rect x={leftCol + 10} y={sectionY + 38} width={colW - 20} height={78} rx={6} fill="var(--color-warning)" fillOpacity={0.06} stroke="var(--color-warning)" strokeWidth={1} strokeDasharray="4 3" />
      <text
        x={leftCol + colW / 2}
        y={sectionY + 60}
        fontFamily="var(--font-ui)"
        fontSize={10}
        fontWeight={600}
        fill="var(--color-warning)"
        textAnchor="middle"
      >
        No tools
      </text>
      <text
        x={leftCol + colW / 2}
        y={sectionY + 78}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-metal-deep)"
        textAnchor="middle"
      >
        No memory
      </text>
      <text
        x={leftCol + colW / 2}
        y={sectionY + 94}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-metal-deep)"
        textAnchor="middle"
      >
        No verification
      </text>
      <text
        x={leftCol + colW / 2}
        y={sectionY + 110}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-metal-deep)"
        textAnchor="middle"
      >
        Can't touch your code
      </text>

      {/* ═══════════════════════════════════
          RIGHT: Coding Agent
          ═══════════════════════════════════ */}
      <text
        x={rightCol + colW / 2}
        y={24}
        fontFamily="var(--font-ui)"
        fontSize={12}
        fontWeight={700}
        fill="var(--color-harness)"
        textAnchor="middle"
      >
        Coding Agent
      </text>

      {/* User prompt box (same as left) */}
      <rect x={rightCol + (colW - userW) / 2} y={userY} width={userW} height={userH} rx={boxRX} fill="var(--color-human)" fillOpacity={0.1} stroke="var(--color-human)" strokeWidth={1} />
      <text
        x={rightCol + colW / 2}
        y={userY + userH / 2 + 4}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-human)"
        textAnchor="middle"
      >
        {userLabel}
      </text>

      {/* Arrow down */}
      <line x1={rightCol + colW / 2} y1={userY + userH} x2={rightCol + colW / 2} y2={80} stroke="var(--color-harness)" strokeWidth={1.5} markerEnd="url(#arrow-down-harness)" />
      <defs>
        <marker id="arrow-down-harness" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={7} markerHeight={5} orient="auto">
          <polygon points="0 0, 5 7, 10 0" fill="var(--color-harness)" />
        </marker>
      </defs>

      {/* Harness outer frame */}
      <rect x={rightCol + 12} y={84} width={colW - 24} height={76} rx={12} fill="var(--color-harness)" fillOpacity={0.06} stroke="var(--color-harness)" strokeWidth={1.5} />
      <text
        x={rightCol + 25}
        y={100}
        fontFamily="var(--font-ui)"
        fontSize={9}
        fontWeight={600}
        fill="var(--color-harness)"
        textAnchor="start"
      >
        HARNESS
      </text>

      {/* Model inside harness */}
      <rect x={rightCol + (colW - modelW) / 2 - 10} y={107} width={modelW} height={40} rx={7} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.2} />
      <text
        x={rightCol + colW / 2}
        y={128}
        fontFamily="var(--font-mono)"
        fontSize={9}
        fontWeight={600}
        fill="var(--color-model)"
        textAnchor="middle"
      >
        MODEL
      </text>
      <text
        x={rightCol + colW / 2}
        y={140}
        fontFamily="var(--font-mono)"
        fontSize={7}
        fill="var(--color-model)"
        textAnchor="middle"
        fillOpacity={0.7}
      >
        reasoning
      </text>

      {/* Arrows from harness to tools */}
      <line x1={rightCol + 6} y1={122} x2={rightCol - 30} y2={122} stroke="var(--color-tool)" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={rightCol + colW - 6} y1={122} x2={rightCol + colW + 8} y2={122} stroke="var(--color-tool)" strokeWidth={1} strokeDasharray="3 2" />

      {/* Tools box left */}
      <rect x={rightCol - 60} y={110} width={50} height={22} rx={4} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={0.8} />
      <text x={rightCol - 35} y={125} fontFamily="var(--font-mono)" fontSize={7} fill="var(--color-tool)" textAnchor="middle">read_file</text>

      {/* Tools box right */}
      <rect x={rightCol + colW + 6} y={110} width={50} height={22} rx={4} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={0.8} />
      <text x={rightCol + colW + 31} y={125} fontFamily="var(--font-mono)" fontSize={7} fill="var(--color-tool)" textAnchor="middle">run tests</text>

      {/* The loop chain below harness — 4 steps in a row */}
      {/* Step 1: Read */}
      <rect x={rightCol + 6} y={sectionY} width={48} height={28} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
      <text x={rightCol + 30} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-tool)" textAnchor="middle">read</text>

      <text x={rightCol + 58} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-metal)" textAnchor="middle">→</text>

      {/* Step 2: Write */}
      <rect x={rightCol + 68} y={sectionY} width={48} height={28} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
      <text x={rightCol + 92} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-tool)" textAnchor="middle">write</text>

      <text x={rightCol + 120} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-metal)" textAnchor="middle">→</text>

      {/* Step 3: Run */}
      <rect x={rightCol + 130} y={sectionY} width={48} height={28} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
      <text x={rightCol + 154} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-tool)" textAnchor="middle">run</text>

      <text x={rightCol + 182} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-metal)" textAnchor="middle">→</text>

      {/* Step 4: Verify */}
      <rect x={rightCol + 185} y={sectionY} width={52} height={28} rx={5} fill="var(--color-success)" fillOpacity={0.1} stroke="var(--color-success)" strokeWidth={1} />
      <text x={rightCol + 211} y={sectionY + 18} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-success)" textAnchor="middle">verify</text>

      {/* Feedback arrow back — loop indication */}
      <path
        d={`M ${rightCol + 211} ${sectionY + 28} Q ${rightCol + 211} ${sectionY + 42} ${rightCol + 30} ${sectionY + 42} Q ${rightCol + 6} ${sectionY + 42} ${rightCol + 6} ${sectionY + 28}`}
        fill="none"
        stroke="var(--color-memory)"
        strokeWidth={1}
        strokeDasharray="3 3"
        markerEnd="url(#arrow-loop)"
      />
      <defs>
        <marker id="arrow-loop" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 5 7, 10 0" fill="var(--color-memory)" />
        </marker>
      </defs>
      <text x={rightCol + colW / 2} y={sectionY + 48} fontFamily="var(--font-mono)" fontSize={7} fill="var(--color-memory)" textAnchor="middle">loop until done</text>

      {/* Summary callout */}
      <rect x={rightCol + 10} y={sectionY + 58} width={colW - 20} height={62} rx={6} fill="var(--color-harness)" fillOpacity={0.06} stroke="var(--color-harness)" strokeWidth={1} />
      <text
        x={rightCol + colW / 2}
        y={sectionY + 78}
        fontFamily="var(--font-ui)"
        fontSize={10}
        fontWeight={600}
        fill="var(--color-harness)"
        textAnchor="middle"
      >
        Tools + Memory + Verification
      </text>
      <text
        x={rightCol + colW / 2}
        y={sectionY + 96}
        fontFamily="var(--font-mono)"
        fontSize={8}
        fill="var(--color-harness)"
        textAnchor="middle"
        fillOpacity={0.7}
      >
        Reads, writes, runs, verifies.
      </text>
      <text
        x={rightCol + colW / 2}
        y={sectionY + 112}
        fontFamily="var(--font-mono)"
        fontSize={7}
        fill="var(--color-harness)"
        textAnchor="middle"
        fillOpacity={0.6}
      >
        Adjusts. Retries. Finishes the job.
      </text>
    </svg>
  );
}
