import { useEffect, useState, useRef } from 'react';
import type { ChapterId, SceneId } from '../story/state';

export function useScrollChapter(): { chapterId: ChapterId; sceneId: SceneId } {
  const [active, setActive] = useState<{ chapterId: ChapterId; sceneId: SceneId }>({
    chapterId: 'hook',
    sceneId: 'teaser-cross-section',
  });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const entries = new Map<Element, IntersectionObserverEntry>();

    observerRef.current = new IntersectionObserver(
      (obsEntries) => {
        for (const entry of obsEntries) {
          entries.set(entry.target, entry);
        }

        let bestChapter: ChapterId = 'hook';
        let bestScene: SceneId = 'teaser-cross-section';
        let bestRatio = 0;

        for (const [el, entry] of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const ch = el.getAttribute('data-chapter') as ChapterId | null;
            const sc = el.getAttribute('data-scene') as SceneId | null;
            if (ch) bestChapter = ch;
            if (sc) bestScene = sc;
          }
        }

        setActive((prev) => {
          if (prev.chapterId === bestChapter && prev.sceneId === bestScene) return prev;
          return { chapterId: bestChapter, sceneId: bestScene };
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    const elements = document.querySelectorAll('[data-scene]');
    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
    };
  });

  return active;
}
