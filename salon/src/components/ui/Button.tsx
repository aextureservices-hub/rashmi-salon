import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/helpers';
import '../../styles/index.css'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'sm' | 'back' | 'next' | 'whatsapp';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-rose-deep to-rose-darker text-white px-8 py-3.5 rounded-full font-semibold text-[15px] tracking-[0.3px] shadow-[0_6px_25px_rgba(232,125,170,0.45)] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(232,125,170,0.55)] transition-all duration-300',
  outline:
    'bg-transparent text-rose-deep border-2 border-rose-deep/50 px-8 py-3.5 rounded-full font-semibold text-[15px] hover:bg-rose-soft/15 hover:-translate-y-0.5 transition-all duration-300',
  ghost:
    'bg-transparent text-salon-muted border border-rose-deep/30 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-rose-soft/10 transition-all duration-300',
  sm:
    'bg-gradient-to-br from-rose-deep to-rose-darker text-white px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 hover:shadow-[0_4px_15px_rgba(232,125,170,0.4)] transition-all duration-300',
  back:
    'bg-transparent text-salon-muted border-[1.5px] border-rose-deep/30 px-6 py-3 rounded-full text-sm font-semibold hover:bg-rose-soft/10 transition-all duration-300',
  next:
    'bg-gradient-to-br from-rose-deep to-rose-darker text-white px-7 py-3 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(232,125,170,0.4)] transition-all duration-300',
  whatsapp:
    'bg-gradient-to-br from-wa-green to-wa-dark text-white px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-3 shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] transition-all duration-300',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(variantStyles[variant], fullWidth && 'w-full', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
