'use client';

import Reveal from './Reveal';

export default function Testimonials({ items }) {
  return (
    <section className="container-edge max-w-[100rem] mx-auto pb-32 md:pb-40">
      <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-12">
          <Reveal variant="mask">
            <h2 className="display text-3xl md:text-[3.75rem] leading-[1.0] text-left">
              Trusted, <em className="italic font-light">quietly</em><span className="text-[var(--accent)]">.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {items.map((t, i) => (
          <Reveal as="figure" key={t.name} delay={i * 100} className="flex flex-col gap-6">
            <span aria-hidden className="display text-7xl text-[var(--accent)] leading-none">“</span>
            <blockquote className="display text-2xl md:text-[1.65rem] leading-[1.25] text-balance">
              {t.quote}
            </blockquote>
            <figcaption className="mt-auto pt-6 hairline">
              <p className="font-medium">{t.name}</p>
              <p className="eyebrow text-smoke mt-1">{t.role}</p>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
