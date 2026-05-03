import { useEffect, useRef } from 'react';
import { animateCount } from '../utils/helpers';
import { useIntersectionObserver } from './useIntersectionObserver';

interface CounterOptions {
  target: number;
  suffix: string;
  duration?: number;
}

export function useCounterAnimation({ target, suffix, duration = 1200 }: CounterOptions) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current && ref.current) {
      hasAnimated.current = true;
      animateCount(ref.current, 0, target, duration, suffix);
    }
  }, [isVisible, target, suffix, duration, ref]);

  return ref;
}
