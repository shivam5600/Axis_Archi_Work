'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function Reveal({
  as: Tag = 'div',
  variant = 'fade',
  delay = 0,
  threshold = 0.18,
  once = true,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-in'), delay);
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove('is-in');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, threshold, once]);

  const cls = variant === 'mask' ? 'reveal-mask' : 'fade-up';

  return (
    <Tag ref={ref} className={clsx(cls, className)} {...rest}>
      {variant === 'mask' ? <div className="block-inner">{children}</div> : children}
    </Tag>
  );
}
