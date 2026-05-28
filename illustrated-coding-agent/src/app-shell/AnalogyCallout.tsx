interface AnalogyCalloutProps {
  analogy: string;
}

export function AnalogyCallout({ analogy }: AnalogyCalloutProps) {
  return (
    <aside className="callout-analogy" aria-label="Developer analogy">
      <span className="callout-analogy-label">The developer's version</span>
      <p className="callout-analogy-text">{analogy}</p>
    </aside>
  );
}
