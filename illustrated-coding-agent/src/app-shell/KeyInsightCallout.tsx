interface KeyInsightCalloutProps {
  insight: string;
}

export function KeyInsightCallout({ insight }: KeyInsightCalloutProps) {
  return (
    <aside className="callout-key-insight" aria-label="Key insight">
      <span className="callout-key-insight-label">Key insight</span>
      <blockquote className="callout-key-insight-text">{insight}</blockquote>
    </aside>
  );
}
