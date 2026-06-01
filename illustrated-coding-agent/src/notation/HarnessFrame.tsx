import type { ReactNode } from 'react';

export function HarnessFrame({
  children,
  cropped = false,
  viewBox = '0 0 400 320',
}: {
  children: ReactNode;
  cropped?: boolean;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={cropped ? '0 0 400 350' : viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 'var(--max-content-width)', overflow: 'visible' }}
      role="img"
      aria-label="Coding agent system diagram"
    >
      <rect
        x={20}
        y={20}
        width={360}
        height={cropped ? 320 : 280}
        rx={16}
        fill="none"
        stroke="var(--color-harness)"
        strokeWidth={2.5}
        strokeDasharray={cropped ? 'none' : 'none'}
      />
      {cropped && (
        <>
          <rect
            x={380}
            y={20}
            width={40}
            height={320}
            fill="var(--color-paper)"
            stroke="none"
          />
          <line
            x1={370}
            y1={20}
            x2={390}
            y2={20}
            stroke="var(--color-harness)"
            strokeWidth={2.5}
            strokeDasharray="6 3"
          />
          <line
            x1={370}
            y1={340}
            x2={390}
            y2={340}
            stroke="var(--color-harness)"
            strokeWidth={2.5}
            strokeDasharray="6 3"
          />
        </>
      )}
      <text
        x={35}
        y={44}
        fontFamily="var(--font-ui)"
        fontSize={11}
        fontWeight={600}
        fill="var(--color-harness)"
        textAnchor="start"
      >
        HARNESS
      </text>
      {children}
    </svg>
  );
}
