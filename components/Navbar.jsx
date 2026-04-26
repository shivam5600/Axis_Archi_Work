'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/exteriors', label: 'Exteriors' },
  { href: '/interiors', label: 'Interiors' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-soft',
          scrolled ? 'py-2.5' : 'py-4'
        )}
      >
        <div className="mx-auto container-edge max-w-[100rem] flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Axis Architects — home"
            className="group flex items-center gap-4 shrink-0"
          >
            <span
              className={clsx(
                'relative block transition-all duration-500 ease-soft',
                scrolled ? 'h-12 w-12 md:h-14 md:w-14' : 'h-14 w-14 md:h-16 md:w-16'
              )}
            >
              <Image
                src="/images/brand/logo.png"
                alt="Axis Architects logo"
                fill
                priority
                sizes="64px"
                className="object-contain object-bottom logo-mark"
              />
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className={clsx(
                'display tracking-tight transition-all duration-500',
                scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-[1.7rem]'
              )}>
                Axis Architects<span className="text-[var(--accent)]">.</span>
              </span>
              <span className="eyebrow text-smoke mt-1.5">Architects & Engineers · Est. 2005</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
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

        <div
          aria-hidden
          className={clsx(
            'pointer-events-none absolute inset-x-0 top-0 h-full -z-10 transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in oklab, var(--bg) 88%, transparent), transparent)',
            backdropFilter: 'blur(10px)',
          }}
        />
      </header>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-[var(--bg)] transition-all duration-500 ease-soft md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container-edge pt-28 pb-12 flex flex-col gap-6">
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
