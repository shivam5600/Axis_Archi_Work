'use client';

import Link from 'next/link';
import Image from 'next/image';
import { studio } from '@/lib/projects';

export default function Footer() {
  return (
    <footer className="hairline mt-32 bg-ink text-bone" style={{ background: '#111111', color: '#F5F5F5' }}>
      <div className="container-edge max-w-[100rem] mx-auto pt-20 pb-10">
        {/* Pre-footer CTA */}
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

        {/* 4-column footer */}
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

          <div className="md:col-span-2 md:col-start-6 text-sm">
            <p className="eyebrow opacity-60 mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/" className="block py-1"><span className="ink-link">Home</span></Link></li>
              <li><Link href="/about" className="block py-1"><span className="ink-link">About</span></Link></li>
              <li><Link href="/exteriors" className="block py-1"><span className="ink-link">Projects</span></Link></li>
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
          </div>
        </div>

        <div className="mt-16 pt-6 hairline-t flex flex-col md:flex-row justify-between gap-4 eyebrow opacity-60" style={{ borderColor: 'rgba(245,245,245,0.14)' }}>
          <span>© {new Date().getFullYear()} {studio.name} — All Rights Reserved. Designed for Excellence.</span>
          <span className="flex flex-wrap gap-6">
            {studio.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link"
              >
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
