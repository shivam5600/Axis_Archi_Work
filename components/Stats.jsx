'use client';

import { useEffect, useRef, useState } from 'react';

function Counter({ raw, value }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(eased * raw));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [raw]);

  // Preserve format suffix from "value" string ("17+", "100%", "500+", "06")
  const m = String(value).match(/^[\d]+(.*)$/);
  const suffix = m ? m[1] : '';
  const padded = String(value).startsWith('0') && String(n).length < 2 ? `0${n}` : `${n}`;

  return (
    <span ref={ref} className="display text-6xl md:text-8xl tabular-nums tracking-tight">
      {padded}
      <span className="text-[var(--accent)]">{suffix}</span>
    </span>
  );
}

export default function Stats({ items, theme = 'dark' }) {
  const dark = theme === 'dark';
  return (
    <section
      className={`relative ${dark ? 'bg-ink text-bone' : 'bg-[var(--bg)]'}`}
      style={dark ? { background: '#111111', color: '#F5F5F5' } : undefined}
    >
      <div className="container-edge max-w-[100rem] mx-auto py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-x-8">
          {items.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 md:px-6 ${
                i !== 0 ? 'md:border-l border-white/15' : ''
              } ${i % 2 !== 0 ? 'border-l border-white/15 md:border-l' : ''}`}
              style={dark ? undefined : { borderColor: 'var(--line)' }}
            >
              <Counter raw={s.raw} value={s.value} />
              <p className="eyebrow opacity-60 mt-4">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
