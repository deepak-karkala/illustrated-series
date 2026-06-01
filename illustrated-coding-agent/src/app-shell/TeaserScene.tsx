import { HarnessFrame } from '../notation/HarnessFrame';
import { ContextSlice } from '../notation/ContextSlice';
import { ToolPath } from '../notation/ToolPath';
import type { TeaserAnnotation } from '../story/scene';

interface TeaserSceneProps {
  heading: string;
  subheading: string;
  annotations: TeaserAnnotation[];
}

export function TeaserScene({ heading, subheading }: TeaserSceneProps) {
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
          <p className="teaser-scroll-cue">Scroll to explore ↓</p>
        </div>
        <div className="teaser-diagram">
          <span className="teaser-diagram-caption">Inside every coding agent</span>
          <div className="teaser-diagram-frame">
            <HarnessFrame cropped>
              <ContextSlice items={contextItems} cropped />
              <ToolPath />
            </HarnessFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
