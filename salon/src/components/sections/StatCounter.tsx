import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import type { Stat } from '../../types';
import '../../styles/index.css'

interface StatCounterProps {
  stat: Stat;
}

export function StatCounter({ stat }: StatCounterProps) {
  const ref = useCounterAnimation({
    target: stat.target,
    suffix: stat.suffix,
    duration: 1200,
  });

  return (
    <div className="p-5 text-center">
      <div
        ref={ref}
        className="font-display text-[40px] font-bold leading-none bg-gradient-to-br from-rose-deep to-purple-500 bg-clip-text text-transparent"
      >
        0
      </div>
      <p className="text-[13px] text-salon-muted mt-1.5 font-medium">{stat.label}</p>
    </div>
  );
}
