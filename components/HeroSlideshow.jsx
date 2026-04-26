'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const AUTO_MS = 6000;

export default function HeroSlideshow({ slides, eyebrow }) {
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

  useEffect(() => {
    if (paused) return;
    advanceTimer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => clearTimeout(advanceTimer.current);
  }, [index, paused, slides.length]);

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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // ─── reusable bits ───
  const Slides = ({ heightClass = 'h-full' }) => (
    <>
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
    </>
  );

  const SlideMeta = ({ inverse = false }) => (
    <div className={clsx('flex items-end justify-between gap-4', inverse ? 'text-bone' : '')}>
      <div key={`label-${index}`}>
        <p className="eyebrow opacity-70 mb-1.5">
          {slides[index].type} · {slides[index].location}
        </p>
        <p className="display text-2xl md:text-4xl tracking-tight leading-tight animate-fadeup">
          {slides[index].title}
        </p>
      </div>
      <p className="eyebrow opacity-70 hidden xs:block tabular-nums whitespace-nowrap">
        <span className="text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
        <span className="opacity-60"> / {String(slides.length).padStart(2, '0')}</span>
      </p>
    </div>
  );

  const Controls = ({ inverse = false }) => (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={clsx(
              'h-1 rounded-full overflow-hidden transition-all duration-500',
              i === index ? 'w-10 md:w-12' : 'w-5 md:w-6 hover:w-7',
              inverse ? 'bg-bone/30' : 'bg-[var(--fg)]/20'
            )}
            aria-label={`Go to slide ${i + 1}`}
            data-cursor="hover"
          >
            {i === index && (
              <span
                className={clsx('block h-full origin-left', inverse ? 'bg-bone' : 'bg-[var(--fg)]')}
                style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={prev}
          className={clsx(
            'w-9 h-9 md:w-10 md:h-10 rounded-full grid place-items-center transition-colors',
            inverse
              ? 'border border-bone/45 hover:bg-bone hover:text-ink'
              : 'border border-[var(--line)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
          )}
          aria-label="Previous slide"
          data-cursor="hover"
        >
          ←
        </button>
        <button
          onClick={next}
          className={clsx(
            'w-9 h-9 md:w-10 md:h-10 rounded-full grid place-items-center transition-colors',
            inverse
              ? 'border border-bone/45 hover:bg-bone hover:text-ink'
              : 'border border-[var(--line)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
          )}
          aria-label="Next slide"
          data-cursor="hover"
        >
          →
        </button>
      </div>
    </div>
  );

  return (
    <section
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Featured projects slideshow"
    >
      {/* ─────── MOBILE LAYOUT (stacked) ─────── */}
      <div className="md:hidden flex flex-col">
        {/* Image area: landscape aspect so the full architectural shot is visible */}
        <div className="relative w-full aspect-[16/10] bg-ink overflow-hidden">
          <Slides />
          {/* small top eyebrow over image */}
          <div className="absolute top-0 left-0 right-0 container-edge pt-24 text-bone">
            <p className="eyebrow opacity-80">◦ {eyebrow}</p>
          </div>
        </div>

        {/* Text section below */}
        <div className="container-edge max-w-[100rem] mx-auto pt-6 pb-8">
          <SlideMeta />
          <div className="mt-6 mb-6 hairline-b" />
          <Controls />
        </div>
      </div>

      {/* ─────── DESKTOP LAYOUT (full-bleed overlay) ─────── */}
      <div className="hidden md:block relative h-[100svh] w-full overflow-hidden bg-ink">
        <Slides />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_25%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.7)_100%)]"
        />

        <div className="absolute inset-0 flex flex-col text-bone">
          <div className="container-edge max-w-[100rem] mx-auto pt-36 flex items-end justify-between gap-6">
            <p className="eyebrow opacity-80">◦ {eyebrow}</p>
            <p className="eyebrow opacity-80 tabular-nums">
              <span className="text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
              <span className="opacity-60"> / {String(slides.length).padStart(2, '0')}</span>
            </p>
          </div>

          <div className="flex-1" />

          <div className="container-edge max-w-[100rem] mx-auto pb-14">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-7" key={`d-label-${index}`}>
                <p className="eyebrow opacity-70 mb-3">
                  {slides[index].type} · {slides[index].location}
                </p>
                <h2 className="display text-5xl tracking-tight leading-tight animate-fadeup">
                  {slides[index].title}
                </h2>
              </div>
              <div className="col-span-5 flex items-end justify-end gap-6">
                <Controls inverse />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
