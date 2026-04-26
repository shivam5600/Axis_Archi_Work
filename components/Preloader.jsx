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
    if (sessionStorage.getItem('axis-loaded') === '1') {
      setVisible(false);
      return;
    }
    document.documentElement.style.overflow = 'hidden';

    let target = 8;
    let value = 0;
    const step = () => {
      // Smoothly chase the target, leaving a little gap so the bar never sits at 100 too long
      value += (target - value) * 0.08;
      const shown = Math.min(99, Math.round(value));
      setPct(shown);
      if (shown < 99) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    // Push the target forward as paint milestones happen
    const bumps = [
      { delay: 250,  to: 32 },
      { delay: 600,  to: 58 },
      { delay: 1100, to: 78 },
      { delay: 1900, to: 92 },
    ];
    const timers = bumps.map((b) => setTimeout(() => { target = b.to; }, b.delay));

    const finish = () => {
      target = 100;
      setTimeout(() => {
        cancelAnimationFrame(rafRef.current);
        setPct(100);
        setExiting(true);
        sessionStorage.setItem('axis-loaded', '1');
        // After fade-out, unmount and restore scroll
        setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = '';
        }, 700);
      }, 200);
    };

    const onLoad = () => finish();
    if (document.readyState === 'complete') {
      // Already loaded — give a brief beat so the splash doesn't flash
      setTimeout(finish, 600);
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    // Hard safety: never block the user for more than 4.5s.
    const hardStop = setTimeout(finish, 4500);

    return () => {
      cancelAnimationFrame(rafRef.current);
      timers.forEach(clearTimeout);
      clearTimeout(hardStop);
      window.removeEventListener('load', onLoad);
      document.documentElement.style.overflow = '';
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
