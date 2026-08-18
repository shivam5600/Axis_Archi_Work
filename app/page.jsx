import Link from 'next/link';
import { studio, slideshow, categories, clients } from '@/lib/projects';
import SketchImage from '@/components/SketchImage';
import Reveal from '@/components/Reveal';
import Stats from '@/components/Stats';
import LogoCarousel from '@/components/LogoCarousel';
import HeroSlideshow from '@/components/HeroSlideshow';

export default function HomePage() {
  return (
    <>
      {/* ─────── HERO SLIDESHOW ─────── */}
      <HeroSlideshow slides={slideshow} />

      {/* ─────── 01 · CATEGORIES (clickable category blocks) ─────── */}
      <section id="categories" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10">
          {categories.map((cat, i) => (
            <Reveal as="li" key={cat.slug} delay={i * 70}>
              <Link
                href={`/projects?category=${cat.slug}`}
                className="group block"
                data-cursor="hover"
              >
                <SketchImage
                  src={cat.cover}
                  sketchSrc={cat.sketch}
                  alt={cat.title}
                  aspect="aspect-[4/5]"
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
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ─────── 02 · ABOUT ─────── */}
      <section id="about" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12">
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
        </div>
      </section>

      {/* ─────── 05 · IMPACT ─────── */}
      <section id="impact">
        <Stats items={studio.stats} theme="dark" />
      </section>

      {/* ─────── TRUSTED BY ─────── */}
      <section id="trusted-by" className="container-edge max-w-[100rem] mx-auto pt-10 md:pt-16 pb-14 md:pb-24">
        <Reveal variant="mask" className="mb-10 md:mb-14">
          <h2 className="display text-4xl md:text-6xl tracking-tight">
            Trusted <em className="italic font-light">by</em>.
          </h2>
        </Reveal>
        <LogoCarousel items={clients} />
      </section>

      {/* ─────── 07 · CONTACT CTA (merged · dark) ─────── */}
      <section id="cta" className="bg-ink text-bone" style={{ background: '#111111', color: '#F5F5F5' }}>
        <div className="container-edge max-w-[100rem] mx-auto pt-16 md:pt-20 pb-16 md:pb-20">
          <p className="eyebrow opacity-60 mb-6">A note before you go</p>
          <div className="grid grid-cols-12 gap-6 items-end">
            <Reveal variant="mask" className="col-span-12">
              <h2 className="display text-[2rem] md:text-[3.75rem] leading-[1.05]">
                Let's <em className="italic font-light">build</em> something <br className="hidden md:block" />
                that lasts. <span className="text-[var(--accent)]">Together.</span>
              </h2>
              <p className="display text-xl md:text-2xl leading-[1.15] mt-5">
                Build with <em className="not-italic text-[var(--accent)]">care</em>. Then build <span className="italic font-light">slowly</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
