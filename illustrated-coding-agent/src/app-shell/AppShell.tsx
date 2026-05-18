import type { StorySessionState } from '../story/state';
import { selectViewModel } from '../simulator/selectors';
import { TeaserScene } from './TeaserScene';
import './TeaserScene.css';

interface AppShellProps {
  state: StorySessionState;
}

export function AppShell({ state }: AppShellProps) {
  const vm = selectViewModel(state);

  return (
    <main className="app-shell">
      <TeaserScene
        heading="What happens when you ask a coding agent to build something?"
        subheading="Under the hood, every coding agent is a model nested inside a harness — an orchestration layer that decides what the model can see, do, remember, and recover from. This is the machine, cut open."
        annotations={vm.teaserAnnotations}
      />
    </main>
  );
}
