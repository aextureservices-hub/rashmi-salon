import { cn } from '../../utils/helpers';
import { P } from '../../utils/palette';
import '../../styles/index.css';

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  gold?: boolean;
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  center = false,
  className,
  gold = false,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>

      {tag && (
        <p
          className={cn(
            'text-xs tracking-[3px] uppercase font-semibold mb-3',
            !gold && 'text-rose-deep'
          )}
          style={gold ? { color: P.gold } : undefined}
        >
          {tag}
        </p>
      )}

      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight mb-4',
          !gold && 'text-salon-text'
        )}
        style={
          gold
            ? {
                background: P.gradGold,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }
            : undefined
        }
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-base leading-relaxed max-w-[520px]',
            center && 'mx-auto',
            !gold && 'text-salon-muted'
          )}
          style={gold ? { color: P.textGoldMuted } : undefined}
        >
          {subtitle}
        </p>
      )}

    </div>
  );
}