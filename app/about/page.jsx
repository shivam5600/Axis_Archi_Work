import Image from 'next/image';
import Link from 'next/link';
import { studio } from '@/lib/projects';
import Reveal from '@/components/Reveal';
import Stats from '@/components/Stats';
import Services from '@/components/Services';

export const metadata = {
  title: 'Studio',
  description: studio.shortAbout,
};

const offices = [
  '/images/office/office-01.jpg',
  '/images/office/office-02.jpg',
  '/images/office/office-03.jpg',
  '/images/office/office-04.jpg',
  '/images/office/office-05.jpg',
  '/images/office/office-06.jpg',
  '/images/office/office-07.jpg',
];

const team = [
  { name: 'Principal Architect', role: 'Founder · Design Director' },
  { name: 'Associate Architect', role: 'Project Lead — Architecture' },
  { name: 'Interior Lead', role: 'Materials & Detail' },
  { name: 'Studio Manager', role: 'Operations & Client Relations' },
];

const timeline = [
  { y: '2005', t: 'Studio founded in Lucknow.' },
  { y: '2010', t: 'First commercial commission delivered in Hazratganj.' },
  { y: '2014', t: 'Interiors practice formalised as a sister discipline.' },
  { y: '2018', t: '250th project delivered. Office expanded.' },
  { y: '2022', t: 'Township & landscape vertical established.' },
  { y: '2024', t: '500th project completed.' },
];

export default function AboutPage() {
  return (
    <>
      {/* HEADER */}
      <section className="container-edge max-w-[100rem] mx-auto pt-32 md:pt-56 pb-12 md:pb-20">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-smoke">— Section IV / Studio</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal variant="mask">
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.92] md:leading-[0.9]">Leaders in</h1>
            </Reveal>
            <Reveal variant="mask" delay={120}>
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.92] md:leading-[0.9]">
                <em className="italic font-light">architecture</em>
              </h1>
            </Reveal>
            <Reveal variant="mask" delay={220}>
              <h1 className="display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.92] md:leading-[0.9]">
                & design <span className="text-[var(--accent)]">since 2005.</span>
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="container-edge max-w-[100rem] mx-auto pb-20 md:pb-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 md:col-start-2">
            <Reveal>
              <p className="display text-balance text-3xl md:text-5xl leading-[1.05]">
                {studio.shortAbout}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10 self-end">
            <Reveal delay={160}>
              <p className="eyebrow text-smoke mb-3">Founders' note</p>
              <p className="body-serif text-[var(--fg-soft)] leading-relaxed">
                Founded in {studio.established} in {studio.city}. {studio.philosophy}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 hairline-t hairline pt-12">
          {studio.highlights.map((h, i) => (
            <Reveal key={h} delay={i * 80}>
              <span className="text-[var(--accent)] text-lg">✦</span>
              <p className="display text-xl md:text-2xl tracking-tight leading-tight mt-3">{h}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <Stats items={studio.stats} theme="dark" />

      {/* SERVICES */}
      <Services services={studio.services} />

      {/* OFFICE GALLERY */}
      <section className="container-edge max-w-[100rem] mx-auto py-20 md:py-32">
        <div className="hairline-b pb-6 mb-16 flex items-end justify-between">
          <p className="eyebrow text-smoke">[ V.a ]  The studio, photographed</p>
          <p className="eyebrow text-smoke">{offices.length.toString().padStart(2, '0')} frames</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-8">
            <div className="img-hover relative aspect-[16/10]">
              <Image src={offices[0]} alt="Studio interior" fill sizes="(max-width: 768px) 100vw, 70vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-4 md:mt-32">
            <div className="img-hover relative aspect-[16/11] md:aspect-[3/4]">
              <Image src={offices[1]} alt="Studio detail" fill sizes="(max-width: 768px) 92vw, 30vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-5">
            <div className="img-hover relative aspect-[16/11] md:aspect-[4/5]">
              <Image src={offices[2]} alt="Studio corner" fill sizes="(max-width: 768px) 92vw, 40vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-7 md:-mt-12">
            <div className="img-hover relative aspect-[16/10]">
              <Image src={offices[3]} alt="Studio shelves" fill sizes="(max-width: 768px) 92vw, 60vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="col-span-6 md:col-span-4 md:mt-12">
            <div className="img-hover relative aspect-[3/4]">
              <Image src={offices[4]} alt="" fill sizes="(max-width: 768px) 46vw, 30vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={80} className="col-span-6 md:col-span-4">
            <div className="img-hover relative aspect-[3/4]">
              <Image src={offices[5]} alt="" fill sizes="(max-width: 768px) 46vw, 30vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={160} className="col-span-12 md:col-span-4">
            <div className="img-hover relative aspect-[16/10] md:aspect-[3/4]">
              <Image src={offices[6]} alt="" fill sizes="(max-width: 768px) 92vw, 30vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-edge max-w-[100rem] mx-auto py-20 md:py-32">
        <div className="hairline-b pb-6 mb-16">
          <p className="eyebrow text-smoke">[ V.b ]  A short chronology</p>
        </div>
        <ol className="grid gap-0">
          {timeline.map((row, i) => (
            <Reveal
              key={row.y}
              as="li"
              delay={i * 80}
              className="hairline-b grid grid-cols-12 py-8 items-baseline gap-4"
            >
              <span className="col-span-3 md:col-span-2 eyebrow text-smoke">{row.y}</span>
              <span className="col-span-9 md:col-span-10 display text-2xl md:text-4xl tracking-tight text-balance">
                {row.t}
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* TEAM */}
      <section className="container-edge max-w-[100rem] mx-auto py-20 md:py-32">
        <div className="hairline-b pb-6 mb-16">
          <p className="eyebrow text-smoke">[ V.c ]  The people</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <p className="eyebrow text-smoke mb-2">{String(i + 1).padStart(2, '0')}</p>
              <p className="display text-2xl md:text-3xl tracking-tight">{m.name}</p>
              <p className="text-sm text-[var(--fg-soft)] mt-2">{m.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge max-w-[100rem] mx-auto py-24">
        <div className="hairline-b pb-6 mb-12">
          <p className="eyebrow text-smoke">— continue</p>
        </div>
        <div className="flex flex-wrap gap-12">
          <Link href="/exteriors" className="display text-5xl md:text-7xl ink-link">
            See exteriors →
          </Link>
          <Link href="/contact" className="display text-5xl md:text-7xl ink-link italic font-light">
            Write to us →
          </Link>
        </div>
      </section>
    </>
  );
}
