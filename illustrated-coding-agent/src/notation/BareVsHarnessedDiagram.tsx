import { HarnessFrame } from './HarnessFrame';
import { AnnotationLabel } from './AnnotationLabel';

export function BareVsHarnessedDiagram() {
  return (
    <div className="bare-vs-harnessed">
      {/* ── Left: Bare Model ─────────────────── */}
      <div className="bare-vs-harnessed-col">
        <span className="bare-vs-harnessed-label">ChatGPT / Bare Model</span>
        <svg
          viewBox="0 0 360 340"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%' }}
          role="img"
          aria-label="Bare model: user types a request, model produces text output, no tools, no memory, no verification"
        >
          {/* User prompt */}
          <rect x={100} y={36} width={160} height={36} rx={8} fill="var(--color-human)" fillOpacity={0.1} stroke="var(--color-human)" strokeWidth={1} />
          <text x={180} y={59} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-human)" textAnchor="middle">User: "build a landing page"</text>

          <line x1={180} y1={72} x2={180} y2={96} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#arrow-bare)" />
          <defs>
            <marker id="arrow-bare" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={7} markerHeight={5} orient="auto">
              <polygon points="0 0, 5 7, 10 0" fill="var(--color-metal)" />
            </marker>
          </defs>

          {/* Model box */}
          <rect x={120} y={100} width={120} height={50} rx={8} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.5} />
          <text x={180} y={124} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-model)" textAnchor="middle">MODEL</text>
          <text x={180} y={140} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-model)" textAnchor="middle" fillOpacity={0.7}>reasoning engine</text>

          <line x1={180} y1={150} x2={180} y2={176} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#arrow-bare)" />

          {/* Text output */}
          <rect x={90} y={180} width={180} height={34} rx={6} fill="var(--color-metal)" fillOpacity={0.08} stroke="var(--color-metal)" strokeWidth={1} />
          <text x={180} y={202} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-metal-deep)" textAnchor="middle">&lt;html&gt;...text output...&lt;/html&gt;</text>

          {/* Warning annotations */}
          <AnnotationLabel label="No tools" colorVar="--color-warning" x={270} y={230} targetX={220} targetY={230} side="right" />
          <AnnotationLabel label="No memory" colorVar="--color-warning" x={270} y={260} targetX={220} targetY={260} side="right" />
          <AnnotationLabel label="No verification" colorVar="--color-warning" x={270} y={290} targetX={220} targetY={290} side="right" />

          <text x={180} y={322} fontFamily="var(--font-ui)" fontSize={9} fill="var(--color-metal-deep)" textAnchor="middle" opacity={0.7}>
            Can't read files, run commands, or check results.
          </text>
        </svg>
      </div>

      {/* ── Right: Coding Agent ─────────────────── */}
      <div className="bare-vs-harnessed-col">
        <span className="bare-vs-harnessed-label">Coding Agent</span>
        <HarnessFrame viewBox="0 0 360 340" cropped={false}>
          {/* User prompt */}
          <rect x={100} y={50} width={160} height={36} rx={8} fill="var(--color-human)" fillOpacity={0.1} stroke="var(--color-human)" strokeWidth={1} />
          <text x={180} y={73} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-human)" textAnchor="middle">User: "build a landing page"</text>

          <line x1={180} y1={86} x2={180} y2={108} stroke="var(--color-harness)" strokeWidth={1.5} markerEnd="url(#arrow-h)" />
          <defs>
            <marker id="arrow-h" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={7} markerHeight={5} orient="auto">
              <polygon points="0 0, 5 7, 10 0" fill="var(--color-harness)" />
            </marker>
          </defs>

          {/* Model inside harness */}
          <rect x={120} y={112} width={120} height={46} rx={8} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.5} />
          <text x={180} y={135} fontFamily="var(--font-mono)" fontSize={10} fontWeight={600} fill="var(--color-model)" textAnchor="middle">MODEL</text>
          <text x={180} y={149} fontFamily="var(--font-mono)" fontSize={7} fill="var(--color-model)" textAnchor="middle" fillOpacity={0.7}>reasoning engine</text>

          {/* Tool callout — AnnotationLabel pointing from model to tools */}
          <AnnotationLabel label="Tool dispatch" colorVar="--color-tool" x={280} y={135} targetX={245} targetY={135} side="right" />

          {/* Step chain — read → write → run → verify, flowing downward */}
          <rect x={48} y={180} width={48} height={24} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
          <text x={72} y={196} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-tool)" textAnchor="middle">read</text>

          <text x={104} y={196} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-metal)" textAnchor="middle">→</text>

          <rect x={112} y={180} width={48} height={24} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
          <text x={136} y={196} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-tool)" textAnchor="middle">write</text>

          <text x={168} y={196} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-metal)" textAnchor="middle">→</text>

          <rect x={176} y={180} width={48} height={24} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
          <text x={200} y={196} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-tool)" textAnchor="middle">run</text>

          <text x={232} y={196} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-metal)" textAnchor="middle">→</text>

          <rect x={240} y={180} width={48} height={24} rx={5} fill="var(--color-success)" fillOpacity={0.1} stroke="var(--color-success)" strokeWidth={1} />
          <text x={264} y={196} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-success)" textAnchor="middle">verify</text>

          {/* Key insight annotation */}
          <AnnotationLabel label="Loop until done" colorVar="--color-memory" x={200} y={260} targetX={200} targetY={220} side="bottom" />

          <text x={180} y={322} fontFamily="var(--font-ui)" fontSize={9} fill="var(--color-harness)" textAnchor="middle" opacity={0.7}>
            Reads, writes, runs, verifies. Adjusts. Finishes.
          </text>
        </HarnessFrame>
      </div>
    </div>
  );
}
