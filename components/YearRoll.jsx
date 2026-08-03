'use client';

import { useEffect, useState } from 'react';

/**
 * Rolls a year (e.g. 2005) into place on load, like an analog counter settling.
 * Same rAF + cubic ease-out feel as the stats <Counter>, but fires on mount (with a
 * small delay) rather than on scroll. Inherits the surrounding type; the value is
 * zero-padded to a fixed width so the headline never reflows mid-roll. Respects
 * prefers-reduced-motion, jumps straight to the final year.
 *
 * No "already started" ref guard: under React StrictMode the effect mounts twice, and
 * a persistent guard combined with the cleanup (which cancels the timer) would leave
 * the value stuck at 0. Re-running on each mount is correct and idempotent.
 */
export default function YearRoll({ target = 2005, duration = 1700, delay = 350 }) {
  const digits = String(target).length;
  const pad = (v) => String(v).padStart(digits, '0');
  const [n, setN] = useState(target);

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(target);
      return;
    }

    let raf;
    setN(0);
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(eased * target));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(run, delay);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return <span className="tabular-nums">{pad(n)}</span>;
}
