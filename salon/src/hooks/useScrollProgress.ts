import { useState, useEffect } from 'react';
import { getScrollProgress } from '../utils/helpers';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setProgress(getScrollProgress());
      setIsScrolled(document.documentElement.scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, isScrolled };
}
