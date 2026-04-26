'use client';

import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import SketchImage from './SketchImage';
import Reveal from './Reveal';

const layouts = [
  // varied column-spans + heights for an editorial mosaic
  // mobile: all images ~16/11 landscape so they're never bigger than 60% of viewport
  { col: 'md:col-span-7', aspect: 'aspect-[16/11] md:aspect-[5/6]', mt: '' },
  { col: 'md:col-span-5', aspect: 'aspect-[16/11] md:aspect-[3/4]', mt: 'md:mt-32' },
  { col: 'md:col-span-5', aspect: 'aspect-[16/11] md:aspect-[4/5]', mt: '' },
  { col: 'md:col-span-7', aspect: 'aspect-[16/10] md:aspect-[16/11]', mt: 'md:-mt-16' },
  { col: 'md:col-span-6', aspect: 'aspect-[16/11] md:aspect-[4/5]', mt: 'md:mt-12' },
  { col: 'md:col-span-6', aspect: 'aspect-[16/11] md:aspect-[5/6]', mt: '' },
];

export default function ProjectGrid({ projects, allowFilter = false }) {
  const [filter, setFilter] = useState('all');
  const filtered = allowFilter && filter !== 'all'
    ? projects.filter((p) => p.category === filter)
    : projects;

  return (
    <section className="container-edge max-w-[100rem] mx-auto py-12 md:py-20">
      {allowFilter && (
        <div className="flex items-center justify-between mb-16">
          <p className="eyebrow text-smoke">{filtered.length.toString().padStart(2, '0')} works</p>
          <div className="flex gap-7">
            {['all', 'exterior', 'interior'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'eyebrow ink-link transition-colors',
                  filter === f ? 'text-[var(--fg)]' : 'text-smoke'
                )}
              >
                {f === 'all' ? 'All works' : f}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-24">
        {filtered.map((p, i) => {
          const l = layouts[i % layouts.length];
          return (
            <Reveal key={p.slug} className={clsx(l.col, l.mt)}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="img-hover">
                  <SketchImage
                    src={p.cover}
                    alt={p.title}
                    aspect={l.aspect}
                    mode="hover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <div>
                    <p className="eyebrow text-smoke mb-2">
                      {String(i + 1).padStart(2, '0')} — {p.category}
                    </p>
                    <h3 className="display text-3xl md:text-4xl tracking-tight">
                      <span className="ink-link">{p.title}</span>
                    </h3>
                  </div>
                  <p className="eyebrow text-smoke whitespace-nowrap">
                    {p.location} · {p.year}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
