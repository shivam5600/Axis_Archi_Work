'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

const AUTO_MS = 6000;

export default function HeroSlideshow({ slides, tagline, eyebrow }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const advanceTimer = useRef(null);
  const startRef = useRef(performance.now());
  const rafRef = useRef(null);

  const goTo = useCallback((i) => {
    const next = ((i % slides.length) + slides.length) % slides.length;
    setIndex(next);
  }, [slides.length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance: separate setTimeout — never depends on RAF firing
  useEffect(() => {
    if (paused) return;
    advanceTimer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => clearTimeout(advanceTimer.current);
  }, [index, paused, slides.length]);

  // Progress bar — separate RAF, doesn't gate the advance
  useEffect(() => {
    if (paused) return;
    startRef.current = performance.now();
    setProgress(0);

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / AUTO_MS);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, paused]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Featured projects slideshow"
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.src}
            className={clsx(
              'absolute inset-0 transition-opacity duration-[1200ms] ease-soft',
              active ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={!active}
          >
            <Image
              src={s.src}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className={clsx('object-cover', active && 'animate-kenburns')}
            />
          </div>
        );
      })}

      {/* legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_25%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.7)_100%)]"
      />

      <div className="absolute inset-0 flex flex-col text-bone">
        <div className="container-edge max-w-[100rem] mx-auto pt-28 md:pt-36 flex items-end justify-between gap-6">
          <p className="eyebrow opacity-80">◦ {eyebrow}</p>
          <p className="eyebrow opacity-80 hidden sm:block tabular-nums">
            <span className="text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
            <span className="opacity-60"> / {String(slides.length).padStart(2, '0')}</span>
          </p>
        </div>

        <div className="flex-1" />

        <div className="container-edge max-w-[100rem] mx-auto pb-8 md:pb-14">
          <div className="grid grid-cols-12 gap-4 md:gap-6 items-end mb-6 md:mb-12">
            <div className="col-span-12 md:col-span-7" key={`label-${index}`}>
              <p className="eyebrow opacity-70 mb-2 md:mb-3">
                {slides[index].type} · {slides[index].location}
              </p>
              <h2 className="display text-2xl md:text-5xl tracking-tight leading-tight animate-fadeup">
                {slides[index].title}
              </h2>
            </div>

            <div className="col-span-12 md:col-span-5 flex items-end justify-between md:justify-end gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={clsx(
                      'h-1 rounded-full overflow-hidden transition-all duration-500',
                      i === index ? 'w-12 bg-bone/30' : 'w-6 bg-bone/30 hover:bg-bone/50'
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                    data-cursor="hover"
                  >
                    {i === index && (
                      <span
                        className="block h-full bg-bone origin-left"
                        style={{
                          transform: `scaleX(${progress})`,
                          transformOrigin: 'left',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full grid place-items-center hover:bg-bone hover:text-ink transition-colors"
                  style={{ border: '1px solid rgba(245,245,245,0.45)' }}
                  aria-label="Previous slide"
                  data-cursor="hover"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full grid place-items-center hover:bg-bone hover:text-ink transition-colors"
                  style={{ border: '1px solid rgba(245,245,245,0.45)' }}
                  aria-label="Next slide"
                  data-cursor="hover"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {tagline && (
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-end pt-6 md:pt-8 border-t border-bone/15">
              <div className="col-span-12 md:col-span-9">
                <h1 className="display text-[12vw] sm:text-[10vw] md:text-[7.6vw] lg:text-[7rem] xl:text-[8.4rem] leading-[0.92] tracking-tight">
                  {tagline}
                </h1>
              </div>
              <div className="col-span-12 md:col-span-3 flex md:justify-end">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-between gap-3 px-5 py-3.5 bg-[var(--accent)] text-white eyebrow hover:bg-[var(--accent-strong)] transition-colors min-w-[12rem]"
                  data-cursor="hover"
                >
                  Explore Our Work
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                    <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
