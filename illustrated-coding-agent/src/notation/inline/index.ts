import type { InlineDiagramId } from '../../story/scene';
import {
  ChefAndKitchenDiagram,
  HarnessSubsystemsDiagram,
  LoopCycleDiagram,
  ToolDispatchSequenceDiagram,
  PermissionFunnelDiagram,
  ContextFillDiagram,
  CompactionBeforeAfterDiagram,
  SessionHandoffDiagram,
  BlockedActionPathDiagram,
  ErrorRecoveryLoopDiagram,
} from './diagrams';

export { ChefAndKitchenDiagram } from './diagrams';
export { HarnessSubsystemsDiagram } from './diagrams';
export { LoopCycleDiagram } from './diagrams';
export { ToolDispatchSequenceDiagram } from './diagrams';
export { PermissionFunnelDiagram } from './diagrams';
export { ContextFillDiagram } from './diagrams';
export { CompactionBeforeAfterDiagram } from './diagrams';
export { SessionHandoffDiagram } from './diagrams';
export { BlockedActionPathDiagram } from './diagrams';
export { ErrorRecoveryLoopDiagram } from './diagrams';

export const INLINE_DIAGRAM_MAP: Record<InlineDiagramId, React.FC> = {
  'bare-vs-harnessed': () => null,
  'chef-and-kitchen': ChefAndKitchenDiagram,
  'harness-subsystems': HarnessSubsystemsDiagram,
  'loop-cycle': LoopCycleDiagram,
  'tool-dispatch-sequence': ToolDispatchSequenceDiagram,
  'permission-funnel': PermissionFunnelDiagram,
  'context-fill': ContextFillDiagram,
  'compaction-before-after': CompactionBeforeAfterDiagram,
  'session-handoff': SessionHandoffDiagram,
  'blocked-action-path': BlockedActionPathDiagram,
  'error-recovery-loop': ErrorRecoveryLoopDiagram,
};
