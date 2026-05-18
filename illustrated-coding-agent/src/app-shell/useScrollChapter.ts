import { useEffect, useState, useRef } from 'react';
import type { ChapterId, SceneId } from '../story/state';
import { CHAPTER_ORDER, getSceneIds } from '../story/scene-registry';

export function useScrollChapter(): { chapterId: ChapterId; sceneId: SceneId } {
  const [active, setActive] = useState<{ chapterId: ChapterId; sceneId: SceneId }>({
    chapterId: 'hook',
    sceneId: 'teaser-cross-section',
  });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const entries = new Map<string, IntersectionObserverEntry>();

    observerRef.current = new IntersectionObserver(
      (obsEntries) => {
        for (const entry of obsEntries) {
          entries.set(entry.target.id, entry);
        }

        let bestChapterId: ChapterId = 'hook';
        let bestRatio = 0;

        for (const chId of CHAPTER_ORDER) {
          const entry = entries.get(`chapter-${chId}`);
          if (entry && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestChapterId = chId;
          }
        }

        const scenes = getSceneIds(bestChapterId);
        const sceneId = scenes[0];

        setActive((prev) => {
          if (prev.chapterId === bestChapterId && prev.sceneId === sceneId) return prev;
          return { chapterId: bestChapterId, sceneId };
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    const elements = document.querySelectorAll('[data-chapter]');
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
