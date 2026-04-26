'use client';

import clsx from 'clsx';

/**
 * Consistent header above each section.
 * - number  : "01", "02", ... appears in the eyebrow on the left
 * - label   : section name (left)
 * - right   : optional string or node (right side of the bar)
 * - wrapper : true to add container-edge max-w-[100rem] mx-auto wrapping
 */
export default function SectionHeader({ number, label, right, wrapper = false, className = '' }) {
  const inner = (
    <div className={clsx('hairline-b pb-6 mb-12 md:mb-16 flex items-end justify-between gap-4', className)}>
      <p className="eyebrow text-smoke">
        {number ? <span className="text-[var(--accent)] mr-3">[ {number} ]</span> : null}
        {label}
      </p>
      {right != null && (
        typeof right === 'string'
          ? <p className="eyebrow text-smoke hidden md:block">{right}</p>
          : <div className="eyebrow text-smoke hidden md:block">{right}</div>
      )}
    </div>
  );
  if (wrapper) {
    return <div className="container-edge max-w-[100rem] mx-auto pt-24">{inner}</div>;
  }
  return inner;
}
