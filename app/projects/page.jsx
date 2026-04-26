import Link from 'next/link';
import Image from 'next/image';
import { categories, projectsByCategory, projects, studio } from '@/lib/projects';
import SketchImage from '@/components/SketchImage';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Projects',
  description: `Selected works by ${studio.name} — across Commercial, Hospitality, Institutional, Residential, Township and Office Interior projects in Lucknow.`,
};

export default function ProjectsIndex() {
  const grouped = projectsByCategory();
  const totalImages = projects.reduce((sum, p) => sum + p.images.length, 0);

  return (
    <>
      {/* HEADER */}
      <section className="container-edge max-w-[100rem] mx-auto pt-28 md:pt-44 pb-8 md:pb-14">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-smoke">— Section II / Projects</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal variant="mask">
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.9]">
                Projects<span className="text-[var(--accent)]">.</span>
              </h1>
            </Reveal>
            <Reveal delay={140} className="mt-5 md:mt-7 max-w-2xl text-[var(--fg-soft)] body-serif text-lg leading-relaxed">
              {totalImages} frames across {projects.length} featured projects, organised into six verticals. Hover any image to reveal the photograph behind the sketch.
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATEGORY JUMP NAV */}
      <section className="container-edge max-w-[100rem] mx-auto pb-6">
        <Reveal>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 hairline-b pb-5">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="eyebrow inline-flex items-center gap-2 text-smoke hover:text-[var(--fg)] transition-colors"
                  data-cursor="hover"
                >
                  <span className="text-[var(--accent)]">◦</span>
                  {c.title}
                  <span className="opacity-60">
                    ({grouped.find((g) => g.slug === c.slug)?.projects.length ?? 0})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CATEGORY SECTIONS */}
      {grouped.map((cat, ci) => {
        if (cat.projects.length === 0) return null;
        return (
          <section
            key={cat.slug}
            id={cat.slug}
            className="container-edge max-w-[100rem] mx-auto py-10 md:py-20 scroll-mt-28"
          >
            {/* Section header */}
            <div className="hairline-b pb-5 mb-8 md:mb-12 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-12 md:col-span-7">
                <p className="eyebrow text-smoke mb-2">
                  <span className="text-[var(--accent)] mr-3">[ {String(ci + 1).padStart(2, '0')} ]</span>
                  Category
                </p>
                <h2 className="display text-[10vw] sm:text-[7vw] md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                  {cat.title}<span className="text-[var(--accent)]">.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 text-[var(--fg-soft)] body-serif leading-relaxed">
                {cat.description}
              </div>
            </div>

            {/* Each project: header + image grid showing ALL images */}
            <div className="flex flex-col gap-12 md:gap-20">
              {cat.projects.map((p, pi) => (
                <Reveal key={p.slug} as="article" className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-6">
                  {/* Project label row */}
                  <div className="col-span-12 flex items-baseline justify-between gap-4 hairline-b pb-3">
                    <div>
                      <p className="eyebrow text-smoke mb-1">
                        {String(pi + 1).padStart(2, '0')} · {p.type} · {p.location}
                      </p>
                      <Link href={`/projects/${p.slug}`} className="display text-2xl md:text-4xl tracking-tight" data-cursor="hover">
                        <span className="ink-link">{p.title}</span>
                      </Link>
                    </div>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="eyebrow text-smoke hover:text-[var(--fg)] arrow-link whitespace-nowrap"
                      data-cursor="hover"
                    >
                      View project
                      <svg width="14" height="9" viewBox="0 0 16 10" fill="none" aria-hidden>
                        <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </Link>
                  </div>

                  {/* All images for this project — primary on left, thumbs on right */}
                  {p.images.length === 1 ? (
                    <div className="col-span-12">
                      <Link href={`/projects/${p.slug}`} className="block" data-cursor="hover">
                        <SketchImage
                          src={p.images[0]}
                          alt={p.title}
                          aspect="aspect-[16/10] md:aspect-[16/9]"
                          sizes="(max-width: 768px) 100vw, 100vw"
                        />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="col-span-12 md:col-span-8">
                        <Link href={`/projects/${p.slug}`} className="block" data-cursor="hover">
                          <SketchImage
                            src={p.images[0]}
                            alt={`${p.title} — primary`}
                            aspect="aspect-[16/10] md:aspect-[5/4]"
                            sizes="(max-width: 768px) 100vw, 66vw"
                          />
                        </Link>
                      </div>
                      <div className="col-span-12 md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
                        {p.images.slice(1).map((src, ii) => (
                          <Link
                            key={src}
                            href={`/projects/${p.slug}`}
                            className="block"
                            data-cursor="hover"
                          >
                            <SketchImage
                              src={src}
                              alt={`${p.title} — frame ${ii + 2}`}
                              aspect={
                                p.images.length === 2
                                  ? 'aspect-[5/4]'
                                  : p.images.length === 3
                                    ? 'aspect-[5/4]'
                                    : 'aspect-[5/4]'
                              }
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="container-edge max-w-[100rem] mx-auto py-12 md:py-20">
        <div className="hairline-b pb-5 mb-8">
          <p className="eyebrow text-smoke">— Have a brief?</p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-6 items-baseline">
          <Link href="/contact" className="display text-3xl md:text-6xl ink-link">
            Begin a conversation →
          </Link>
          <p className="eyebrow text-smoke">
            {projects.length.toString().padStart(2, '0')} featured of {studio.stats[1].value} delivered
          </p>
        </div>
      </section>
    </>
  );
}
