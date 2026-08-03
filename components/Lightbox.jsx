'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function Lightbox({ images, alt }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {images.map((src, i) => {
          const span = i % 5 === 0 ? 'md:col-span-12' : i % 3 === 0 ? 'md:col-span-7' : 'md:col-span-5';
          const aspect = i % 5 === 0 ? 'aspect-[16/9]' : i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[5/6]';
          return (
            <button
              key={src + i}
              onClick={() => setIndex(i)}
              className={clsx('img-hover relative block w-full', span, aspect)}
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt}, ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[90] bg-[var(--fg)]/95 flex items-center justify-center p-6"
          onClick={close}
        >
          <button
            className="absolute top-6 right-6 eyebrow text-[var(--bg)]"
            onClick={close}
            aria-label="Close"
          >
            Close ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 eyebrow text-[var(--bg)]"
            aria-label="Previous"
          >
            ← Prev
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 eyebrow text-[var(--bg)]"
            aria-label="Next"
          >
            Next →
          </button>
          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${alt}, ${index + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
            <p className="absolute bottom-0 left-0 eyebrow text-[var(--bg)]/70">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
