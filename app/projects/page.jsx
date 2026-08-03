import Link from 'next/link';
import Image from 'next/image';
import { projectsByCategory, projects, studio } from '@/lib/projects';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Projects',
  description: `Selected works by ${studio.name}, across Commercial, Hospitality, Institutional, Residential, Township and Interior projects in Lucknow.`,
};

export default function ProjectsIndex() {
  const grouped = projectsByCategory();

  return (
    <>
      {/* HEADER */}
      <section className="container-edge max-w-[100rem] mx-auto pt-28 md:pt-44 pb-8 md:pb-14">
        <Reveal variant="mask">
          <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.9] text-center">
            Projects<span className="text-[var(--accent)]">.</span>
          </h1>
        </Reveal>
      </section>

      {/* CATEGORY SECTIONS */}
      {grouped.map((cat) => {
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
                <h2 className="display text-[10vw] sm:text-[7vw] md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                  {cat.title}<span className="text-[var(--accent)]">.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 text-[var(--fg-soft)] body-serif leading-relaxed">
                {cat.description}
              </div>
            </div>

            {/* Project cards, horizontal: image left, details right */}
            <div className="flex flex-col gap-8 md:gap-12">
              {cat.projects.map((p) => (
                <Reveal as="article" key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    data-cursor="hover"
                    className="group grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--cream)] shadow-sm transition-all duration-500 ease-soft hover:shadow-xl hover:border-[var(--fg-soft)]"
                  >
                    {/* LEFT, image: portrait 4:5, matches the 1080 x 1350 source frame (no side crop) */}
                    <div className="relative md:col-span-4 aspect-[4/5] overflow-hidden bg-[var(--paper)]">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 34vw"
                        className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* RIGHT, details */}
                    <div className="md:col-span-8 flex flex-col justify-center gap-5 p-6 md:p-10">
                      <div>
                        <p className="eyebrow text-smoke mb-2">{p.type}{p.location ? ` · ${p.location}` : ''}</p>
                        <h3 className="display text-2xl md:text-4xl tracking-tight leading-tight">
                          {p.title}
                        </h3>
                        {p.year && (
                          <p className="eyebrow text-smoke mt-3">Completed: {p.year}</p>
                        )}
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <p className="eyebrow text-[var(--accent)] mb-1.5">Challenges</p>
                          <p className="body-serif text-sm md:text-base text-[var(--fg-soft)] leading-relaxed">
                            {p.challenges}
                          </p>
                        </div>
                        <div>
                          <p className="eyebrow text-[var(--accent)] mb-1.5">Solution</p>
                          <p className="body-serif text-sm md:text-base text-[var(--fg-soft)] leading-relaxed">
                            {p.solution}
                          </p>
                        </div>
                      </div>
                      <span className="arrow-link eyebrow text-[var(--fg)] mt-1 opacity-70 transition-opacity group-hover:opacity-100">
                        View project
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                          <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="container-edge max-w-[100rem] mx-auto py-12 md:py-20">
        <div className="hairline-b pb-5 mb-8">
          <p className="eyebrow text-smoke">Have a brief?</p>
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
