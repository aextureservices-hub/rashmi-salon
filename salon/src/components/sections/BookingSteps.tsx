import { cn } from '../../utils/helpers';
import type { BookingStep } from '../../types';
import '../../styles/index.css'

interface BookingStepsProps {
  currentStep: BookingStep;
}

const STEPS = [
  { num: 1 as BookingStep, label: 'Service' },
  { num: 2 as BookingStep, label: 'Date' },
  { num: 3 as BookingStep, label: 'Time' },
  { num: 4 as BookingStep, label: 'Details' },
];

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex justify-center mb-10 relative">
      {STEPS.map((step, idx) => {
        const isDone = step.num < currentStep;
        const isActive = step.num === currentStep;

        return (
          <div key={step.num} className="flex flex-col items-center gap-2 flex-1 relative">
            {idx < STEPS.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-rose-deep/20 z-0" />
            )}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-[1] transition-all duration-300 border-2',
                isActive || isDone
                  ? 'bg-gradient-to-br from-rose-deep to-rose-darker text-white border-transparent shadow-[0_4px_15px_rgba(232,125,170,0.4)]'
                  : 'bg-rose-deep/15 text-salon-muted border-rose-deep/20'
              )}
            >
              {isDone ? '✓' : step.num}
            </div>
            <span
              className={cn(
                'text-[11px] font-medium',
                isActive ? 'text-rose-deep' : 'text-salon-muted'
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
