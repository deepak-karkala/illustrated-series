import { useEffect } from 'react';
import type { StorySessionState } from '../story/state';
import type { SessionAction } from '../simulator/reducer';
import type { ChapterId } from '../story/state';
import { INTRO_CONTENT } from '../story/content';
import { selectViewModel } from '../simulator/selectors';
import { useScrollChapter } from './useScrollChapter';
import { TeaserScene } from './TeaserScene';
import './TeaserScene.css';

interface AppShellProps {
  state: StorySessionState;
  dispatch: React.Dispatch<SessionAction>;
}

function getContentForChapter(chapterId: ChapterId) {
  return INTRO_CONTENT.filter((c) => c.chapterId === chapterId);
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

export function AppShell({ state, dispatch }: AppShellProps) {
  const { chapterId } = useScrollChapter();
  const vm = selectViewModel(state);

  useEffect(() => {
    if (chapterId !== state.chapterId) {
      dispatch({ type: 'SET_CHAPTER', chapterId });
    }
  }, [chapterId, state.chapterId, dispatch]);

  return (
    <main className="app-shell">
      <TeaserScene
        heading={CHAPTER_LABELS.hook.subtitle}
        subheading="Under the hood, every coding agent is a model nested inside a harness — an orchestration layer that decides what the model can see, do, remember, and recover from. This is the machine, cut open."
        annotations={vm.teaserAnnotations}
      />

      {(['hook', 'illusion-break', 'harness-reveal'] as ChapterId[]).map((chId) => {
        const content = getContentForChapter(chId);
        const label = CHAPTER_LABELS[chId];

        return (
          <section
            key={chId}
            id={`chapter-${chId}`}
            data-chapter={chId}
            className={`chapter-section ${chapterId === chId ? 'chapter-active' : ''}`}
          >
            <div className="chapter-content">
              <div className="chapter-copy">
                <span className="chapter-number">{label.number}</span>
                <h2 className="chapter-title">{label.title}</h2>
                {content.map((block) => (
                  <div key={block.id} className="chapter-block">
                    <h3 className="chapter-heading">{block.heading}</h3>
                    <p className="chapter-body">{block.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
