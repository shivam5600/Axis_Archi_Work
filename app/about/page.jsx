import Image from 'next/image';
import { studio } from '@/lib/projects';
import Reveal from '@/components/Reveal';
import AxisAGlyph from '@/components/AxisAGlyph';
import YearRoll from '@/components/YearRoll';
import StackedPhotoRotator from '@/components/StackedPhotoRotator';

export const metadata = {
  title: 'Studio',
  description: studio.shortAbout,
};

const office = [
  { src: '/images/about/office/office-1.jpg', alt: 'Inside the Axis Architects studio' },
  { src: '/images/about/office/office-2.jpg', alt: 'The Axis Architects studio' },
  { src: '/images/about/office/office-3.jpg', alt: 'A corner of the Axis Architects studio' },
];

/* Push pin for the Founders' note card, sits on the top edge so the card reads as a pinned note.
   Head uses the brand accent (var(--accent)); works on both the light and dark card surface. */
function PushPin() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 -top-6 -translate-x-1/2 drop-shadow-[0_4px_5px_rgba(0,0,0,0.3)]"
    >
      <svg width="46" height="58" viewBox="0 0 46 58" fill="none">
        {/* needle */}
        <path d="M23 34 L23 55.5" stroke="#8C8C8C" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M23.9 35 L23.9 52" stroke="rgba(255,255,255,0.45)" strokeWidth="0.9" strokeLinecap="round" />
        {/* collar */}
        <ellipse cx="23" cy="34.4" rx="6.6" ry="2.8" fill="#8C8C8C" />
        <ellipse cx="23" cy="32.8" rx="6.6" ry="2.8" fill="#B4B4B4" />
        {/* head */}
        <circle cx="23" cy="19" r="14" fill="var(--accent)" />
        <circle cx="23" cy="19" r="14" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="1" />
        {/* shading + highlight so the head reads as a dome */}
        <path d="M23 33a14 14 0 0 0 13.5-10.4A14 14 0 0 1 23 33Z" fill="rgba(0,0,0,0.2)" />
        <ellipse cx="18" cy="13.6" rx="5" ry="3.4" transform="rotate(-26 18 13.6)" fill="rgba(255,255,255,0.55)" />
      </svg>
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* HEADER, two left-aligned lines; stylized brand "A"; 2005 rolls in on load */}
      <section className="container-edge max-w-[100rem] mx-auto pt-28 md:pt-44 pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal variant="mask">
            <h1 className="display text-[8vw] sm:text-[6.5vw] md:text-[5.5vw] leading-[0.95]">
              Leaders in <AxisAGlyph />rchitecture
            </h1>
          </Reveal>
          <Reveal variant="mask" delay={120}>
            <h1 className="display text-[8vw] sm:text-[6.5vw] md:text-[5.5vw] leading-[0.95]">
              &amp; design <span className="text-[var(--accent)]">since <YearRoll target={2005} />.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* DESCRIPTION, rotating office-photo stack (left) + studio note (right) */}
      <section className="container-edge max-w-[100rem] mx-auto pb-16 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-5">
            <StackedPhotoRotator images={office} />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="display text-balance text-2xl md:text-[2.1rem] leading-[1.28]">
                {studio.aboutLong}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUNDER CARD, pinned note: push pin + centered photo, quote, body note, signature */}
      <section className="container-edge max-w-[100rem] mx-auto pb-16 md:pb-28">
        <Reveal>
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-[var(--line)] bg-[var(--cream)] px-8 pt-14 pb-8 md:px-14 md:pt-16 md:pb-14 shadow-xl">
            <PushPin />
            <div className="flex flex-col items-center text-center">
              <p className="eyebrow text-smoke mb-6">Founders' note</p>
              <div className="relative h-32 w-32 md:h-44 md:w-44 shrink-0 overflow-hidden rounded-full border border-[var(--line)]">
                <Image
                  src="/images/about/founder.png"
                  alt="AR. Namit Tandon, Principal Architect & Founder"
                  fill
                  sizes="(max-width: 768px) 128px, 176px"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 max-w-full">
                <span
                  aria-hidden
                  className="absolute left-1/2 -top-[6px] -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-[var(--line)] bg-[var(--bg)]"
                />
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-6 py-4">
                  <p className="display italic text-2xl md:text-3xl leading-tight text-balance">
                    “Function follows form.”
                  </p>
                </div>
              </div>
            </div>
            <div className="body-serif text-[var(--fg-soft)] leading-relaxed space-y-4 mt-10">
              <p>
                We believe that great architecture is not just about what a building does, it is about what it says. Every space we design begins with a question: what should this place feel like? Structure, material, and light are then assembled in service of that feeling.
              </p>
              <p>
                Since founding Axis Architects in 2005, I have had the privilege of shaping spaces across Lucknow, homes, institutions, showrooms, and townships, each one a quiet attempt to balance beauty with purpose.
              </p>
            </div>
            <p className="eyebrow text-[var(--fg)] mt-8 text-right">AR. Namit Tandon · Principal Architect &amp; Founder
            </p>
          </div>
        </Reveal>
      </section>

    </>
  );
}
