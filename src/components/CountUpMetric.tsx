import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CountUpMetricProps {
  target: number;
  start?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export function CountUpMetric({
  target,
  start = 0,
  prefix = '',
  suffix = '',
  durationMs = 950,
}: CountUpMetricProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : start);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      setValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, start, durationMs, prefersReducedMotion]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
