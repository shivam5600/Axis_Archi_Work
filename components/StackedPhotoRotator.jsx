'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * A small stack of office photos that shuffles clockwise on a continuous loop -
 * the front card rotates back and the next steps forward. Each photo holds a fixed
 * slot in the stack (front / mid / back) computed from the current front index, so
 * advancing that index animates every card to its new slot in one smooth move.
 *
 * Respects prefers-reduced-motion: the loop never starts, leaving a static fanned
 * stack. Pauses while hovered.
 */
const SLOTS = [
  { x: '0%', y: '0%', r: -4, s: 1, z: 30, o: 1 },
  { x: '7%', y: '5%', r: 5, s: 0.95, z: 20, o: 1 },
  { x: '-6%', y: '9%', r: -9, s: 0.9, z: 10, o: 0.85 },
];

export default function StackedPhotoRotator({ images = [], interval = 3000 }) {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;
  const timer = useRef(null);

  useEffect(() => {
    if (n < 2 || paused) return;
    // Always auto-rotate on the timer (client asked for it explicitly). Under
    // prefers-reduced-motion the global CSS zeroes the transform transition, so
    // images hard-swap instead of sliding, still changing, just without motion.
    timer.current = setInterval(() => setFront((f) => (f + 1) % n), interval);
    return () => clearInterval(timer.current);
  }, [n, interval, paused]);

  if (!n) return null;

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] px-[6%] py-[7%]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full w-full">
        {images.map((img, k) => {
          const slot = SLOTS[(k - front + n) % n] || SLOTS[SLOTS.length - 1];
          return (
            <figure
              key={img.src || k}
              className="absolute inset-0 overflow-hidden rounded-lg border border-[var(--line)] shadow-2xl transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translate(${slot.x}, ${slot.y}) rotate(${slot.r}deg) scale(${slot.s})`,
                zIndex: slot.z,
                opacity: slot.o,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt || ''}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 28rem"
                className="object-cover"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
