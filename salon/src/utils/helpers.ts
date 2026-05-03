import { SALON_WHATSAPP } from './data';
import type { BookingDetails } from '../types';

// ─── Counter Animation ─────────────────────────────────────────────────────────
export function animateCount(
  el: HTMLElement,
  from: number,
  to: number,
  duration: number,
  suffix: string
): void {
  const start = Date.now();
  const tick = () => {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * ease) + (progress >= 1 ? suffix : '');
    if (progress < 1) requestAnimationFrame(tick);
  };
  tick();
}

// ─── WhatsApp Message Builder ──────────────────────────────────────────────────
export function buildWhatsAppMessage(details: BookingDetails): string {
  return encodeURIComponent(
    `🌸 *New Appointment Booking — Lumina Beauty Studio*\n\n` +
    `👤 *Name:* ${details.name}\n` +
    `📞 *Phone:* ${details.phone}\n` +
    `💅 *Service:* ${details.service}\n` +
    `📅 *Date:* ${details.dateLabel}\n` +
    `⏰ *Time:* ${details.time}\n` +
    `💰 *Price:* ${details.servicePrice}\n` +
    `📝 *Notes:* ${details.notes || 'None'}\n\n` +
    `Please confirm my appointment. Thank you! ✨`
  );
}

export function openWhatsApp(message: string, number: string = SALON_WHATSAPP): void {
  window.open(`https://wa.me/${number}?text=${message}`, '_blank');
}

// ─── Date Helpers ──────────────────────────────────────────────────────────────
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatDateLabel(day: number, month: number, year: number): string {
  return `${day} ${MONTH_NAMES[month]} ${year}`;
}

export function isDatePast(day: number, month: number, year: number): boolean {
  const today = new Date();
  const date = new Date(year, month, day);
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return date < todayMidnight;
}

export function isDateToday(day: number, month: number, year: number): boolean {
  const today = new Date();
  return (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );
}

// ─── Class Name Helper ─────────────────────────────────────────────────────────
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Scroll Progress ───────────────────────────────────────────────────────────
export function getScrollProgress(): number {
  const doc = document.documentElement;
  return (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
}
