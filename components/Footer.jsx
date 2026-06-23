'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { studio } from '@/lib/projects';

const SOCIAL_ICONS = {
  Instagram: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-8h2.5l.4-3h-2.9V8c0-.86.3-1.45 1.6-1.45h1.5V3.9c-.3-.04-1.3-.13-2.5-.13-2.4 0-4.1 1.47-4.1 4.17V10H7.5v3H10v8h3.5z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.8-2.05 3.7-2.05 3.96 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.24-.12-1.4-.7-1.6-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.7-.3-1.4-.72-2-1.5-.18-.3.18-.3.5-.9.1-.12 0-.3 0-.42-.04-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.3 1 2.46c.12.16 1.66 2.54 4.04 3.56 1.5.58 1.9.5 2.3.46.46-.04 1.4-.58 1.6-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  ),
};

function SocialIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      {studio.social.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          data-cursor="hover"
          className="w-9 h-9 rounded-full grid place-items-center border border-white/25 text-[#C8C8C8] hover:bg-bone hover:text-ink hover:border-bone transition-colors"
        >
          {SOCIAL_ICONS[s.label] || s.label[0]}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <footer className={`hairline bg-ink text-bone ${isHome ? '' : 'mt-32'}`} style={{ background: '#111111', color: '#F5F5F5' }}>
      <div className="container-edge max-w-[100rem] mx-auto pt-20 pb-10">
        {/* Pre-footer CTA — hidden on the homepage (merged into the homepage CTA section) */}
        {!isHome && (
          <div className="grid md:grid-cols-12 gap-10 pb-20 hairline-b" style={{ borderColor: 'rgba(245,245,245,0.14)' }}>
            <div className="md:col-span-8">
              <p className="eyebrow opacity-60 mb-6">— A note before you go</p>
              <p className="display text-balance text-4xl md:text-7xl leading-[0.95]">
                Build with <em className="not-italic text-[var(--accent)]">care</em>.<br />
                Then build <span className="italic font-light">slowly</span>.
              </p>
            </div>
            <div className="md:col-span-4 md:flex md:items-end">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-between gap-3 px-5 py-4 bg-[var(--accent)] text-white eyebrow hover:bg-[var(--accent-strong)] transition-colors"
                data-cursor="hover"
              >
                Get a Quote
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                  <path d="M0 5h14m0 0L10 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* footer columns — brand · quick links · services · contact + social */}
        <div className="grid md:grid-cols-12 gap-10 pt-16">
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="relative h-20 w-32 -ml-2">
              <Image
                src="/images/brand/logo.png"
                alt="Axis Architects logo"
                fill
                sizes="128px"
                className="object-contain object-left-bottom"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </span>
            <p className="display text-3xl tracking-tight">
              Axis Architects<span className="text-[var(--accent)]">.</span>
            </p>
            <p className="eyebrow opacity-60">Architects & Engineers</p>
            <p className="mt-2 text-[#C8C8C8] leading-relaxed max-w-sm body-serif">
              {studio.city}'s trusted design partner since {studio.established}.
            </p>
          </div>

          <div className="md:col-span-2 text-sm">
            <p className="eyebrow opacity-60 mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/" className="block py-1"><span className="ink-link">Home</span></Link></li>
              <li><Link href="/about" className="block py-1"><span className="ink-link">About</span></Link></li>
              <li><Link href="/projects" className="block py-1"><span className="ink-link">Projects</span></Link></li>
              <li><Link href="/contact" className="block py-1"><span className="ink-link">Contact</span></Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 text-sm">
            <p className="eyebrow opacity-60 mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {studio.services.map((s) => (
                <li key={s.title} className="text-[#C8C8C8]">{s.title}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 text-sm">
            <p className="eyebrow opacity-60 mb-4">Contact</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a className="block py-1" href={`tel:${studio.contact.phone.replace(/\s/g, '')}`}>
                  <span className="ink-link">{studio.contact.phone}</span>
                </a>
              </li>
              <li>
                <a className="block py-1" href={`mailto:${studio.contact.email}`}>
                  <span className="ink-link">{studio.contact.email}</span>
                </a>
              </li>
              <li className="pt-2 text-pretty leading-relaxed text-[#C8C8C8]">{studio.contact.address}</li>
            </ul>
            <p className="eyebrow opacity-60 mt-8 mb-3">Follow</p>
            <SocialIcons />
          </div>
        </div>

        <div className="mt-16 pt-6 hairline-t flex flex-col items-center text-center gap-2 md:flex-row md:justify-between md:items-center md:text-left eyebrow text-[0.56rem] tracking-[0.05em] md:text-[0.6875rem] md:tracking-[0.22em]" style={{ borderColor: 'rgba(245,245,245,0.14)' }}>
          <span className="opacity-60">© {new Date().getFullYear()} {studio.name} — All Rights Reserved.</span>
          <span className="opacity-90">
            Developed by{' '}
            <a
              href="https://www.nextgrow.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] ink-link font-medium"
            >
              Nextgrow
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
