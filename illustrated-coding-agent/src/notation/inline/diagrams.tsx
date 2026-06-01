export function ChefAndKitchenDiagram() {
  return (
    <svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 400 }} role="img" aria-label="Recipe book vs full kitchen — model output vs harnessed execution">
      {/* Recipe book (model output) */}
      <rect x={20} y={40} width={140} height={160} rx={8} fill="var(--color-model)" fillOpacity={0.08} stroke="var(--color-model)" strokeWidth={1.5} />
      <text x={90} y={68} fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill="var(--color-model)" textAnchor="middle">RECIPE</text>
      <rect x={40} y={82} width={100} height={12} rx={3} fill="var(--color-model)" fillOpacity={0.12} />
      <rect x={40} y={100} width={80} height={12} rx={3} fill="var(--color-model)" fillOpacity={0.12} />
      <rect x={40} y={118} width={100} height={12} rx={3} fill="var(--color-model)" fillOpacity={0.12} />
      <text x={90} y={150} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-model)" textAnchor="middle" fillOpacity={0.7}>text output only</text>

      {/* Arrow */}
      <text x={200} y={110} fontFamily="var(--font-mono)" fontSize={16} fill="var(--color-metal)" textAnchor="middle">→</text>

      {/* Kitchen (harnessed agent) */}
      <rect x={240} y={40} width={140} height={160} rx={8} fill="var(--color-harness)" fillOpacity={0.06} stroke="var(--color-harness)" strokeWidth={1.5} />
      <text x={310} y={68} fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill="var(--color-harness)" textAnchor="middle">KITCHEN</text>
      <rect x={260} y={82} width={48} height={28} rx={4} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={0.8} />
      <text x={284} y={100} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-tool)" textAnchor="middle">read_file</text>
      <rect x={316} y={82} width={48} height={28} rx={4} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={0.8} />
      <text x={340} y={100} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-tool)" textAnchor="middle">run tests</text>
      <rect x={260} y={120} width={104} height={28} rx={4} fill="var(--color-memory)" fillOpacity={0.1} stroke="var(--color-memory)" strokeWidth={0.8} />
      <text x={312} y={138} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-memory)" textAnchor="middle">Memory + State</text>
      <text x={310} y={170} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-harness)" textAnchor="middle" fillOpacity={0.7}>tools + memory + verify</text>
    </svg>
  );
}

export function HarnessSubsystemsDiagram() {
  return (
    <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 400 }} role="img" aria-label="Five harness subsystems around the model">
      {/* Central model */}
      <rect x={150} y={78} width={100} height={50} rx={8} fill="var(--color-model)" fillOpacity={0.12} stroke="var(--color-model)" strokeWidth={1.5} />
      <text x={200} y={100} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-model)" textAnchor="middle">MODEL</text>
      <text x={200} y={118} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-model)" textAnchor="middle" fillOpacity={0.7}>reasoning</text>

      {/* Subsystems arrayed around */}
      {[
        { label: 'Instructions', x: 145, y: 24, color: '--color-harness' },
        { label: 'Tools', x: 288, y: 95, color: '--color-tool' },
        { label: 'Environment', x: 110, y: 170, color: '--color-memory' },
        { label: 'State', x: 200, y: 190, color: '--color-memory' },
        { label: 'Feedback', x: 290, y: 170, color: '--color-success' },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 40} y={s.y} width={80} height={30} rx={6} fill={`var(${s.color})`} fillOpacity={0.1} stroke={`var(${s.color})`} strokeWidth={1} />
          <text x={s.x} y={s.y + 20} fontFamily="var(--font-mono)" fontSize={9} fontWeight={600} fill={`var(${s.color})`} textAnchor="middle">{s.label}</text>
        </g>
      ))}

      <line x1={200} y1={78} x2={145} y2={54} stroke="var(--color-harness)" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={250} y1={103} x2={288} y2={95} stroke="var(--color-tool)" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={180} y1={128} x2={110} y2={170} stroke="var(--color-memory)" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={220} y1={128} x2={290} y2={170} stroke="var(--color-success)" strokeWidth={1} strokeDasharray="3 2" />
    </svg>
  );
}

export function LoopCycleDiagram() {
  const cx = 220, cy = 140, r = 72;
  const steps = [
    { label: 'Gather', angle: -90, color: '--color-harness' },
    { label: 'Act', angle: 0, color: '--color-tool' },
    { label: 'Observe', angle: 90, color: '--color-memory' },
    { label: 'Verify', angle: 180, color: '--color-success' },
  ];
  return (
    <svg viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }} role="img" aria-label="Circular agent loop: gather → act → observe → verify">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-metal)" strokeWidth={1.5} strokeDasharray="6 3" opacity={0.4} />
      {steps.map((s) => {
        const angleRad = (s.angle * Math.PI) / 180;
        const lx = cx + r * Math.cos(angleRad);
        const ly = cy + r * Math.sin(angleRad);
        return (
          <g key={s.label}>
            <circle cx={lx} cy={ly} r={26} fill={`var(${s.color})`} fillOpacity={0.12} stroke={`var(${s.color})`} strokeWidth={1.5} />
            <text x={lx} y={ly + 5} fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill={`var(${s.color})`} textAnchor="middle">{s.label}</text>
          </g>
        );
      })}
      <path d={`M ${cx + r + 5},${cy} Q ${cx + r + 25},${cy - 15} ${cx + r + 5},${cy - 30}`} fill="none" stroke="var(--color-memory)" strokeWidth={1.5} markerEnd="url(#loop-arrow)" />
      <defs>
        <marker id="loop-arrow" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 5 7, 10 0" fill="var(--color-memory)" />
        </marker>
      </defs>
      <text x={220} y={230} fontFamily="var(--font-mono)" fontSize={11} fill="var(--color-memory)" textAnchor="middle">loop until done</text>
    </svg>
  );
}

export function ToolDispatchSequenceDiagram() {
  const boxes = [
    { label: 'Model emits\ntool_use block', x: 60, y: 10, color: '--color-model' },
    { label: 'Harness\nintercepts', x: 60, y: 66, color: '--color-harness' },
    { label: 'Permission\ncheck', x: 60, y: 122, color: '--color-warning' },
    { label: 'Execute\ntool', x: 270, y: 66, color: '--color-tool' },
    { label: 'Return\nobservation', x: 270, y: 122, color: '--color-memory' },
  ];
  return (
    <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }} role="img" aria-label="Tool dispatch sequence: model emits → harness intercepts → permission → execute → return">
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width={100} height={52} rx={8} fill={`var(${b.color})`} fillOpacity={0.1} stroke={`var(${b.color})`} strokeWidth={1} />
          {b.label.split('\n').map((line, li) => (
            <text key={li} x={b.x + 50} y={b.y + 20 + li * 14} fontFamily="var(--font-mono)" fontSize={10} fill={`var(${b.color})`} textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}
      <line x1={160} y1={36} x2={160} y2={66} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#td-arrow)" />
      <line x1={160} y1={118} x2={160} y2={122} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#td-arrow)" />
      <line x1={160} y1={174} x2={270} y2={174} stroke="var(--color-harness)" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#td-arrow)" />
      <line x1={370} y1={118} x2={370} y2={122} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#td-arrow)" />
      <defs>
        <marker id="td-arrow" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 5 7, 10 0" fill="var(--color-metal)" />
        </marker>
      </defs>
    </svg>
  );
}

export function PermissionFunnelDiagram() {
  const layers = [
    { label: 'Auto-allow (reads)', y: 30, w: 200, color: '--color-success' },
    { label: 'Confirm (writes, network)', y: 80, w: 160, color: '--color-warning' },
    { label: 'Deny-first (force push, rm)', y: 130, w: 120, color: '--color-warning' },
  ];
  return (
    <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 400 }} role="img" aria-label="Permission funnel: auto-allow → confirm → deny-first">
      {layers.map((l) => (
        <g key={l.label}>
          <rect x={(400 - l.w) / 2} y={l.y} width={l.w} height={40} rx={6} fill={`var(${l.color})`} fillOpacity={0.08} stroke={`var(${l.color})`} strokeWidth={1} />
          <text x={200} y={l.y + 25} fontFamily="var(--font-mono)" fontSize={10} fontWeight={600} fill={`var(${l.color})`} textAnchor="middle">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

export function ContextFillDiagram() {
  const fillPercent = 85;
  const barW = 280, barH = 32;
  return (
    <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 400 }} role="img" aria-label="Context window filling from empty to 85% with warning threshold">
      {/* Empty */}
      <rect x={50} y={20} width={barW} height={barH} rx={6} fill="var(--color-paper-deep)" stroke="var(--color-metal)" strokeWidth={1} />
      <text x={50} y={12} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-metal-deep)">Start: empty window</text>

      {/* Arrow */}
      <text x={200} y={74} fontFamily="var(--font-mono)" fontSize={14} fill="var(--color-metal)" textAnchor="middle">↓</text>

      {/* Filled */}
      <rect x={50} y={90} width={barW} height={barH} rx={6} fill="var(--color-paper-deep)" stroke="var(--color-warning)" strokeWidth={2} />
      <rect x={52} y={92} width={(barW - 4) * fillPercent / 100} height={barH - 4} rx={4} fill="var(--color-memory)" fillOpacity={0.35} />
      <line x1={50 + barW * 0.75} y1={86} x2={50 + barW * 0.75} y2={122} stroke="var(--color-warning)" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={50 + barW} y={84} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-warning)" textAnchor="end" fontWeight={600}>85%</text>
      <text x={50 + barW} y={140} fontFamily="var(--font-mono)" fontSize={8} fill="var(--color-warning)" textAnchor="end">pressure threshold</text>
    </svg>
  );
}

export function CompactionBeforeAfterDiagram() {
  return (
    <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }} role="img" aria-label="Compaction: before (dense blocks) → after (summary block + freed space)">
      {/* Before */}
      <rect x={20} y={30} width={165} height={120} rx={8} fill="var(--color-paper-deep)" stroke="var(--color-metal)" strokeWidth={1} />
      <text x={102} y={20} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-metal-deep)" textAnchor="middle">Before</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={32} y={42 + i * 20} width={140} height={16} rx={3} fill={['var(--color-model)', 'var(--color-tool)', 'var(--color-human)', 'var(--color-memory)', 'var(--color-metal)'][i]} fillOpacity={0.12} />
      ))}

      {/* Arrow */}
      <text x={230} y={90} fontFamily="var(--font-mono)" fontSize={16} fill="var(--color-warning)" textAnchor="middle">→</text>

      {/* After */}
      <rect x={255} y={30} width={165} height={120} rx={8} fill="var(--color-paper-deep)" stroke="var(--color-metal)" strokeWidth={1} />
      <text x={337} y={20} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-metal-deep)" textAnchor="middle">After</text>
      <rect x={272} y={42} width={130} height={36} rx={4} fill="var(--color-memory)" fillOpacity={0.15} stroke="var(--color-memory)" strokeWidth={1} />
      <text x={337} y={64} fontFamily="var(--font-mono)" fontSize={10} fontWeight={600} fill="var(--color-memory)" textAnchor="middle">1 summary block</text>
      <rect x={272} y={90} width={130} height={44} rx={4} fill="var(--color-success)" fillOpacity={0.06} stroke="var(--color-success)" strokeWidth={1} strokeDasharray="4 3" />
      <text x={337} y={116} fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-success)" textAnchor="middle">freed space</text>
    </svg>
  );
}

export function SessionHandoffDiagram() {
  return (
    <svg viewBox="0 0 440 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }} role="img" aria-label="Session handoff: Session A ends → memory store → Session B loads">
      {/* Session A */}
      <rect x={20} y={40} width={130} height={90} rx={8} fill="var(--color-paper-deep)" stroke="var(--color-metal)" strokeWidth={1} />
      <text x={85} y={26} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-metal-deep)" textAnchor="middle">Session A</text>
      <rect x={35} y={56} width={100} height={18} rx={3} fill="var(--color-human)" fillOpacity={0.1} />
      <rect x={35} y={82} width={80} height={18} rx={3} fill="var(--color-tool)" fillOpacity={0.1} />

      {/* Arrow to memory */}
      <line x1={150} y1={85} x2={195} y2={85} stroke="var(--color-memory)" strokeWidth={1.5} markerEnd="url(#sh-arrow)" />

      {/* Memory store */}
      <rect x={200} y={60} width={96} height={64} rx={6} fill="var(--color-memory)" fillOpacity={0.1} stroke="var(--color-memory)" strokeWidth={1.5} />
      <text x={248} y={98} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-memory)" textAnchor="middle">Memory</text>

      {/* Arrow to Session B */}
      <line x1={296} y1={85} x2={341} y2={85} stroke="var(--color-memory)" strokeWidth={1.5} markerEnd="url(#sh-arrow)" />

      {/* Session B */}
      <rect x={350} y={40} width={90} height={90} rx={8} fill="var(--color-paper-deep)" stroke="var(--color-metal)" strokeWidth={1} />
      <text x={395} y={26} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-metal-deep)" textAnchor="middle">Session B</text>
      <rect x={360} y={56} width={70} height={18} rx={3} fill="var(--color-harness)" fillOpacity={0.12} />
      <rect x={360} y={82} width={70} height={18} rx={3} fill="var(--color-memory)" fillOpacity={0.12} />
      <defs>
        <marker id="sh-arrow" viewBox="0 0 10 7" refX={9} refY={3.5} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-memory)" />
        </marker>
      </defs>
    </svg>
  );
}

export function BlockedActionPathDiagram() {
  return (
    <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }} role="img" aria-label="Blocked action: request → gate → denied → re-plan loop">
      {/* Request */}
      <rect x={20} y={30} width={96} height={46} rx={6} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
      <text x={68} y={58} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-tool)" textAnchor="middle">bash deploy</text>

      {/* Arrow to gate */}
      <line x1={116} y1={53} x2={176} y2={53} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#ba-arrow)" />

      {/* Gate */}
      <rect x={180} y={30} width={106} height={46} rx={6} fill="var(--color-warning)" fillOpacity={0.1} stroke="var(--color-warning)" strokeWidth={1.5} />
      <text x={233} y={58} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-warning)" textAnchor="middle">✗ DENIED</text>

      {/* Arrow down to re-plan */}
      <line x1={233} y1={76} x2={233} y2={101} stroke="var(--color-warning)" strokeWidth={1.5} markerEnd="url(#ba-arrow-d)" />

      {/* Re-plan */}
      <rect x={145} y={105} width={156} height={46} rx={6} fill="var(--color-harness)" fillOpacity={0.08} stroke="var(--color-harness)" strokeWidth={1} />
      <text x={223} y={133} fontFamily="var(--font-mono)" fontSize={11} fontWeight={600} fill="var(--color-harness)" textAnchor="middle">Re-plan alternative</text>

      {/* Loop back arrow */}
      <path d={`M 140,128 Q 110,128 100,80 Q 95,53 140,53`} fill="none" stroke="var(--color-memory)" strokeWidth={1} strokeDasharray="4 3" markerEnd="url(#ba-arrow)" />
      <defs>
        <marker id="ba-arrow" viewBox="0 0 10 7" refX={9} refY={3.5} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-memory)" />
        </marker>
        <marker id="ba-arrow-d" viewBox="0 0 10 7" refX={5} refY={7} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 5 7, 10 0" fill="var(--color-warning)" />
        </marker>
      </defs>
    </svg>
  );
}

export function ErrorRecoveryLoopDiagram() {
  return (
    <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 400 }} role="img" aria-label="Error recovery: failure → inspect → retry / reroute / escalate">
      {/* Failure */}
      <rect x={30} y={30} width={80} height={36} rx={6} fill="var(--color-warning)" fillOpacity={0.1} stroke="var(--color-warning)" strokeWidth={1.5} />
      <text x={70} y={53} fontFamily="var(--font-mono)" fontSize={9} fontWeight={600} fill="var(--color-warning)" textAnchor="middle">✗ Failed</text>

      {/* Arrow to inspect */}
      <line x1={110} y1={48} x2={155} y2={48} stroke="var(--color-metal)" strokeWidth={1.5} markerEnd="url(#er-arrow)" />

      {/* Inspect */}
      <rect x={160} y={30} width={80} height={36} rx={6} fill="var(--color-harness)" fillOpacity={0.08} stroke="var(--color-harness)" strokeWidth={1} />
      <text x={200} y={53} fontFamily="var(--font-mono)" fontSize={9} fontWeight={600} fill="var(--color-harness)" textAnchor="middle">Inspect</text>

      {/* Branches */}
      <line x1={200} y1={66} x2={90} y2={110} stroke="var(--color-tool)" strokeWidth={1} />
      <line x1={200} y1={66} x2={200} y2={110} stroke="var(--color-memory)" strokeWidth={1} />
      <line x1={200} y1={66} x2={310} y2={110} stroke="var(--color-warning)" strokeWidth={1} />

      <rect x={50} y={110} width={80} height={30} rx={5} fill="var(--color-tool)" fillOpacity={0.1} stroke="var(--color-tool)" strokeWidth={1} />
      <text x={90} y={130} fontFamily="var(--font-mono)" fontSize={8} fontWeight={600} fill="var(--color-tool)" textAnchor="middle">Retry</text>

      <rect x={160} y={110} width={80} height={30} rx={5} fill="var(--color-memory)" fillOpacity={0.1} stroke="var(--color-memory)" strokeWidth={1} />
      <text x={200} y={130} fontFamily="var(--font-mono)" fontSize={8} fontWeight={600} fill="var(--color-memory)" textAnchor="middle">Reroute</text>

      <rect x={270} y={110} width={80} height={30} rx={5} fill="var(--color-warning)" fillOpacity={0.1} stroke="var(--color-warning)" strokeWidth={1} />
      <text x={310} y={130} fontFamily="var(--font-mono)" fontSize={8} fontWeight={600} fill="var(--color-warning)" textAnchor="middle">Escalate</text>

      <defs>
        <marker id="er-arrow" viewBox="0 0 10 7" refX={9} refY={3.5} markerWidth={6} markerHeight={5} orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-metal)" />
        </marker>
      </defs>
    </svg>
  );
}
