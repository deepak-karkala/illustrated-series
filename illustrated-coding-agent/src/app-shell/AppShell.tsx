import { useEffect } from 'react';
import type { StorySessionState, ChapterId, SceneId, FailureToggles } from '../story/state';
import type { SessionAction } from '../simulator/reducer';
import { INTRO_CONTENT } from '../story/content';
import { selectViewModel } from '../simulator/selectors';
import { validateAndNormalize } from '../simulator/validation';
import { getSceneIds } from '../story/scene-registry';
import { useScrollChapter } from './useScrollChapter';
import { TeaserScene } from './TeaserScene';
import { ModelOnlyScene } from '../notation/ModelOnlyScene';
import { HarnessFramingScene } from '../notation/HarnessFramingScene';
import { FlightRecorderPanel } from './FlightRecorderPanel';
import { FailureModeToggles } from './FailureModeToggles';
import './TeaserScene.css';
import './FlightRecorderPanel.css';

interface AppShellProps {
  state: StorySessionState;
  dispatch: React.Dispatch<SessionAction>;
}

function getContentForScene(sceneId: SceneId) {
  return INTRO_CONTENT.filter((c) => c.sceneId === sceneId);
}

function StickyDiagram({
  chapterId,
  vm,
  toggles,
  dispatch,
}: {
  chapterId: ChapterId;
  vm: ReturnType<typeof selectViewModel>;
  toggles: FailureToggles;
  dispatch: React.Dispatch<SessionAction>;
}) {
  return (
    <>
      {chapterId === 'flight-recorder' && (
        <FailureModeToggles toggles={toggles} dispatch={dispatch} />
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

  const frScenes = getSceneIds('flight-recorder');

  return (
    <main className="app-shell">
      <TeaserScene
        heading={teaserHeading}
        subheading={teaserSubheading}
        annotations={vm.teaserAnnotations}
      />

      <div className="app-body">
        <div className="narrative-column">
          {(['hook', 'illusion-break', 'harness-reveal'] as ChapterId[]).map((chId) => {
            const content = getContentForScene(getSceneIds(chId)[0]);
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
                {content.map((block) => (
                  <div key={block.id} className="chapter-block">
                    <h3 className="chapter-heading">{block.heading}</h3>
                    <p className="chapter-body">{block.body}</p>
                  </div>
                ))}
              </section>
            );
          })}

          {frScenes.map((scId, i) => {
            const content = getContentForScene(scId);
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
                {content.map((block) => (
                  <div key={block.id} className="chapter-block">
                    <h3 className="chapter-heading">{block.heading}</h3>
                    <p className="chapter-body">{block.body}</p>
                  </div>
                ))}
              </section>
            );
          })}
        </div>

        <aside className="sticky-panel" key={chapterId}>
          <StickyDiagram chapterId={chapterId} vm={vm} toggles={validated.state.failureToggles} dispatch={dispatch} />
        </aside>
      </div>
    </main>
  );
}
