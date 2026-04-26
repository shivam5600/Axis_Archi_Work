'use client';

import { useEffect, useRef } from 'react';

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]';

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    let x = 0, y = 0, tx = 0, ty = 0;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!dot.dataset.warm) {
        x = tx;
        y = ty;
        dot.dataset.warm = '1';
      }
    };
    // Event delegation — no per-element listeners, no MutationObserver.
    const onOver = (e) => {
      if (e.target instanceof Element && e.target.closest(HOVER_SELECTOR)) {
        dot.classList.add('is-hover');
      }
    };
    const onOut = (e) => {
      if (e.target instanceof Element && e.target.closest(HOVER_SELECTOR)) {
        dot.classList.remove('is-hover');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    let raf;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
