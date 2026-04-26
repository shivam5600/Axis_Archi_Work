import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-edge max-w-[100rem] mx-auto pt-44 md:pt-56 pb-32 min-h-[80svh] flex flex-col justify-center">
      <p className="eyebrow text-smoke mb-6">— Error 404</p>
      <h1 className="display text-[18vw] md:text-[12rem] leading-[0.86]">
        That page is, <em className="italic font-light">elsewhere.</em>
      </h1>
      <Link href="/" className="mt-12 eyebrow ink-link inline-flex items-center gap-3 self-start">
        Return to the index
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
          <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1" />
        </svg>
      </Link>
    </section>
  );
}
