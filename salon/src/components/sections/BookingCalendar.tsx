import { useCalendar } from '../../hooks/useCalendar';

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
          style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1.5px solid rgba(212,169,106,0.35)',
            background: 'transparent',
            color: '#d4a96a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 16,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,169,106,0.15)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#d4a96a';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,169,106,0.35)';
          }}
        >
          ←
        </button>

        {/* ── Golden month/year label ── */}
        <h4 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20,
          fontWeight: 600,
          background: 'linear-gradient(135deg, #e8c88a 0%, #d4a96a 45%, #b8860b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.5px',
        }}>
          {monthLabel}
        </h4>

        <button
          onClick={() => changeMonth(1)}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1.5px solid rgba(212,169,106,0.35)',
            background: 'transparent',
            color: '#d4a96a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 16,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,169,106,0.15)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#d4a96a';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,169,106,0.35)';
          }}
        >
          →
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAY_LABELS.map(d => (
          <div
            key={d}
            className="text-center text-xs font-medium"
            style={{ color: 'rgba(212,169,106,0.5)', letterSpacing: '1px' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          if (day.isEmpty) return <div key={`empty-${idx}`} />;

          const dateLabel = getDateLabel(day.day);
          const dateISO   = getDateISO(day.day);
          const selected  = isSelected(day.day);

          return (
            <button
              key={day.day}
              disabled={day.isPast}
              onClick={() => !day.isPast && onSelectDate(dateLabel, dateISO)}
              style={{
                width: '100%', aspectRatio: '1',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13,
                cursor: day.isPast ? 'default' : 'pointer',
                transition: 'all 0.25s ease',
                border: selected
                  ? 'none'
                  : day.isToday
                  ? '1.5px solid #d4a96a'
                  : '1.5px solid transparent',
                background: selected
                  ? 'linear-gradient(135deg, #e8c88a 0%, #d4a96a 45%, #b8860b 100%)'
                  : 'transparent',
                color: selected
                  ? '#1c0f1a'
                  : day.isPast
                  ? 'rgba(212,169,106,0.2)'
                  : day.isToday
                  ? '#e8c88a'
                  : '#d4a96a',
                fontWeight: selected || day.isToday ? 700 : 400,
              }}
              onMouseEnter={e => {
                if (!day.isPast && !selected) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,169,106,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,169,106,0.4)';
                }
              }}
              onMouseLeave={e => {
                if (!day.isPast && !selected) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = day.isToday ? '#d4a96a' : 'transparent';
                }
              }}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}