import { useReducer } from 'react';
import { AppShell } from './app-shell/AppShell';
import { createDefaultSession, reduceSession } from './simulator/reducer';

export function App() {
  const [session, dispatch] = useReducer(reduceSession, undefined, createDefaultSession);

  return <AppShell state={session} dispatch={dispatch} />;
}
