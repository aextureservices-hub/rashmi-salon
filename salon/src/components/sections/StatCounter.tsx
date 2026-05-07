import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import type { Stat } from '../../types';
import { P } from '../../utils/palette';
import '../../styles/index.css';

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
    <div
      className="p-5 text-center group"
      style={{
        borderRadius: '16px',
        border: `1px solid ${P.border}`,
        background: P.cardBg,
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = P.borderHot;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${P.glowGold}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = P.border;
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Animated number */}
      <div
        ref={ref}
        className="font-display text-[42px] font-bold leading-none"
        style={{
          background: P.gradGold,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 12px rgba(212,169,106,0.35))',
        }}
      >
        0
      </div>

      {/* Divider */}
      <div
        className="mx-auto my-2.5"
        style={{
          height: '1px',
          width: '32px',
          background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`,
        }}
      />

      {/* Label */}
      <p
        className="text-[13px] font-medium tracking-wide"
        style={{ color: P.textGoldMuted }}
      >
        {stat.label}
      </p>
    </div>
  );
}