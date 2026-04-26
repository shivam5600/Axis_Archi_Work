'use client';

export default function Marquee({ items = [], className = '' }) {
  const repeated = [...items, ...items];
  return (
    <div className={`overflow-hidden hairline-b hairline ${className}`}>
      <div className="flex gap-16 py-7 animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="display text-5xl md:text-7xl tracking-tight inline-flex items-center gap-16"
          >
            {item}
            <span className="text-terracotta text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
