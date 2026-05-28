import { useEffect } from 'react';
import type { StorySessionState, ChapterId, SceneId, FailureToggles, LensMode } from '../story/state';
import type { SessionAction } from '../simulator/reducer';
import { INTRO_CONTENT } from '../story/content';
import { selectViewModel } from '../simulator/selectors';
import { validateAndNormalize, validateContentSchema } from '../simulator/validation';
import { getSceneIds } from '../story/scene-registry';
import { useScrollChapter } from './useScrollChapter';
import { TeaserScene } from './TeaserScene';
import { ModelOnlyScene } from '../notation/ModelOnlyScene';
import { HarnessFramingScene } from '../notation/HarnessFramingScene';
import { FlightRecorderPanel } from './FlightRecorderPanel';
import { FailureModeToggles } from './FailureModeToggles';
import { LensToggle } from './LensToggle';
import { StateDrawer } from './StateDrawer';
import { DrawerToggle } from './DrawerToggle';
import { DevOverlay } from './DevOverlay';
import { AnalogyCallout } from './AnalogyCallout';
import { MisconceptionCallout } from './MisconceptionCallout';
import { KeyInsightCallout } from './KeyInsightCallout';
import type { ContentBlock } from '../story/scene';
import './TeaserScene.css';
import './FlightRecorderPanel.css';
import './StateDrawer.css';
import './DevOverlay.css';
import './Callouts.css';

interface AppShellProps {
  state: StorySessionState;
  dispatch: React.Dispatch<SessionAction>;
}

function getContentForScene(sceneId: SceneId, lensMode: LensMode) {
  const sceneContent = INTRO_CONTENT.filter((c) => c.sceneId === sceneId);
  const lensContent = sceneContent.filter((c) => c.lensMode === lensMode);
  return lensContent.length > 0 ? lensContent : sceneContent.filter((c) => c.lensMode === 'product');
}

function getCallouts(content: ContentBlock[]) {
  const analogy = content.find((c) => c.analogy)?.analogy;
  const misconception = content.find((c) => c.misconception)?.misconception;
  const keyInsight = content.find((c) => c.keyInsight)?.keyInsight;
  return { analogy, misconception, keyInsight };
}

function StickyDiagram({
  chapterId,
  vm,
  toggles,
  lensMode,
  mobileControlsOpen,
  dispatch,
}: {
  chapterId: ChapterId;
  vm: ReturnType<typeof selectViewModel>;
  toggles: FailureToggles;
  lensMode: LensMode;
  mobileControlsOpen: boolean;
  dispatch: React.Dispatch<SessionAction>;
}) {
  return (
    <>
      {chapterId === 'flight-recorder' && (
        <div className="fr-controls">
          <LensToggle lensMode={lensMode} dispatch={dispatch} />
          <button
            className="fr-controls-expand"
            onClick={() => dispatch({ type: 'TOGGLE_MOBILE_CONTROLS' })}
            aria-expanded={mobileControlsOpen}
          >
            Controls {mobileControlsOpen ? '▴' : '▾'}
          </button>
          <div className={`fr-controls-secondary${mobileControlsOpen ? ' fr-controls-visible' : ''}`}>
            <FailureModeToggles toggles={toggles} dispatch={dispatch} />
            <DrawerToggle onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })} />
          </div>
        </div>
      )}
      {chapterId === 'illusion-break' && <ModelOnlyScene />}
      {chapterId === 'harness-reveal' && <HarnessFramingScene />}
      {chapterId === 'flight-recorder' && (
        <FlightRecorderPanel panel={vm.panelProps} timelineSteps={vm.timelineSteps} recoveryCopy={vm.recoveryCopy} />
      )}
    </>
  );
}

type ChapterLabel = Record<ChapterId, { number: string; title: string; subtitle: string }>;

const CHAPTER_LABELS: ChapterLabel = {
  'hook': {
    number: '1',
    title: 'The Ask',
    subtitle: 'What happens when you ask a coding agent to build something?',
  },
  'illusion-break': {
    number: '2',
    title: 'The Illusion Break',
    subtitle: 'The model alone cannot do this work.',
  },
  'harness-reveal': {
    number: '3',
    title: 'The Harness Reveal',
    subtitle: 'Agent = Model + Harness. This is the real system.',
  },
  'flight-recorder': {
    number: '4',
    title: 'Flight Recorder',
    subtitle: 'Watch the agent loop step by step.',
  },
  'field-guide': {
    number: '5',
    title: 'Field Guide',
    subtitle: 'How to read any agent.',
  },
  'appendix': {
    number: '6',
    title: 'Appendix',
    subtitle: 'Behind the explainer.',
  },
};

const FR_SCENE_LABELS: Record<string, string> = {
  'first-loop': 'The Core Loop',
  'tool-invocation': 'Tool Dispatch',
  'permission-gate': 'Permission Boundary',
  'context-pressure': 'Context Pressure',
  'compaction': 'Compaction',
  'memory-retrieval': 'Memory & Continuity',
  'failure-permission-blocked': 'When the Gate Says No',
  'failure-tool-failure': 'When a Tool Fails',
};

export function AppShell({ state, dispatch }: AppShellProps) {
  const { chapterId, sceneId } = useScrollChapter();
  const validated = validateAndNormalize(state);
  const vm = selectViewModel(validated.state);

  useEffect(() => {
    if (chapterId !== state.chapterId || sceneId !== state.sceneId) {
      dispatch({ type: 'SET_CHAPTER', chapterId });
      dispatch({ type: 'SET_SCENE', sceneId });
    }
  }, [chapterId, sceneId, state.chapterId, state.sceneId, dispatch]);

  const teaserHeading = INTRO_CONTENT.find((c) => c.id === 'hook-heading')?.heading ?? '';
  const teaserSubheading = INTRO_CONTENT.find((c) => c.id === 'hook-heading')?.body ?? '';

  const lensMode = validated.state.lensMode;

  const frScenes = getSceneIds('flight-recorder');

  return (
    <main className="app-shell">
      <a href="#chapter-hook" className="skip-link">Skip to content</a>
      <TeaserScene
        heading={teaserHeading}
        subheading={teaserSubheading}
        annotations={vm.teaserAnnotations}
      />

      <div className="app-body">
        <div className="narrative-column">
          {(['hook', 'illusion-break', 'harness-reveal'] as ChapterId[]).map((chId) => {
            const content = getContentForScene(getSceneIds(chId)[0], lensMode);
            const callouts = getCallouts(content);
            const label = CHAPTER_LABELS[chId];

            return (
              <section
                key={chId}
                id={`chapter-${chId}`}
                data-chapter={chId}
                data-scene={getSceneIds(chId)[0]}
                className={`narrative-section ${chapterId === chId ? 'section-active' : ''}`}
              >
                <span className="chapter-number">{label.number}</span>
                <h2 className="chapter-title">{label.title}</h2>
                {callouts.analogy && <AnalogyCallout analogy={callouts.analogy} />}
                {content.map((block) => (
                  <div key={block.id} className="chapter-block">
                    <h3 className="chapter-heading">{block.heading}</h3>
                    <p className="chapter-body">{block.body}</p>
                  </div>
                ))}
                {callouts.misconception && (
                  <MisconceptionCallout
                    wrong={callouts.misconception.wrong}
                    actual={callouts.misconception.actual}
                    whyItMatters={callouts.misconception.whyItMatters}
                  />
                )}
                {callouts.keyInsight && <KeyInsightCallout insight={callouts.keyInsight} />}
              </section>
            );
          })}

          {frScenes.map((scId, i) => {
            const content = getContentForScene(scId, lensMode);
            const callouts = getCallouts(content);
            const frNumber = `4.${i + 1}`;

            return (
              <section
                key={scId}
                id={`scene-${scId}`}
                data-chapter="flight-recorder"
                data-scene={scId}
                className={`narrative-section ${sceneId === scId ? 'section-active' : ''}`}
              >
                <span className="chapter-number">{frNumber}</span>
                <h2 className="chapter-title">{FR_SCENE_LABELS[scId] ?? scId}</h2>
                {callouts.analogy && <AnalogyCallout analogy={callouts.analogy} />}
                {content.map((block) => (
                  <div key={block.id} className="chapter-block">
                    <h3 className="chapter-heading">{block.heading}</h3>
                    <p className="chapter-body">{block.body}</p>
                  </div>
                ))}
                {callouts.misconception && (
                  <MisconceptionCallout
                    wrong={callouts.misconception.wrong}
                    actual={callouts.misconception.actual}
                    whyItMatters={callouts.misconception.whyItMatters}
                  />
                )}
                {callouts.keyInsight && <KeyInsightCallout insight={callouts.keyInsight} />}
              </section>
            );
          })}

          {(['field-guide'] as ChapterId[]).map((chId) => {
            const content = getContentForScene(getSceneIds(chId)[0], lensMode);
            const callouts = getCallouts(content);
            const label = CHAPTER_LABELS[chId];

            return (
              <section
                key={chId}
                id={`chapter-${chId}`}
                data-chapter={chId}
                data-scene={getSceneIds(chId)[0]}
                className="field-guide-section"
              >
                <span className="chapter-number">{label.number}</span>
                <h2 className="chapter-title">{label.title}</h2>
                {callouts.analogy && <AnalogyCallout analogy={callouts.analogy} />}
                {content[0] && (
                  <p className="chapter-body field-guide-intro">{content[0].body}</p>
                )}
                <div className="field-guide-heuristics">
                  {content.slice(1).map((block, i) => (
                    <div key={block.id} className="field-guide-heuristic">
                      <span className="field-guide-heuristic-number">{i + 1}</span>
                      <div>
                        <h3 className="chapter-heading">{block.heading}</h3>
                        <p className="chapter-body">{block.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {callouts.misconception && (
                  <MisconceptionCallout
                    wrong={callouts.misconception.wrong}
                    actual={callouts.misconception.actual}
                    whyItMatters={callouts.misconception.whyItMatters}
                  />
                )}
                {callouts.keyInsight && <KeyInsightCallout insight={callouts.keyInsight} />}
              </section>
            );
          })}

          {(['appendix'] as ChapterId[]).map((chId) => {
            const content = getContentForScene(getSceneIds(chId)[0], lensMode);
            const callouts = getCallouts(content);
            const label = CHAPTER_LABELS[chId];

            return (
              <section
                key={chId}
                id={`chapter-${chId}`}
                data-chapter={chId}
                data-scene={getSceneIds(chId)[0]}
                className="appendix-section"
              >
                <span className="chapter-number appendix-number">{label.number}</span>
                <h2 className="chapter-title appendix-title">{label.title}</h2>
                {callouts.analogy && <AnalogyCallout analogy={callouts.analogy} />}
                {content.map((block) => (
                  <div key={block.id} className="chapter-block appendix-block">
                    <h3 className="chapter-heading">{block.heading}</h3>
                    <p className="chapter-body">{block.body}</p>
                  </div>
                ))}
                {callouts.misconception && (
                  <MisconceptionCallout
                    wrong={callouts.misconception.wrong}
                    actual={callouts.misconception.actual}
                    whyItMatters={callouts.misconception.whyItMatters}
                  />
                )}
                {callouts.keyInsight && <KeyInsightCallout insight={callouts.keyInsight} />}
              </section>
            );
          })}
        </div>

        <aside className="sticky-panel" key={chapterId}>
          <StickyDiagram chapterId={chapterId} vm={vm} toggles={validated.state.failureToggles} lensMode={lensMode} mobileControlsOpen={validated.state.mobileControlsOpen} dispatch={dispatch} />
        </aside>
      </div>

      <StateDrawer
        drawer={vm.drawerProps}
        panel={vm.panelProps}
        open={validated.state.drawerOpen}
        onClose={() => dispatch({ type: 'TOGGLE_DRAWER' })}
      />
      <DevOverlay state={validated.state} warnings={[...validated.warnings, ...validateContentSchema()]} />
    </main>
  );
}
