/**
 * "Trusted By" carousel, a continuous, auto-scrolling client-logo strip.
 *
 * Client logos are normalized to dark-ink transparent PNGs (see /images/clients),
 * so a single `dark:invert` flips them to light ink in dark mode, one clean,
 * theme-adaptive monochrome logo wall. Items render at a uniform height, muted at
 * rest and full-strength on hover. The track is duplicated and translated -50%
 * (existing `animate-marquee`) for a seamless loop; motion pauses on hover.
 *
 * Accepts logo objects ({ name, logo }) or plain name strings (text fallback).
 * Pure CSS animation, reduced-motion handled globally in globals.css.
 */
export default function LogoCarousel({ items = [] }) {
  if (!items.length) return null;
  const track = [...items, ...items];
  return (
    <div className="group relative overflow-hidden hairline hairline-b">
      {/* edge fades so logos dissolve at the margins */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
        style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }}
      />
      <ul
        className="flex w-max items-center gap-x-5 md:gap-x-8 py-8 md:py-11 animate-marquee group-hover:[animation-play-state:paused]"
        aria-label="Selected clients"
      >
        {track.map((c, i) => {
          const name = typeof c === 'string' ? c : c.name;
          const logo = typeof c === 'string' ? null : c.logo;
          return (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= items.length ? 'true' : undefined}
              className="shrink-0"
            >
              {logo ? (
                <span className="flex h-16 md:h-20 items-center justify-center rounded-lg bg-white px-6 md:px-8 shadow-sm ring-1 ring-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${logo}?v=3`}
                    alt={name}
                    className="max-h-9 md:max-h-12 w-auto object-contain"
                  />
                </span>
              ) : (
                <span className="display text-2xl md:text-4xl tracking-tight text-[var(--fg-soft)] opacity-70 transition-opacity duration-500 hover:opacity-100 whitespace-nowrap">
                  {name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
