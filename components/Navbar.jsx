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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-soft',
          scrolled ? 'py-2' : 'py-3'
        )}
      >
        {/* Persistent backdrop — softer at top, stronger when scrolled */}
        <div
          aria-hidden
          className={clsx(
            'pointer-events-none absolute inset-x-0 top-0 h-full -z-10 transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-90'
          )}
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in oklab, var(--bg) 92%, transparent), color-mix(in oklab, var(--bg) 70%, transparent) 70%, transparent)',
            backdropFilter: 'blur(14px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.1)',
          }}
        />

        <div className="mx-auto container-edge max-w-[100rem] flex items-center justify-between gap-4 md:gap-6">
          <Link
            href="/"
            aria-label="Axis Architects — home"
            className="group flex items-center gap-3 md:gap-4 shrink-0"
          >
            <span
              className={clsx(
                'relative block transition-all duration-500 ease-soft',
                scrolled ? 'h-14 w-[5.6rem] md:h-16 md:w-[6.6rem]' : 'h-16 w-[6.4rem] md:h-20 md:w-[8.4rem]'
              )}
            >
              <Image
                src="/images/brand/logo.png"
                alt="Axis Architects logo"
                fill
                priority
                sizes="160px"
                className="object-contain logo-mark"
              />
            </span>
            <span className="hidden lg:flex flex-col leading-none">
              <span className={clsx(
                'display tracking-tight transition-all duration-500',
                scrolled ? 'text-xl' : 'text-[1.4rem]'
              )}>
                Axis Architects<span className="text-[var(--accent)]">.</span>
              </span>
              <span className="eyebrow text-smoke mt-1.5 opacity-80">Architects & Engineers · Est. 2005</span>
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
                      className={clsx(
                        'eyebrow ink-link transition-colors flex items-center gap-1.5',
                        active ? 'text-[var(--fg)]' : 'text-smoke hover:text-[var(--fg)]'
                      )}
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
                  className={clsx(
                    'eyebrow ink-link transition-colors',
                    active ? 'text-[var(--fg)]' : 'text-smoke hover:text-[var(--fg)]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={toggleTheme}
              className="eyebrow ink-link text-smoke hover:text-[var(--fg)]"
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
            'hidden md:block absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-soft',
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
          'fixed inset-0 z-40 bg-[var(--bg)] transition-all duration-500 ease-soft md:hidden',
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
