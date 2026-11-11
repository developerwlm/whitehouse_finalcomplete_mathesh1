import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTOR = '.reveal';

/**
 * Reveal elements once when they enter the viewport. IntersectionObserver
 * handles visibility without measuring every element on every scroll frame,
 * avoiding repeated layout reads and forced reflows.
 */
export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    let mutationObserver;
    let scanFrame = 0;

    const elements = () => document.querySelectorAll(REVEAL_SELECTOR);
    const showAll = () => elements().forEach((element) => element.classList.add('is-visible'));

    const scan = () => {
      scanFrame = 0;
      elements().forEach((element) => {
        if (element.classList.contains('is-visible')) return;
        if (!observer) {
          element.classList.add('is-visible');
          return;
        }
        observer.observe(element);
      });
    };

    const scheduleScan = () => {
      if (scanFrame) cancelAnimationFrame(scanFrame);
      scanFrame = requestAnimationFrame(scan);
    };

    const start = () => {
      observer?.disconnect();
      observer = null;
      if (motionQuery.matches || !('IntersectionObserver' in window)) {
        root.classList.remove('js-reveal');
        showAll();
        return;
      }

      root.classList.add('js-reveal');
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '12% 0px 12% 0px', threshold: 0 });
      scan();
    };

    start();
    mutationObserver = new MutationObserver(scheduleScan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const onMotionChange = () => start();
    if (typeof motionQuery.addEventListener === 'function') motionQuery.addEventListener('change', onMotionChange);
    else motionQuery.addListener?.(onMotionChange);

    return () => {
      if (scanFrame) cancelAnimationFrame(scanFrame);
      observer?.disconnect();
      mutationObserver?.disconnect();
      if (typeof motionQuery.removeEventListener === 'function') motionQuery.removeEventListener('change', onMotionChange);
      else motionQuery.removeListener?.(onMotionChange);
    };
  }, [location.pathname, location.search]);
}
