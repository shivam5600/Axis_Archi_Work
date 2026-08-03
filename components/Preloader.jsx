'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

/**
 * Full-screen splash that hides the page until first paint + window.load.
 * - Shows a logo + brand title + animated progress (0 → 100)
 * - Hides body scroll while visible
 * - Fades out after window 'load' (or after a 4.5s timeout safety net),
 *   then unmounts at the end of the transition
 * - Only runs ONCE per session (sessionStorage flag) so SPA route changes
 *   don't re-trigger it
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(rafRef.current);
      setPct(100);
      setExiting(true);
      try { sessionStorage.setItem('axis-loaded', '1'); } catch {}
      setTimeout(() => setVisible(false), 700);
    };

    // Arm the hard safety stop FIRST, before any code that could throw, so the
    // splash can NEVER get stuck (e.g. sessionStorage blocked in in-app browsers).
    const hardStop = setTimeout(finish, 2200);

    // Skip the splash entirely on repeat views in the same session.
    let seen = false;
    try { seen = sessionStorage.getItem('axis-loaded') === '1'; } catch {}
    if (seen) {
      clearTimeout(hardStop);
      setVisible(false);
      return () => {};
    }

    // Cosmetic progress bar
    let target = 8;
    let value = 0;
    const step = () => {
      value += (target - value) * 0.08;
      const shown = Math.min(99, Math.round(value));
      setPct(shown);
      if (shown < 99) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    const bumps = [
      { delay: 200,  to: 42 },
      { delay: 650,  to: 74 },
      { delay: 1300, to: 93 },
    ];
    const timers = bumps.map((b) => setTimeout(() => { target = b.to; }, b.delay));

    // Dismiss as soon as the page is loaded (hard stop above guarantees it regardless).
    const onLoad = () => finish();
    if (document.readyState === 'complete') {
      setTimeout(finish, 400);
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      timers.forEach(clearTimeout);
      clearTimeout(hardStop);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`preloader ${exiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading site"
    >
      <div className="preloader-inner">
        <div className="preloader-logo">
          <Image
            src="/images/brand/logo.png"
            alt=""
            fill
            priority
            sizes="160px"
            className="object-contain object-bottom logo-mark"
          />
        </div>
        <div className="preloader-meta">
          <span className="eyebrow text-smoke">Axis Architects · Lucknow</span>
          <span className="eyebrow text-[var(--accent)] tabular-nums">
            {String(pct).padStart(3, '0')} <span className="opacity-60">/ 100</span>
          </span>
        </div>
        <div className="preloader-bar" aria-hidden>
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <p className="preloader-tag display text-2xl md:text-3xl mt-8 tracking-tight">
          Spaces that tell <em className="italic font-light">stories</em><span className="text-[var(--accent)]">.</span>
        </p>
      </div>
    </div>
  );
}
