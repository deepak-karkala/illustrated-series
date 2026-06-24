import { useEffect, useState } from 'react';
import type { ChapterId, SceneId } from '../story/state';

export function useScrollChapter(): { chapterId: ChapterId; sceneId: SceneId } {
  const [active, setActive] = useState<{ chapterId: ChapterId; sceneId: SceneId }>({
    chapterId: 'hook',
    sceneId: 'teaser-cross-section',
  });

  useEffect(() => {
    let frame = 0;

    const updateActive = () => {
      const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
      if (scenes.length === 0) return;

      const visibleScenes = scenes.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight;
      });

      const viewportCenter = window.innerHeight / 2;
      const sceneUnderMarker = visibleScenes
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          return { el, score: Math.abs(center - viewportCenter) };
        })
        .sort((a, b) => a.score - b.score)[0]?.el
        ?? scenes[0];

      const chapterId = sceneUnderMarker.getAttribute('data-chapter') as ChapterId | null;
      const sceneId = sceneUnderMarker.getAttribute('data-scene') as SceneId | null;
      if (!chapterId || !sceneId) return;

      setActive((prev) => {
        if (prev.chapterId === chapterId && prev.sceneId === sceneId) return prev;
        return { chapterId, sceneId };
      });
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return active;
}
