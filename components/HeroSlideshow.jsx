'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const AUTO_MS = 6000;
// Every slide rests on its finished frame for this same beat before advancing,
// so no build animation cuts away abruptly.
const HOLD_MS = 3000;

/**
 * Two device-specific layouts, one shared video + rotation:
 *  • Desktop → full-bleed cinematic video.
 *  • Mobile  → video in a 16:9 band (full frame) + text below.
 * Overlay: project meta is bottom-LEFT (small); ←/→ arrows sit at the left/right
 * edges (vertically centred); dots + play/pause stay at the bottom. No tagline,
 * no slide counter. Videos play full length, then hold on the completed view for
 * HOLD_MS (identical for every slide) before the transition.
 */
export default function HeroSlideshow({ slides }) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Duration is stored WITH the slide it belongs to: `loadedmetadata` can fire
  // before React flushes the mount effects, so a plain per-index reset would
  // clobber slide 0's real duration (and leave the fallback timer guessing).
  const [videoDur, setVideoDur] = useState({ i: -1, ms: null });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const advanceTimer = useRef(null);
  const holdTimer = useRef(null);
  const videoRef = useRef(null);

  const videoDurMs = videoDur.i === index ? videoDur.ms : null;

  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    setMounted(true);
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update); };
  }, []);

  // Continuous rotation. Videos advance HOLD_MS after they END (full play); the
  // timer is a fallback, armed past duration + hold so it never cuts the hold short.
  useEffect(() => {
    const isVid = !!(slides[index] && slides[index].video);
    const delay = isVid ? (videoDurMs || 8000) + HOLD_MS + 1500 : AUTO_MS;
    advanceTimer.current = setTimeout(() => setIndex((i) => (i + 1) % slides.length), delay);
    return () => {
      clearTimeout(advanceTimer.current);
      clearTimeout(holdTimer.current);
    };
  }, [index, videoDurMs, slides]);

  useEffect(() => {
    setSeen((p) => (p.has(index) ? p : new Set(p).add(index)));
  }, [index]);

  useEffect(() => { setVideoReady(false); setPlaying(false); }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setPlaying(true);
      const p = v.play();
      if (p && p.then) p.catch(() => setPlaying(false));
    } else {
      setPlaying(false);
      v.pause();
    }
  };
  const attemptAutoplay = () => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && p.then) p.then(() => setPlaying(true)).catch(() => {});
  };

  const current = slides[index] || slides[0];
  const barMs = current.video ? (videoDurMs || 8000) + HOLD_MS : AUTO_MS;
  const edgeBtn = 'absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full grid place-items-center border border-bone/40 text-bone bg-black/15 hover:bg-bone hover:text-ink transition-colors';
  const dotBtn = 'w-9 h-9 md:w-10 md:h-10 rounded-full grid place-items-center border border-bone/45 text-bone hover:bg-bone hover:text-ink transition-colors';

  const media = slides.map((s, i) => {
    const active = i === index;
    const showVideo = s.video && active && seen.has(i);
    return (
      <div
        key={s.src}
        className={clsx('absolute inset-0 transition-opacity duration-[1200ms] ease-soft', active ? 'opacity-100' : 'opacity-0')}
        aria-hidden={!active}
      >
        <Image
          src={s.video ? s.poster : s.src}
          alt={s.title}
          fill
          priority={i === 0}
          sizes="100vw"
          className={clsx('object-cover', !s.video && active && !isMobile && 'animate-kenburns')}
        />
        {showVideo && (
          <video
            ref={videoRef}
            src={isMobile && s.srcMobile ? s.srcMobile : s.src}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-label={s.title}
            onLoadedMetadata={(e) => { const d = e.currentTarget.duration; if (d && isFinite(d)) setVideoDur({ i, ms: Math.round(d * 1000) }); }}
            onLoadedData={attemptAutoplay}
            onCanPlay={attemptAutoplay}
            onPlaying={() => { setPlaying(true); setVideoReady(true); }}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              // `ended` is the authoritative signal: it owns the transition from
              // here, so drop the fallback timer or it could cut the hold short.
              clearTimeout(advanceTimer.current);
              clearTimeout(holdTimer.current);
              holdTimer.current = setTimeout(() => goTo(index + 1), HOLD_MS);
            }}
            className={clsx('absolute inset-0 w-full h-full object-cover transition-opacity duration-700', videoReady ? 'opacity-100' : 'opacity-0')}
          />
        )}
      </div>
    );
  });

  const arrows = (
    <>
      <button onClick={prev} aria-label="Previous slide" data-cursor="hover" className={clsx(edgeBtn, 'left-3 md:left-6')}>←</button>
      <button onClick={next} aria-label="Next slide" data-cursor="hover" className={clsx(edgeBtn, 'right-3 md:right-6')}>→</button>
    </>
  );

  const meta = (
    <div key={`meta-${index}`}>
      <p className="eyebrow opacity-80 mb-1.5">{current.type} · {current.location}</p>
      <h2 className="display text-3xl md:text-4xl tracking-tight leading-tight animate-fadeup">{current.title}</h2>
    </div>
  );

  const controls = (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={clsx('h-1 rounded-full overflow-hidden transition-all duration-500 bg-bone/30', i === index ? 'w-10 md:w-12' : 'w-5 md:w-6 hover:w-7')}
            aria-label={`Go to slide ${i + 1}`}
            data-cursor="hover"
          >
            {i === index && <span key={index} style={{ animationDuration: `${barMs}ms` }} className="block h-full bg-bone hero-progress" />}
          </button>
        ))}
      </div>
      {current.video && (
        <button onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'} data-cursor="hover" className={dotBtn}>
          {playing ? (
            <svg width="12" height="13" viewBox="0 0 12 13" fill="currentColor" aria-hidden>
              <rect x="1" width="3.4" height="13" rx="0.6" />
              <rect x="7.6" width="3.4" height="13" rx="0.6" />
            </svg>
          ) : (
            <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden className="ml-0.5">
              <path d="M0 0l11 6.5L0 13z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );

  // ─────── MOBILE: 16:9 video band + text below ───────
  if (mounted && isMobile) {
    return (
      <section data-hero className="relative w-full bg-ink text-bone" role="region" aria-label="Featured projects slideshow">
        <div className="relative w-full aspect-video overflow-hidden bg-ink">
          {media}
          {arrows}
        </div>
        <div className="container-edge max-w-[100rem] mx-auto pt-5 pb-9">
          {meta}
          <div className="mt-6">{controls}</div>
        </div>
      </section>
    );
  }

  // ─────── DESKTOP (and pre-hydration default): full-bleed ───────
  return (
    <section data-hero className="relative w-full" role="region" aria-label="Featured projects slideshow">
      <div className="relative h-[100svh] w-full overflow-hidden bg-ink text-bone">
        {media}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.8)_100%)]"
        />
        {arrows}
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-edge max-w-[100rem] mx-auto pb-9 flex items-end justify-between gap-6">
            {meta}
            <div className="shrink-0 pb-1">{controls}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
