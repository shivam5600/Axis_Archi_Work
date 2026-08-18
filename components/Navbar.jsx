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
  const [dark] = useState(false);
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

  // Dark mode disabled for now — force light theme everywhere (ignore stored/system pref).
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => { setOpen(false); setShowDropdown(false); }, [pathname]);

  const openDropdown = () => {
    clearTimeout(dropdownTimerRef.current);
    setShowDropdown(true);
  };
  const closeDropdown = () => {
    clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => setShowDropdown(false), 180);
  };
  // Clicking a panel link must close it at once. The 180ms grace above is for
  // mouse-out only, and `pathname` does not change on a query-only navigation.
  const hideDropdown = () => {
    clearTimeout(dropdownTimerRef.current);
    setShowDropdown(false);
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 py-3 transition-colors duration-300 ease-soft',
          overHero ? 'text-bone' : 'text-[var(--fg)]'
        )}
      >
        {/* Background fades in once scrolled past the hero (opacity only, no layout/color thrash). */}
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
            aria-label="Axis Architects, home"
            className="group flex items-center gap-3 md:gap-4 shrink-0"
          >
            <span className="relative block h-11 w-[9rem] md:h-16 md:w-[13rem]">
              <Image
                src={(overHero || dark) ? '/images/brand/axis-logo-white.png' : '/images/brand/axis-logo-v2.png'}
                alt="Axis Architects logo"
                fill
                priority
                sizes="200px"
                className="object-contain"
              />
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
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
                      className={clsx('uppercase font-mono text-[22px] font-bold tracking-[0.1em] ink-link transition-opacity flex items-center gap-1.5', active ? 'opacity-100' : 'opacity-65 hover:opacity-100')}
                      aria-expanded={showDropdown}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg width="9" height="6" viewBox="0 0 9 6" className={clsx('transition-transform duration-300', showDropdown && 'rotate-180')} aria-hidden>
                        <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
                      </svg>
                    </Link>

                    {/* Dropdown, anchored directly below the Projects link */}
                    <div
                      className={clsx(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 transition-all duration-300 ease-soft text-[var(--fg)]',
                        showDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}
                    >
                      <div
                        className="w-[min(34rem,calc(100vw-3rem))] hairline shadow-2xl"
                        style={{
                          background: 'color-mix(in oklab, var(--bg) 96%, transparent)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                        }}
                      >
                        <div className="p-4 md:p-5">
                          <div className="flex items-center justify-end mb-3">
                            <Link href="/projects" onClick={hideDropdown} className="eyebrow ink-link text-smoke">View all →</Link>
                          </div>
                          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                            {categories.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/projects?category=${cat.slug}`}
                                onClick={hideDropdown}
                                className="group flex items-baseline gap-3 hairline-b py-2.5 hover:border-[var(--accent)] transition-colors"
                                data-cursor="hover"
                              >
                                <span className="display text-base md:text-lg tracking-tight opacity-80 transition-opacity group-hover:opacity-100">
                                  {cat.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx('uppercase font-mono text-[22px] font-bold tracking-[0.1em] ink-link transition-opacity', active ? 'opacity-100' : 'opacity-65 hover:opacity-100')}
                >
                  {item.label}
                </Link>
              );
            })}
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
              onClick={() => setOpen(false)}
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
                  <Link href={`/projects?category=${c.slug}`} onClick={() => setOpen(false)} className="text-lg">
                    <span className="text-[var(--accent)] mr-2">◦</span>{c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}
