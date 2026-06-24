import { HarnessFrame } from './HarnessFrame';
import { AnnotationLabel } from './AnnotationLabel';

export function BareVsHarnessedDiagram() {
  return (
    <div className="bare-vs-harnessed">
      {/* ── Top: Bare Model ─────────────────── */}
      <div className="bare-vs-harnessed-col">
        <span className="bare-vs-harnessed-label">ChatGPT / Bare Model</span>
        <svg
          viewBox="0 0 400 280"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%' }}
          role="img"
          aria-label="Bare model: user types a request, model produces text output, no tools, no memory, no verification"
        >
          {/* User prompt */}
          <rect x={80} y={20} width={240} height={40} rx={8} fill="var(--color-human)" fillOpacity={0.1} stroke="var(--color-human)" strokeWidth={1.5} />
          <text x={200} y={45} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-human)" textAnchor="middle">User: "build a landing page"</text>

          <line x1={200} y1={60} x2={200} y2={84} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#arrow-bare)" />
          <defs>
            <marker id="arrow-bare" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={7} markerHeight={5} orient="auto">
              <polygon points="0 0, 5 7, 10 0" fill="var(--color-metal)" />
            </marker>
          </defs>

          {/* Model box */}
          <rect x={120} y={88} width={160} height={54} rx={8} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.5} />
          <text x={200} y={114} fontFamily="var(--font-mono)" fontSize={15} fontWeight={600} fill="var(--color-model)" textAnchor="middle">MODEL</text>
          <text x={200} y={132} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-model)" textAnchor="middle" fillOpacity={0.7}>reasoning engine</text>

          <line x1={200} y1={142} x2={200} y2={166} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#arrow-bare)" />

          {/* Text output */}
          <rect x={70} y={170} width={260} height={38} rx={6} fill="var(--color-metal)" fillOpacity={0.08} stroke="var(--color-metal)" strokeWidth={1} />
          <text x={200} y={194} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-metal-deep)" textAnchor="middle">&lt;html&gt;...text output...&lt;/html&gt;</text>

          {/* Warning annotations */}
          <AnnotationLabel label="No tools" colorVar="--color-warning" x={80} y={220} targetX={120} targetY={220} side="left" />
          <AnnotationLabel label="No memory" colorVar="--color-warning" x={200} y={240} targetX={200} targetY={230} side="bottom" />
          <AnnotationLabel label="No verification" colorVar="--color-warning" x={310} y={220} targetX={280} targetY={220} side="right" />
        </svg>
      </div>

      <div className="bare-vs-harnessed-divider">vs</div>

      {/* ── Bottom: Coding Agent ─────────────────── */}
      <div className="bare-vs-harnessed-col">
        <span className="bare-vs-harnessed-label">Coding Agent</span>
        <HarnessFrame
          viewBox="0 0 400 280"
          cropped={false}
          ariaLabel="Harnessed coding agent comparison diagram"
        >
          {/* User prompt */}
          <rect x={80} y={34} width={240} height={40} rx={8} fill="var(--color-human)" fillOpacity={0.1} stroke="var(--color-human)" strokeWidth={1.5} />
          <text x={200} y={59} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-human)" textAnchor="middle">User: "build a landing page"</text>

          <line x1={200} y1={74} x2={200} y2={96} stroke="var(--color-harness)" strokeWidth={1.5} markerEnd="url(#arrow-h)" />
          <defs>
            <marker id="arrow-h" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={7} markerHeight={5} orient="auto">
              <polygon points="0 0, 5 7, 10 0" fill="var(--color-harness)" />
            </marker>
          </defs>

          {/* Model inside harness */}
          <rect x={120} y={100} width={160} height={50} rx={8} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.5} />
          <text x={200} y={124} fontFamily="var(--font-mono)" fontSize={15} fontWeight={600} fill="var(--color-model)" textAnchor="middle">MODEL</text>
          <text x={200} y={140} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-model)" textAnchor="middle" fillOpacity={0.7}>reasoning engine</text>

          {/* Tool callout */}
          <AnnotationLabel label="Tool dispatch" colorVar="--color-tool" x={320} y={122} targetX={284} targetY={122} side="right" />

          {/* Step chain */}
          <rect x={32} y={172} width={60} height={30} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
          <text x={62} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-tool)" textAnchor="middle">read</text>

          <text x={104} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-metal)" textAnchor="middle">→</text>

          <rect x={112} y={172} width={60} height={30} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
          <text x={142} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-tool)" textAnchor="middle">write</text>

          <text x={184} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-metal)" textAnchor="middle">→</text>

          <rect x={192} y={172} width={56} height={30} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
          <text x={220} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-tool)" textAnchor="middle">run</text>

          <text x={260} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-metal)" textAnchor="middle">→</text>

          <rect x={268} y={172} width={64} height={30} rx={5} fill="var(--color-success)" fillOpacity={0.1} stroke="var(--color-success)" strokeWidth={1} />
          <text x={300} y={192} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-success)" textAnchor="middle">verify</text>

          {/* Loop annotation */}
          <AnnotationLabel label="Loop until done" colorVar="--color-memory" x={200} y={248} targetX={200} targetY={215} side="bottom" />
        </HarnessFrame>
      </div>
    </div>
  );
}
