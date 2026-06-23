'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { categories } from '@/lib/projects';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects', hasDropdown: true },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Light nav while sitting over the dark hero; dark nav otherwise (kept legible
  // since the navbar background is fully transparent at all times).
  const [overHero, setOverHero] = useState(pathname === '/');
  const dropdownTimerRef = useRef(null);

  // Track whether we're still over the homepage hero (so text flips light/dark).
  useEffect(() => {
    if (pathname !== '/') { setOverHero(false); return; }
    let hero = null;
    const check = () => {
      if (!hero) hero = document.querySelector('[data-hero]');
      const h = hero ? hero.offsetHeight : window.innerHeight;
      setOverHero(window.scrollY < h - 72);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [pathname]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('theme');
    const prefers = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  useEffect(() => { setOpen(false); setShowDropdown(false); }, [pathname]);

  const openDropdown = () => {
    clearTimeout(dropdownTimerRef.current);
    setShowDropdown(true);
  };
  const closeDropdown = () => {
    clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => setShowDropdown(false), 180);
  };

  const link = 'eyebrow ink-link transition-opacity opacity-65 hover:opacity-100';

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 py-3 transition-colors duration-300 ease-soft',
          overHero ? 'text-bone' : 'text-[var(--fg)]'
        )}
      >
        {/* Background fades in once scrolled past the hero (opacity only — no layout/color thrash). */}
        <div
          aria-hidden
          className={clsx(
            'pointer-events-none absolute inset-0 -z-10 bg-[var(--bg)] hairline-b transition-opacity duration-300',
            overHero ? 'opacity-0' : 'opacity-100'
          )}
        />
        <div className="mx-auto container-edge max-w-[100rem] flex items-center justify-between gap-4 md:gap-6">
          <Link
            href="/"
            aria-label="Axis Architects — home"
            className="group flex items-center gap-3 md:gap-4 shrink-0"
          >
            <span className="relative block h-16 w-[6.4rem] md:h-20 md:w-[8.4rem]">
              <Image
                src="/images/brand/logo.png"
                alt="Axis Architects logo"
                fill
                priority
                sizes="160px"
                className="object-contain logo-mark"
                style={overHero ? { filter: 'brightness(0) invert(1)' } : undefined}
              />
            </span>
            <span className="hidden lg:flex flex-col leading-none">
              <span className="display tracking-tight text-[1.4rem]">
                Axis Architects<span className="text-[var(--accent)]">.</span>
              </span>
              <span className="eyebrow mt-1.5 opacity-70">Architects & Engineers · Est. 2005</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    onFocus={openDropdown}
                  >
                    <Link
                      href={item.href}
                      className={clsx('eyebrow ink-link transition-opacity flex items-center gap-1.5', active ? 'opacity-100' : 'opacity-65 hover:opacity-100')}
                      aria-expanded={showDropdown}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg width="9" height="6" viewBox="0 0 9 6" className={clsx('transition-transform duration-300', showDropdown && 'rotate-180')} aria-hidden>
                        <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
                      </svg>
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx('eyebrow ink-link transition-opacity', active ? 'opacity-100' : 'opacity-65 hover:opacity-100')}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={toggleTheme}
              className={link}
              aria-label="Toggle theme"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
            <Link
              href="/contact"
              className="ml-1 inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white eyebrow hover:bg-[var(--accent-strong)] transition-colors"
              data-cursor="hover"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            className="md:hidden eyebrow"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* PROJECTS DROPDOWN — desktop only */}
        <div
          className={clsx(
            'hidden md:block absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-soft text-[var(--fg)]',
            showDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
          style={{ top: 'calc(100% - 0.5rem)' }}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div
            className="mt-2 w-[min(64rem,calc(100vw-3rem))] hairline shadow-2xl"
            style={{
              background: 'color-mix(in oklab, var(--bg) 96%, transparent)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="p-4 md:p-6">
              <div className="flex items-end justify-between mb-4">
                <p className="eyebrow text-smoke">Browse projects by type</p>
                <Link href="/projects" className="eyebrow ink-link text-smoke">View all →</Link>
              </div>
              <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/projects#${cat.slug}`}
                    className="group block hairline-b pb-3 hover:border-[var(--accent)] transition-colors"
                    data-cursor="hover"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden">
                      <Image
                        src={cat.cover}
                        alt={cat.title}
                        fill
                        sizes="240px"
                        className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                      />
                    </div>
                    <p className="display text-base md:text-lg mt-2 tracking-tight">
                      {cat.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-[var(--bg)] text-[var(--fg)] transition-all duration-500 ease-soft md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container-edge pt-28 pb-12 flex flex-col gap-6 overflow-y-auto h-full">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="display text-5xl ink-link"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile category jumps */}
          <details className="mt-2">
            <summary className="eyebrow text-smoke cursor-pointer">Project categories ↓</summary>
            <ul className="mt-4 flex flex-col gap-3 pl-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/projects#${c.slug}`} className="text-lg">
                    <span className="text-[var(--accent)] mr-2">◦</span>{c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-between px-5 py-4 bg-[var(--accent)] text-white eyebrow"
          >
            Get a Quote →
          </Link>
          <button onClick={toggleTheme} className="eyebrow text-smoke text-left mt-2">
            Switch to {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </>
  );
}
