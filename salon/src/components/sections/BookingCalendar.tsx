import { useCalendar } from '../../hooks/useCalendar';
import { cn } from '../../utils/helpers';
import '../../styles/index.css'

interface BookingCalendarProps {
  selectedDateLabel?: string;
  onSelectDate: (label: string, iso: string) => void;
}

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function BookingCalendar({ selectedDateLabel, onSelectDate }: BookingCalendarProps) {
  const { monthLabel, changeMonth, getDays, getDateLabel, getDateISO, isSelected } = useCalendar(selectedDateLabel);
  const days = getDays();

  return (
    <div>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => changeMonth(-1)}
          className="w-8 h-8 rounded-full border-[1.5px] border-rose-deep/30 bg-white flex items-center justify-center text-rose-deep cursor-pointer hover:bg-rose-deep hover:text-white transition-all duration-300"
        >
          ←
        </button>
        <h4 className="font-display text-lg font-semibold text-salon-text">{monthLabel}</h4>
        <button
          onClick={() => changeMonth(1)}
          className="w-8 h-8 rounded-full border-[1.5px] border-rose-deep/30 bg-white flex items-center justify-center text-rose-deep cursor-pointer hover:bg-rose-deep hover:text-white transition-all duration-300"
        >
          →
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs text-salon-muted font-medium">{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          if (day.isEmpty) return <div key={`empty-${idx}`} />;

          const dateLabel = getDateLabel(day.day);
          const dateISO = getDateISO(day.day);
          const selected = isSelected(day.day);

          return (
            <button
              key={day.day}
              disabled={day.isPast}
              onClick={() => !day.isPast && onSelectDate(dateLabel, dateISO)}
              className={cn(
                'w-full aspect-square rounded-xl flex items-center justify-center text-sm cursor-pointer transition-all duration-300 border-[1.5px] border-transparent',
                day.isPast && 'text-salon-muted/30 cursor-default',
                day.isToday && !selected && 'border-rose-deep font-semibold',
                selected
                  ? 'bg-gradient-to-br from-rose-deep to-rose-darker text-white border-transparent'
                  : !day.isPast && 'hover:bg-rose-soft/20 hover:border-rose-soft'
              )}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
