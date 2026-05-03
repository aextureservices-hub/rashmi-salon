import { useState, useCallback } from 'react';
import { MONTH_NAMES, formatDateLabel, isDatePast, isDateToday } from '../utils/helpers';

export interface CalendarDay {
  day: number;
  isPast: boolean;
  isToday: boolean;
  isEmpty: boolean;
}

export function useCalendar(selectedDateLabel?: string) {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  const monthLabel = `${MONTH_NAMES[calMonth]} ${calYear}`;

  const changeMonth = useCallback((dir: -1 | 1) => {
    setCalMonth(prev => {
      const next = prev + dir;
      if (next < 0) { setCalYear(y => y - 1); return 11; }
      if (next > 11) { setCalYear(y => y + 1); return 0; }
      return next;
    });
  }, []);

  const getDays = useCallback((): CalendarDay[] => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const days: CalendarDay[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, isPast: false, isToday: false, isEmpty: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        isPast: isDatePast(d, calMonth, calYear),
        isToday: isDateToday(d, calMonth, calYear),
        isEmpty: false,
      });
    }
    return days;
  }, [calMonth, calYear]);

  const getDateLabel = useCallback((day: number) => {
    return formatDateLabel(day, calMonth, calYear);
  }, [calMonth, calYear]);

  const getDateISO = useCallback((day: number) => {
    return `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }, [calMonth, calYear]);

  const isSelected = useCallback((day: number): boolean => {
    return selectedDateLabel === formatDateLabel(day, calMonth, calYear);
  }, [selectedDateLabel, calMonth, calYear]);

  return { monthLabel, changeMonth, getDays, getDateLabel, getDateISO, isSelected };
}
