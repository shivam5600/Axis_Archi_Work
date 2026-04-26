import Link from 'next/link';
import { studio, projects, slideshow, categories } from '@/lib/projects';
import SketchImage from '@/components/SketchImage';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import SectionHeader from '@/components/SectionHeader';
import HeroSlideshow from '@/components/HeroSlideshow';

export default function HomePage() {
  // Pick 4 featured projects from across the categories for the homepage shelf
  const FEATURED_SLUGS = [
    'stallion-honda',
    'kalra-residence',
    'ambalika-campus',
    'greenfield-township',
  ];
  const featured = FEATURED_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      {/* ─────── HERO SLIDESHOW ─────── */}
      <HeroSlideshow
        slides={slideshow}
        eyebrow={studio.eyebrow}
      />

      {/* ─────── PROJECT TYPES MARQUEE ─────── */}
      <Marquee
        items={categories.map((c) => c.title)}
      />

      {/* ─────── 01 · CATEGORIES (clickable category blocks) ─────── */}
      <section id="categories" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <SectionHeader
          number="01"
          label="Browse our work by type"
          right={<Link href="/projects" className="ink-link">View all projects →</Link>}
        />

        <Reveal className="mb-12 max-w-2xl">
          <p className="body-serif text-lg text-[var(--fg-soft)] leading-relaxed">
            Six verticals · {projects.length} featured projects · {studio.stats[1].value} delivered. Click any block to jump straight to that section.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10">
          {categories.map((cat, i) => (
            <Reveal as="li" key={cat.slug} delay={i * 70}>
              <Link
                href={`/projects#${cat.slug}`}
                className="group block"
                data-cursor="hover"
              >
                <SketchImage
                  src={cat.cover}
                  alt={cat.title}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="display text-2xl md:text-3xl tracking-tight">
                    <span className="ink-link">{cat.title}</span>
                  </h3>
                  <span className="eyebrow text-smoke whitespace-nowrap">
                    {String(i + 1).padStart(2, '0')} →
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--fg-soft)] leading-relaxed text-pretty">
                  {cat.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ─────── 02 · ABOUT ─────── */}
      <section id="about" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <SectionHeader number="02" label="About us" right="The studio" />
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-7">
            <Reveal variant="mask">
              <h2 className="display text-[10vw] md:text-[6.4rem] leading-[0.95]">
                Leaders in architecture
              </h2>
            </Reveal>
            <Reveal variant="mask" delay={120}>
              <h2 className="display text-[10vw] md:text-[6.4rem] leading-[0.95]">
                & design <em className="italic font-light">since 2005</em><span className="text-[var(--accent)]">.</span>
              </h2>
            </Reveal>
            <Reveal delay={260} className="mt-12 max-w-2xl text-[var(--fg-soft)] body-serif text-lg leading-relaxed">
              {studio.shortAbout}
            </Reveal>
            <Reveal delay={360} className="mt-10">
              <Link href="/about" className="arrow-link eyebrow">
                Discover our story
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                  <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-12">
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-6 gap-x-6">
              {studio.highlights.map((h, i) => (
                <Reveal as="li" key={h} delay={i * 80} className="hairline pt-5">
                  <span className="flex items-baseline gap-3">
                    <span className="text-[var(--accent)] text-lg leading-none">✦</span>
                    <span className="display text-xl md:text-2xl tracking-tight leading-tight">{h}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────── 03 · SERVICES ─────── */}
      <section id="services">
        <SectionHeader number="03" label="What we do" right="Six verticals" wrapper />
        <Services services={studio.services} />
      </section>

      {/* ─────── 04 · FEATURED PROJECTS ─────── */}
      <section id="featured" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <SectionHeader
          number="04"
          label="Selected projects"
          right={<Link href="/projects" className="ink-link">View all →</Link>}
        />

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-14 md:gap-y-24">
          {featured.map((p, i) => {
            const layouts = [
              { col: 'md:col-span-7', aspect: 'aspect-[16/11] md:aspect-[5/6]', mt: '' },
              { col: 'md:col-span-4 md:col-start-9', aspect: 'aspect-[16/11] md:aspect-[3/4]', mt: 'md:mt-40' },
              { col: 'md:col-span-5', aspect: 'aspect-[16/11] md:aspect-[4/5]', mt: '' },
              { col: 'md:col-span-6 md:col-start-7', aspect: 'aspect-[16/10] md:aspect-[16/11]', mt: 'md:-mt-12' },
            ];
            const l = layouts[i % layouts.length];
            return (
              <Reveal key={p.slug} className={`col-span-12 ${l.col} ${l.mt}`}>
                <Link href={`/projects/${p.slug}`} className="block group">
                  <SketchImage src={p.cover} alt={p.title} aspect={l.aspect} />
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="eyebrow text-smoke mb-2">
                        {String(i + 1).padStart(2, '0')} — {p.type} · {p.location.split(',')[0]}
                      </p>
                      <h3 className="display text-3xl md:text-5xl tracking-tight">
                        <span className="ink-link">{p.title}</span>
                      </h3>
                    </div>
                    <span className="eyebrow text-smoke whitespace-nowrap">{p.year}</span>
                  </div>
                  <p className="mt-4 max-w-md text-[var(--fg-soft)] leading-relaxed">
                    {p.summary}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ─────── 05 · IMPACT ─────── */}
      <section id="impact">
        <Stats items={studio.stats} theme="dark" />
      </section>

      {/* ─────── 06 · TESTIMONIALS ─────── */}
      <section id="testimonials">
        <SectionHeader number="06" label="In their words" right="Three client notes" wrapper />
        <Testimonials items={studio.testimonials} />
      </section>

      {/* ─────── 07 · CONTACT CTA ─────── */}
      <section id="cta" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <SectionHeader number="07" label="Let's work together" />
        <div className="grid grid-cols-12 gap-6 items-end">
          <Reveal variant="mask" className="col-span-12 md:col-span-9">
            <h2 className="display text-[12vw] md:text-[8rem] leading-[0.92]">
              Let's <em className="italic font-light">build</em> something <br className="hidden md:block" />
              that lasts. <span className="text-[var(--accent)]">Together.</span>
            </h2>
          </Reveal>
          <Reveal delay={200} className="col-span-12 md:col-span-3">
            <Link
              href="/contact"
              className="inline-flex w-full md:w-auto items-center justify-between gap-3 px-5 py-3.5 bg-[var(--accent)] text-white eyebrow hover:bg-[var(--accent-strong)] transition-colors"
              data-cursor="hover"
            >
              Get a Quote
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </Link>
            <p className="mt-6 text-sm text-[var(--fg-soft)] leading-relaxed">
              Or write directly to{' '}
              <a href={`mailto:${studio.contact.email}`} className="ink-link">{studio.contact.email}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
