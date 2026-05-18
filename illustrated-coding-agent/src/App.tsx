import { AppShell } from './app-shell/AppShell';
import { createDefaultSession } from './simulator/reducer';

export function App() {
  const session = createDefaultSession();

  return <AppShell state={session} />;
}
