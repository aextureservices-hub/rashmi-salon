import { cn } from '../../utils/helpers';
import '../../styles/index.css'

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({ tag, title, subtitle, center = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      {tag && (
        <p className="text-xs tracking-[3px] uppercase text-rose-deep font-semibold mb-3">
          {tag}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight text-salon-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base text-salon-muted leading-relaxed max-w-[520px]',
            center && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
