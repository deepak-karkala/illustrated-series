import type { ReactNode } from 'react';

export function HarnessFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 320"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 400 }}
    >
      {children}
    </svg>
  );
}
