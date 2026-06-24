# The Illustrated Coding Agent

An interactive scrollytelling web experience that explains how coding agents actually work by turning invisible system state into a visual **Flight Recorder**.

**[Live preview](#)** · 42 commits · 165 tests

---

## What is this?

Most writing on coding agents is dense, tool-centric, and insider-coded. This project takes a different approach: an **editorial scrollytelling shell** wrapped around an **honest agent simulator**, powered by a **reusable notation system**.

The reader watches a coding agent step through a task — building a landing page — while synchronized panels reveal what the agent sees, does, is allowed to do, remembers, and forgets.

---

## Product Shape

| Component | Description |
|-----------|-------------|
| **Narrative Shell** | Six-stage scrollytelling experience with `Fraunces` display, `Source Serif 4` body, and `IBM Plex Mono` system typography |
| **Agent Simulator** | Deterministic state machine driving timeline, context pressure, tool paths, permission gates, compaction, and memory artifacts |
| **Notation System** | Reusable SVG primitives (harness frame, context meter, tool cards, memory artifacts) with semantic color roles |
| **Flight Recorder** | Persistent panel showing the agent loop step-by-step; updates props per scene, never remounts |
| **Failure Mode Theater** | Toggle permission-blocked and tool-failure modes to see the simulator degrade causally |
| **Dual-Lens Mode** | Switch between *Product* and *Harness* vocabulary while preserving the underlying causal model |
| **State Drawer** | Reader-facing inspector showing chapter, scene, lens mode, tool state, context fill, and failure toggles |

---

## Six-Part Information Architecture

```
1. HOOK           "You ask an agent to build a landing page"
2. ILLUSION BREAK "The model alone cannot do this"
3. HARNESS REVEAL "Agent = Model + Harness"
4. FLIGHT RECORDER — first-loop → tool-invocation → permission-gate
                    → context-pressure → compaction → memory-retrieval
                    → failure-permission-blocked → failure-tool-failure
5. FIELD GUIDE    "How to read any agent"
6. APPENDIX       "Behind the explainer"
```

---

## Tech Stack

| Concern | Technology |
|---------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Testing | Vitest (unit/integration), React Testing Library, Playwright (E2E) |
| Visuals | SVG + CSS custom properties (no external UI libraries) |
| Typography | Google Fonts: Fraunces, Source Serif 4, Instrument Sans, IBM Plex Mono |
| Deployment | Static site (no backend required) |

---

## Getting Started

```bash
cd illustrated-coding-agent
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build → dist/
npm test           # Run 152 unit/integration tests
npm run test:e2e   # Run 13 Playwright E2E tests across Chromium, mobile, and reduced-motion
npm run lint       # TypeScript type checking
```

---

## Architecture

```
src/
├── app-shell/       Scroll choreography, chapter sections, sticky panel, toggles
├── story/           Content modules, scene definitions, chapter/scene registry
├── simulator/       State reducer, selectors, validation/normalization
├── notation/        SVG primitives (HarnessFrame, AgentTimeline, ContextMeter,
│                    MemoryArtifact, ToolPath, AnnotationLabel)
├── main.tsx         Entry point
├── tokens.css       Design tokens from DESIGN.md
└── global.css       Editorial layout and responsive choreography

tests/               Unit and integration tests (Vitest)
e2e/                 End-to-end tests (Playwright)
source-corpus/       14-chapter canonical knowledge base
```

### Key Design Decisions

- **Three-layer separation**: narrative shell, simulator, and notation system are independent
- **Persistent primitives**: visual components update props/state instead of remounting per scene
- **Declarative scenes**: content modules define intent; simulator derives behavior
- **Validation pipeline**: all state passes through `validateAndNormalize` before rendering
- **Static-first**: reduced-motion renders discrete still states; animation is enhancement only

---

## Preview & Release

### Local Preview

```bash
npm run build
npm run preview     # Serve production build locally
```

Open the URL shown in the terminal (default `http://localhost:4173`).

### Vercel Deployment

This project is a static Vite app, so Vercel can deploy it without any custom server code.

1. Import the repository into Vercel.
2. Keep the repository root as the project root.
3. Use the Vite preset, or set the following values manually:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: default package-manager install
4. Leave environment variables empty unless a future feature adds them.
5. Deploy a preview branch first, then promote the same commit to production after smoke testing.
6. If a rollback is needed, redeploy the previous successful Vercel deployment.

### Pre-Release Checklist

| Check | Command | Expected |
|-------|---------|----------|
| Type check | `npm run lint` | No errors |
| Production build | `npm run build` | Clean build → `dist/` |
| Unit tests | `npm test` | 152 tests pass |
| E2E (Chromium) | `npx playwright test --project=chromium` | 9 tests pass |
| E2E (Mobile) | `npx playwright test --project=mobile` | 2 tests pass |
| E2E (Reduced motion) | `npx playwright test --project=reduced-motion` | 2 tests pass |

### Browser Compatibility

| Browser | Viewport | Status |
|---------|----------|--------|
| Chrome/Chromium | Desktop (1280px+) | Verified via CI |
| Chrome/Chromium | Mobile (Pixel 5, 412px) | Verified via E2E |
| Safari | Desktop (1440px) | Not yet tested in CI (manual pass recommended) |
| Safari | Mobile (375px) | Manual pass recommended before release |

### Manual Preview Matrix

Before public release, manually verify on:

- [ ] Desktop Chromium — full scrollthrough, all 6 stages, controls responsive
- [ ] Desktop Safari — same as above
- [ ] Mobile Safari-sized viewport — progressive disclosure, drawer bottom sheet
- [ ] Mobile Chrome-sized viewport — same as above
- [ ] Reduced motion setting enabled — static states legible, no layout breakage

---

## Design

See [`DESIGN.md`](./DESIGN.md) for the full design system.

- **Thesis**: Editorial Cutaway Manual — a beautifully typeset technical cutaway where the hidden machine has been opened up
- **Palette**: Restrained paper/ink/metal tones with semantic system colors (harness green, model purple, tool blue, warning red)
- **Motion**: Intentional, causal, never ornamental. Six allowed motion verbs: fill, compress, promote, interrupt, fork, fade-to-stale
- **Accessibility**: All visuals have text equivalents; reduced-motion respects `prefers-reduced-motion`; mobile progressive disclosure

---

## Source Corpus

The project is grounded in a [14-chapter canonical corpus](./source-corpus/) built from:

- First-party product docs (Claude Code, OpenAI Codex SDK)
- The *Dive into Claude Code* paper (arXiv: 2604.14228)
- Practitioner essays and curriculum (LangChain, Philschmid, Harness Engineering lectures)
- Cross-referenced vocabulary ledger, source register, and chapter crosswalk

Chapters span from *From Chatbot to Coding Agent* through *The Future of Harness Engineering*.

---

## Project Docs

| Document | Purpose |
|----------|---------|
| [`DESIGN.md`](./DESIGN.md) | Design system: typography, palette, spacing, motion, notation rules |
| [`the-illustrated-coding-agent-ceo-plan.md`](./the-illustrated-coding-agent-ceo-plan.md) | Product scope, build order, failure modes registry |
| [`the-illustrated-coding-agent-visual-spec.md`](./the-illustrated-coding-agent-visual-spec.md) | Notation grammar, actor types, container logic, arrow rules |
| [`implementation-plan.md`](./implementation-plan.md) | Tech architecture, module contracts, test plan |
| [`implementation-issues.md`](./implementation-issues.md) | 10 thin-slice implementation issues with acceptance criteria |

---

## License

Private project. All rights reserved.
