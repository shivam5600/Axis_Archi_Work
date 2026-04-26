'use client';

import Reveal from './Reveal';

const ICONS = {
  blueprint: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <rect x="6" y="6" width="36" height="36" />
      <path d="M6 18h36M18 6v36M30 18v24M6 30h12" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M24 8L6 18l18 10 18-10L24 8z" />
      <path d="M6 28l18 10 18-10M6 38l18 10 18-10" opacity="0.5" />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M6 16h36l-3-8H9l-3 8zM10 16v24h28V16M20 40V26h8v14" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M6 22L24 6l18 16M10 22v20h28V22M22 42V30h4v12" />
    </svg>
  ),
  institution: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M4 18L24 8l20 10M8 18v20M16 18v20M24 18v20M32 18v20M40 18v20M4 40h40" />
    </svg>
  ),
  trees: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M16 30c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zM16 30v12M32 28c-3 0-6-3-6-6s3-6 6-6 6 3 6 6-3 6-6 6zM32 28v14" />
    </svg>
  ),
};

export default function Services({ services }) {
  return (
    <section className="container-edge max-w-[100rem] mx-auto pb-32 md:pb-40">
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-9 md:col-start-2">
          <Reveal variant="mask">
            <h2 className="display text-[10vw] md:text-[7rem] leading-[0.92]">
              Services built around
            </h2>
          </Reveal>
          <Reveal variant="mask" delay={120}>
            <h2 className="display text-[10vw] md:text-[7rem] leading-[0.92]">
              <em className="italic font-light">your vision</em><span className="text-[var(--accent)]">.</span>
            </h2>
          </Reveal>
          <Reveal delay={260} className="mt-6 max-w-xl text-[var(--fg-soft)] body-serif text-lg">
            From concept to completion — we handle every detail.
          </Reveal>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 hairline">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 70}
            className="group relative p-8 md:p-10 hairline-b md:[&:nth-child(3n)]:border-l-0 md:border-l border-[var(--line)]"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="w-14 h-14 text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-700">
                {ICONS[s.icon]}
              </div>
              <span className="eyebrow text-smoke">{s.n}</span>
            </div>
            <h3 className="display text-3xl md:text-4xl mt-12 tracking-tight leading-[1.05]">
              {s.title}
            </h3>
            <p className="mt-4 text-[var(--fg-soft)] leading-relaxed text-pretty">
              {s.blurb}
            </p>
            <span
              aria-hidden
              className="absolute left-0 right-0 bottom-0 h-px bg-[var(--accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-soft"
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
