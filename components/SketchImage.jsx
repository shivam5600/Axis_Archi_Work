'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

/**
 * Photo by default. On hover, a sketch (in-browser SVG edge filter) crossfades over.
 * The sketch SVG is only mounted on first hover — keeps initial paint cheap.
 *
 * mode="hover"  : photo, sketch on hover (default)
 * mode="static" : photo only, no sketch
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
  const [armed, setArmed] = useState(false);

  // Lazily mount the sketch SVG only when the wrapper has been hovered or focused.
  useEffect(() => {
    if (mode !== 'hover') return;
    const el = wrapRef.current;
    if (!el) return;
    const arm = () => {
      setArmed(true);
      el.removeEventListener('pointerenter', arm);
      el.removeEventListener('focusin', arm);
    };
    el.addEventListener('pointerenter', arm, { once: true });
    el.addEventListener('focusin', arm, { once: true });
    return () => {
      el.removeEventListener('pointerenter', arm);
      el.removeEventListener('focusin', arm);
    };
  }, [mode]);

  return (
    <div
      ref={wrapRef}
      className={clsx('sketch-wrap', aspect, className)}
      data-cursor="hover"
    >
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

      {mode === 'hover' && armed && (
        <svg
          className="sketch-img"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 100 100"
        >
          <defs>
            <filter id={`sketch-${id}`} x="0" y="0" width="100%" height="100%">
              <feColorMatrix
                type="matrix"
                values="0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                        0 0 0 1 0"
              />
              <feConvolveMatrix
                order="3"
                preserveAlpha="true"
                kernelMatrix="1 1 1 1 -8 1 1 1 1"
                result="edges"
              />
              <feComponentTransfer in="edges">
                <feFuncR type="linear" slope="-2" intercept="1.05" />
                <feFuncG type="linear" slope="-2" intercept="1.05" />
                <feFuncB type="linear" slope="-2" intercept="1.05" />
              </feComponentTransfer>
            </filter>
          </defs>
          <image
            href={src}
            x="0" y="0" width="100" height="100"
            preserveAspectRatio="xMidYMid slice"
            filter={`url(#sketch-${id})`}
          />
        </svg>
      )}
    </div>
  );
}
