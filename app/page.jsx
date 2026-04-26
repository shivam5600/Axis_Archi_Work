import Link from 'next/link';
import { studio, projects } from '@/lib/projects';
import SketchImage from '@/components/SketchImage';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import SectionHeader from '@/components/SectionHeader';

export default function HomePage() {
  const FEATURED_SLUGS = [
    'uttam-palace',
    'penguin-tower',
    'modern-villa-gomti-nagar',
    'sr-hospital',
    'the-wardrobe-showroom',
    'green-meadows-township',
  ];
  const featured = FEATURED_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      {/* ─────── HERO ─────── */}
      <section className="relative min-h-[100svh] container-edge max-w-[100rem] mx-auto pt-36 md:pt-48 pb-20 flex flex-col">
        <div className="flex items-end justify-between mb-10">
          <Reveal variant="mask">
            <p className="eyebrow text-smoke">◦ {studio.eyebrow}</p>
          </Reveal>
          <Reveal variant="mask" delay={120}>
            <p className="eyebrow text-smoke text-right">
              Est. {studio.established} · {studio.city}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="col-span-12 md:col-span-9">
            <Reveal variant="mask" delay={80}>
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10.4vw] lg:text-[9rem] xl:text-[11.4rem] leading-[0.92] md:leading-[0.86]">
                We design
              </h1>
            </Reveal>
            <Reveal variant="mask" delay={180}>
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10.4vw] lg:text-[9rem] xl:text-[11.4rem] leading-[0.92] md:leading-[0.86]">
                spaces that tell
              </h1>
            </Reveal>
            <Reveal variant="mask" delay={280}>
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10.4vw] lg:text-[9rem] xl:text-[11.4rem] leading-[0.92] md:leading-[0.86]">
                <em className="italic font-light">stories</em><span className="text-[var(--accent)]">.</span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={520} className="col-span-12 md:col-span-3 md:pl-6">
            <p className="body-serif text-pretty leading-relaxed text-[var(--fg-soft)] md:max-w-[28ch]">
              {studio.subTagline}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/exteriors"
                className="inline-flex items-center justify-between gap-3 px-5 py-3.5 bg-[var(--accent)] text-white eyebrow hover:bg-[var(--accent-strong)] transition-colors"
                data-cursor="hover"
              >
                Explore Our Work
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                  <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>
              <Link href="/about" className="arrow-link eyebrow">
                Know more about us
                <svg width="14" height="9" viewBox="0 0 16 10" fill="none" aria-hidden>
                  <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Hero collage */}
        <div className="mt-12 md:mt-28 grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
          <Reveal className="col-span-12 md:col-span-7">
            <SketchImage
              src="/images/exterior/ext-01.jpg"
              alt="Uttam Palace, Hazratganj"
              aspect="aspect-[16/10]"
              priority
              sizes="(max-width: 768px) 92vw, 60vw"
            />
            <p className="eyebrow text-smoke mt-3">[ Fig. 01 ] — Uttam Palace, Hazratganj</p>
          </Reveal>

          <Reveal delay={140} className="col-span-12 md:col-span-4 md:col-start-9 md:-mt-32">
            <SketchImage
              src="/images/interior/int-04.jpg"
              alt="Aliganj Family Home"
              aspect="aspect-[16/11] md:aspect-[3/4]"
              sizes="(max-width: 768px) 92vw, 30vw"
            />
            <p className="eyebrow text-smoke mt-3">[ Fig. 02 ] — Aliganj Family Home</p>
          </Reveal>
        </div>

        <div className="hidden md:flex items-center justify-between mt-10 eyebrow text-smoke opacity-70">
          <span className="flex items-center gap-3">
            <span className="block w-8 h-px bg-current" />
            Scroll
          </span>
          <span aria-hidden>↓</span>
        </div>
      </section>

      {/* ─────── 01 · ABOUT ─────── */}
      <section id="about" className="container-edge max-w-[100rem] mx-auto pt-16 md:pt-32 pb-20 md:pb-40">
        <SectionHeader number="01" label="About us" right="The studio" />
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

      {/* Marquee divider */}
      <Marquee
        items={['Architecture', 'Interiors', 'Townships', 'Institutional', 'Hospitality', 'Commercial', 'Residential']}
      />

      {/* ─────── 02 · SERVICES ─────── */}
      <section id="services">
        <SectionHeader number="02" label="What we do" right="Six verticals" wrapper />
        <Services services={studio.services} />
      </section>

      {/* ─────── 03 · PROJECTS ─────── */}
      <section id="projects" className="container-edge max-w-[100rem] mx-auto pt-16 md:pt-24 pb-20 md:pb-32">
        <SectionHeader
          number="03"
          label="Projects that define us"
          right={<Link href="/exteriors" className="ink-link">View all projects →</Link>}
        />

        <Reveal className="mb-12 max-w-2xl">
          <p className="body-serif text-lg text-[var(--fg-soft)] leading-relaxed">
            A curated selection from {studio.stats[1].value} completed projects across Lucknow and beyond.
          </p>
        </Reveal>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-16 md:gap-y-32">
          {featured.map((p, i) => {
            const layouts = [
              { col: 'md:col-span-7', aspect: 'aspect-[16/11] md:aspect-[5/6]', mt: '' },
              { col: 'md:col-span-4 md:col-start-9', aspect: 'aspect-[16/11] md:aspect-[3/4]', mt: 'md:mt-40' },
              { col: 'md:col-span-5', aspect: 'aspect-[16/11] md:aspect-[4/5]', mt: '' },
              { col: 'md:col-span-6 md:col-start-7', aspect: 'aspect-[16/10] md:aspect-[16/11]', mt: 'md:-mt-12' },
              { col: 'md:col-span-7', aspect: 'aspect-[16/11] md:aspect-[5/6]', mt: '' },
              { col: 'md:col-span-4 md:col-start-9', aspect: 'aspect-[16/11] md:aspect-[3/4]', mt: 'md:mt-32' },
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

        <div className="mt-24 flex justify-center md:hidden">
          <Link href="/exteriors" className="eyebrow ink-link">View all projects →</Link>
        </div>
      </section>

      {/* ─────── 04 · IMPACT (Stats) ─────── */}
      <section id="impact">
        <Stats items={studio.stats} theme="dark" />
      </section>

      {/* ─────── 05 · TESTIMONIALS ─────── */}
      <section id="testimonials">
        <SectionHeader number="05" label="In their words" right="Three client notes" wrapper />
        <Testimonials items={studio.testimonials} />
      </section>

      {/* ─────── 06 · CONTACT CTA ─────── */}
      <section id="cta" className="container-edge max-w-[100rem] mx-auto pt-16 md:pt-24 pb-20 md:pb-32">
        <SectionHeader number="06" label="Let's work together" />
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
