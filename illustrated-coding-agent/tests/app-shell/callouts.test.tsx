import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnalogyCallout } from '../../src/app-shell/AnalogyCallout';
import { MisconceptionCallout } from '../../src/app-shell/MisconceptionCallout';
import { KeyInsightCallout } from '../../src/app-shell/KeyInsightCallout';
import { validateContentSchema } from '../../src/simulator/validation';
import { SCENE_DEFINITIONS } from '../../src/story/scene-registry';

describe('AnalogyCallout', () => {
  it('renders the analogy text', () => {
    render(<AnalogyCallout analogy="Like a CI/CD pipeline wrapping a build step." />);
    expect(screen.getByText("The developer's version")).toBeInTheDocument();
    expect(screen.getByText('Like a CI/CD pipeline wrapping a build step.')).toBeInTheDocument();
  });

  it('has an accessible label', () => {
    render(<AnalogyCallout analogy="test" />);
    expect(screen.getByLabelText('Developer analogy')).toBeInTheDocument();
  });
});

describe('MisconceptionCallout', () => {
  it('renders wrong, actual, and why-it-matters fields', () => {
    render(
      <MisconceptionCallout
        wrong="The model is the smart part; the harness is just plumbing."
        actual="The harness makes most consequential decisions."
        whyItMatters="Understanding the harness is understanding the system."
      />,
    );

    expect(screen.getByText('Wrong idea')).toBeInTheDocument();
    expect(screen.getByText('The model is the smart part; the harness is just plumbing.')).toBeInTheDocument();
    expect(screen.getByText('Actually')).toBeInTheDocument();
    expect(screen.getByText('The harness makes most consequential decisions.')).toBeInTheDocument();
    expect(screen.getByText('Why it matters')).toBeInTheDocument();
    expect(screen.getByText('Understanding the harness is understanding the system.')).toBeInTheDocument();
  });

  it('has an accessible label', () => {
    render(
      <MisconceptionCallout
        wrong="a"
        actual="b"
        whyItMatters="c"
      />,
    );
    expect(screen.getByLabelText('Common misconception')).toBeInTheDocument();
  });
});

describe('KeyInsightCallout', () => {
  it('renders the key insight as a blockquote', () => {
    render(<KeyInsightCallout insight="The model is one component. The harness is the system." />);
    expect(screen.getByText('Key insight')).toBeInTheDocument();
    expect(screen.getByText('The model is one component. The harness is the system.')).toBeInTheDocument();
    expect(screen.getByText('The model is one component. The harness is the system.').tagName).toBe('BLOCKQUOTE');
  });

  it('has an accessible label', () => {
    render(<KeyInsightCallout insight="test" />);
    expect(screen.getByLabelText('Key insight')).toBeInTheDocument();
  });
});

describe('validateContentSchema', () => {
  it('returns warnings for scenes that require key insight but lack one', () => {
    const sceneWithRequirement = SCENE_DEFINITIONS.find((d) => d.requiresKeyInsight);
    expect(sceneWithRequirement).toBeDefined();

    const warnings = validateContentSchema();
    warnings.forEach((w) => {
      expect(w).toMatch(/requires a key insight/);
    });
  });

  it('allows appendix to skip key insight since requiresKeyInsight is false', () => {
    const appendixDef = SCENE_DEFINITIONS.find((d) => d.sceneId === 'appendix-method');
    if (appendixDef) {
      expect(appendixDef.requiresKeyInsight).toBe(false);
    }
  });

  it('does not warn for scenes with requiresKeyInsight: false', () => {
    const warnings = validateContentSchema();
    const falseWarnings = warnings.filter((w) => {
      for (const def of SCENE_DEFINITIONS) {
        if (!def.requiresKeyInsight && w.includes(def.sceneId)) return true;
      }
      return false;
    });
    expect(falseWarnings).toHaveLength(0);
  });
});
