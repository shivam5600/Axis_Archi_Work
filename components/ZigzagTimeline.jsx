/**
 * A short chronology drawn as a horizontal zigzag pathway: milestone dots alternate
 * above/below a thin wave line that runs the full width. Each dot shows its year at
 * rest; hovering or focusing a dot reveals that year's event as a small caption.
 *
 * The dots are DOM elements positioned by percentage; the connecting line is an SVG
 * polyline through the same coordinates (preserveAspectRatio="none" so the 0-100
 * viewBox maps 1:1 onto the container, keeping vertices aligned at any width). Tooltip
 * alignment is edge-aware so the first/last captions never clip off-screen. No client
 * JS, hover/focus is pure CSS; reduced motion is handled globally.
 */
export default function ZigzagTimeline({ items = [] }) {
  if (!items.length) return null;
  const n = items.length;
  // x evenly inset from the edges; y alternates up (30%) / down (70%)
  const xAt = (i) => 8 + (i / (n - 1)) * 84;
  const yAt = (i) => (i % 2 === 0 ? 30 : 70);
  const points = items.map((_, i) => `${xAt(i)},${yAt(i)}`).join(' ');

  return (
    <div className="relative w-full h-[300px] md:h-[340px]">
      {/* connecting wave line */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points={points}
          fill="none"
          stroke="var(--fg-soft)"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
      </svg>

      {items.map((row, i) => {
        const up = i % 2 === 0;
        // edge-aware caption alignment
        const tipPos =
          i === 0
            ? 'left-0'
            : i === n - 1
            ? 'right-0'
            : 'left-1/2 -translate-x-1/2';
        const tipSide = up ? 'bottom-full mb-3' : 'top-full mt-3';
        const tipText = i === 0 ? 'text-left' : i === n - 1 ? 'text-right' : 'text-center';

        return (
          <div
            key={row.y}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${xAt(i)}%`, top: `${yAt(i)}%` }}
          >
            <div
              className="group/dot relative flex flex-col items-center outline-none"
              tabIndex={0}
              aria-label={`${row.y}: ${row.t}`}
            >
              {up && (
                <span className="eyebrow mb-3 text-[var(--fg-soft)] transition-colors group-hover/dot:text-[var(--fg)] group-focus-within/dot:text-[var(--fg)]">
                  {row.y}
                </span>
              )}

              <span className="h-3 w-3 rounded-full bg-[var(--fg)] ring-0 ring-[var(--accent)]/25 transition-all duration-300 group-hover/dot:bg-[var(--accent)] group-hover/dot:ring-4 group-focus-within/dot:bg-[var(--accent)] group-focus-within/dot:ring-4" />

              {!up && (
                <span className="eyebrow mt-3 text-[var(--fg-soft)] transition-colors group-hover/dot:text-[var(--fg)] group-focus-within/dot:text-[var(--fg)]">
                  {row.y}
                </span>
              )}

              {/* caption on hover / focus */}
              <span
                className={`pointer-events-none absolute z-20 w-[170px] ${tipPos} ${tipSide} ${tipText} translate-y-1 opacity-0 transition-all duration-300 group-hover/dot:translate-y-0 group-hover/dot:opacity-100 group-focus-within/dot:translate-y-0 group-focus-within/dot:opacity-100`}
              >
                <span className="block rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 body-serif text-sm leading-snug text-[var(--fg)] shadow-lg">
                  {row.t}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
