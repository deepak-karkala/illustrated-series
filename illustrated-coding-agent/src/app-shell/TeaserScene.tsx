import { HarnessFrame } from '../notation/HarnessFrame';
import { ContextSlice } from '../notation/ContextSlice';
import { ToolPath } from '../notation/ToolPath';
import { AnnotationLabel } from '../notation/AnnotationLabel';
import { BareVsHarnessedDiagram } from '../notation/BareVsHarnessedDiagram';
import type { TeaserAnnotation } from '../story/scene';

interface TeaserSceneProps {
  heading: string;
  subheading: string;
  annotations: TeaserAnnotation[];
}

export function TeaserScene({ heading, subheading, annotations }: TeaserSceneProps) {
  const contextItems = [
    { label: 'System instructions', colorVar: '--color-harness' },
    { label: 'User: build a landing page', colorVar: '--color-human' },
    { label: 'Tool output: index.html', colorVar: '--color-tool' },
    { label: 'Plan: scaffold → style → verify', colorVar: '--color-model' },
  ];

  return (
    <section className="teaser-viewport">
      <div className="teaser-content">
        <div className="teaser-copy">
          <h1 className="teaser-heading">{heading}</h1>
          <p className="teaser-subheading">{subheading}</p>
        </div>
        <div className="teaser-diagram">
          <BareVsHarnessedDiagram />
          <HarnessFrame cropped>
            <ContextSlice items={contextItems} cropped />
            <ToolPath />
            {annotations.map((a) => (
              <AnnotationLabel
                key={a.id}
                label={a.label}
                colorVar={a.colorVar}
                x={a.x}
                y={a.y}
                targetX={a.x + 25}
                targetY={a.y + 10}
                side="right"
              />
            ))}
          </HarnessFrame>
        </div>
      </div>
    </section>
  );
}
