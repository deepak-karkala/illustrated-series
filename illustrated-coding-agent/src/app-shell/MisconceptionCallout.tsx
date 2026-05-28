interface MisconceptionCalloutProps {
  wrong: string;
  actual: string;
  whyItMatters: string;
}

export function MisconceptionCallout({ wrong, actual, whyItMatters }: MisconceptionCalloutProps) {
  return (
    <aside className="callout-misconception" aria-label="Common misconception">
      <div className="callout-misconception-row">
        <span className="callout-misconception-tag callout-misconception-tag--wrong">Wrong idea</span>
        <p className="callout-misconception-text">{wrong}</p>
      </div>
      <div className="callout-misconception-row">
        <span className="callout-misconception-tag callout-misconception-tag--actual">Actually</span>
        <p className="callout-misconception-text">{actual}</p>
      </div>
      <div className="callout-misconception-row">
        <span className="callout-misconception-tag callout-misconception-tag--why">Why it matters</span>
        <p className="callout-misconception-text">{whyItMatters}</p>
      </div>
    </aside>
  );
}
