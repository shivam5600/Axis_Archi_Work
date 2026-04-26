'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

/**
 * Real sketch effect — looks like a hand-drawn line study on paper.
 * Hover (or focus) reveals the original color photograph.
 *
 *   Default state          Hover state
 *   ─────────────          ───────────
 *   paper background       full color photo
 *   + dark edge lines      (sketch fades out)
 *
 * Implementation:
 *   - Layer A: paper background (theme-aware cream / dark grey)
 *   - Layer B: SVG with `feConvolveMatrix` edge filter, multiplied/screened over paper
 *   - Layer C: full-color <Image>, opacity 0 by default
 *   On hover the photo crossfades in and the sketch layers fade out.
 *
 * mode="hover"  : default behaviour described above
 * mode="static" : no sketch effect — just shows the photo
 */
export default function SketchImage({
  src,
  alt = '',
  mode = 'hover',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  aspect = 'aspect-[4/5]',
}) {
  const id = useId().replace(/:/g, '');
  const wrapRef = useRef(null);
  const [armed, setArmed] = useState(mode !== 'hover');

  // Lazy-mount the SVG sketch once the image is in view (so first paint stays cheap)
  useEffect(() => {
    if (mode !== 'hover' || !wrapRef.current) return;
    const el = wrapRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setArmed(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  return (
    <div
      ref={wrapRef}
      className={clsx(
        'sketch-wrap',
        mode === 'hover' && 'sketch-mode-hover',
        aspect,
        className
      )}
      data-cursor="hover"
    >
      {mode === 'hover' && (
        <>
          {/* Layer A: paper background */}
          <span className="sketch-paper" aria-hidden />

          {/* Layer B: edge lines via SVG */}
          {armed && (
            <svg
              className="sketch-overlay"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 100 100"
            >
              <defs>
                <filter id={`edge-${id}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                  {/* desaturate */}
                  <feColorMatrix
                    type="matrix"
                    values="0.33 0.33 0.33 0 0
                            0.33 0.33 0.33 0 0
                            0.33 0.33 0.33 0 0
                            0    0    0    1 0"
                  />
                  {/* edge detect (Laplacian-ish) */}
                  <feConvolveMatrix
                    order="3"
                    preserveAlpha="true"
                    kernelMatrix="-1 -1 -1 -1  8 -1 -1 -1 -1"
                    result="edges"
                  />
                  {/* invert so edges become dark on transparent */}
                  <feComponentTransfer in="edges" result="ink">
                    <feFuncR type="table" tableValues="1 0" />
                    <feFuncG type="table" tableValues="1 0" />
                    <feFuncB type="table" tableValues="1 0" />
                  </feComponentTransfer>
                  {/* boost contrast — line work that reads as pencil */}
                  <feComponentTransfer in="ink" result="boosted">
                    <feFuncR type="linear" slope="2.4" intercept="-0.5" />
                    <feFuncG type="linear" slope="2.4" intercept="-0.5" />
                    <feFuncB type="linear" slope="2.4" intercept="-0.5" />
                  </feComponentTransfer>
                </filter>
              </defs>
              <image
                href={src}
                x="0" y="0" width="100" height="100"
                preserveAspectRatio="xMidYMid slice"
                filter={`url(#edge-${id})`}
              />
            </svg>
          )}
        </>
      )}

      {/* Layer C: real photo */}
      <div className="real-img">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
