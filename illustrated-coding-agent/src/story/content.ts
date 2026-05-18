import type { ContentBlock } from './scene';

export const INTRO_CONTENT: ContentBlock[] = [
  {
    id: 'hook-heading',
    chapterId: 'hook',
    sceneId: 'teaser-cross-section',
    heading: 'What happens when you ask a coding agent to build something?',
    body: 'You type a plain-English request — "build me a landing page" — and press enter. The model begins. But what actually happens between that request and the finished page? The answer is not "the model figures it out." The answer is a system — a harness — that turns model intelligence into real, verifiable work.',
    lensMode: 'product',
  },
  {
    id: 'hook-body',
    chapterId: 'hook',
    sceneId: 'teaser-cross-section',
    heading: 'The mental model shift',
    body: 'Most of us imagine a coding agent as a chatbot with better prose. A smart text-in, smart-text-out machine. That model is wrong. A coding agent is a system that reasons, acts through tools, observes results, and continues — not a single response, but a work loop that runs until the job is done.',
    lensMode: 'product',
  },
  {
    id: 'illusion-heading',
    chapterId: 'illusion-break',
    sceneId: 'model-only-misconception',
    heading: 'The model alone cannot do this job',
    body: 'A language model on its own can produce text. It can describe a landing page. It can write HTML. But it cannot open a file, read your existing codebase, run a test, or check whether its output actually works. The model is a reasoning engine. Without a harness around it, it is blind, handless, and stateless.',
    lensMode: 'product',
  },
  {
    id: 'illusion-contrast',
    chapterId: 'illusion-break',
    sceneId: 'model-only-misconception',
    heading: 'Model-only vs. harnessed agent',
    body: 'Without a harness, every request starts from scratch. The model cannot persist state, browse project structure, run commands, or validate outcomes. A harness changes this: it gives the model eyes (file reads), hands (tool execution), memory (session state), and boundaries (permissions). The difference is the difference between a brilliant advisor and a capable colleague.',
    lensMode: 'product',
  },
  {
    id: 'harness-heading',
    chapterId: 'harness-reveal',
    sceneId: 'harness-framing',
    heading: 'Agent = Model + Harness',
    body: 'The cleanest definition in the field comes from the practitioners building these systems: every coding agent is a model nested inside a harness. The model decides the next move. The harness determines what is visible, actionable, permitted, persisted, and verifiable. If you are not the model, you are the harness. This is the machine.',
    lensMode: 'product',
  },
  {
    id: 'harness-subsystems',
    chapterId: 'harness-reveal',
    sceneId: 'harness-framing',
    heading: 'Five subsystems, one operating layer',
    body: 'A well-designed harness has five practical subsystems: instructions (what the agent should know), tools (what it can do), environment (where it operates), state (what it remembers), and feedback (how it knows whether it succeeded). Together, these turn a raw model into a system that can inspect, modify, verify, and recover.',
    lensMode: 'product',
  },
];
