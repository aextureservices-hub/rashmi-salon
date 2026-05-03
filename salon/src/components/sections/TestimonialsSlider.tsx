import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../utils/data';
import type { Testimonial } from '../../types';
import '../../styles/index.css';

const ACCENT_GRADIENTS = [
  'linear-gradient(135deg, #f9cce0, #e8caf5)',
  'linear-gradient(135deg, #ffd6c0, #f9cce0)',
  'linear-gradient(135deg, #e8caf5, #cad5f9)',
  'linear-gradient(135deg, #caf5e8, #cad5f9)',
];

const QUOTE_COLORS = ['#b07090', '#9d5b8b', '#7b6fb0', '#5b8b9d'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
          style={{
            color: i < rating ? '#e8935a' : '#e0c4b8',
            fontSize: '16px',
            filter: i < rating ? 'drop-shadow(0 1px 3px rgba(232,147,90,0.5))' : 'none',
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isActive,
}: {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
}) {
  const grad = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];
  const qColor = QUOTE_COLORS[index % QUOTE_COLORS.length];

  return (
    <div
      className="relative flex flex-col h-full"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* Giant decorative quote mark */}
      <span
        className="absolute -top-2 -left-1 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '100px',
          color: qColor,
          opacity: 0.12,
          lineHeight: 1,
        }}
      >
        "
      </span>

      {/* Card body */}
      <div
        className="relative z-10 rounded-[28px] p-7 h-full flex flex-col justify-between overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.95)',
          boxShadow: isActive
            ? '0 24px 60px rgba(176,112,144,0.22), 0 4px 16px rgba(176,112,144,0.1)'
            : '0 8px 30px rgba(176,112,144,0.08)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Top accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
          style={{ background: grad }}
        />

        {/* Stars */}
        <StarRating rating={testimonial.rating} />

        {/* Text */}
        <p
          className="flex-1 leading-relaxed mb-6 relative z-10"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '17px',
            fontStyle: 'italic',
            color: '#3d1b2e',
            lineHeight: 1.75,
          }}
        >
          "{testimonial.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3.5 pt-4" style={{ borderTop: '1px solid rgba(176,112,144,0.12)' }}>
          <div
            className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: grad,
              boxShadow: '0 4px 12px rgba(176,112,144,0.25)',
            }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <p
              className="font-semibold text-sm"
              style={{ color: '#2d1b2e', fontFamily: "'Jost', sans-serif", letterSpacing: '0.02em' }}
            >
              {testimonial.authorName}
            </p>
            <p
              className="text-[11px] tracking-[0.1em] uppercase mt-0.5"
              style={{ color: qColor }}
            >
              {testimonial.authorRole}
            </p>
          </div>
          {/* Verified badge */}
          <div
            className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide"
            style={{
              background: 'linear-gradient(135deg,#f9cce0,#e8caf5)',
              color: '#9d4c6f',
              fontFamily: "'Jost', sans-serif",
            }}
          >
            ✓ Verified
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(c => (c + 1) % total);
    }, 4000);
  };

  useEffect(() => {
    if (!paused) startInterval();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, total]);

  const goTo = (i: number) => {
    setActive(i);
    startInterval(); // reset timer on manual nav
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        @keyframes tm-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .tm-progress-bar { animation: tm-progress 4s linear forwards; }
      `}</style>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Desktop: 2-up + featured center layout ── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 items-stretch">
            {TESTIMONIALS.slice(0, 3).map((t, i) => {
              const isCenter = i === 1;
              return (
                <motion.div
                  key={t.id}
                  animate={{
                    scale: isCenter ? 1.03 : 0.97,
                    y: isCenter ? -6 : 0,
                    opacity: isCenter ? 1 : 0.78,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="cursor-pointer"
                  onClick={() => goTo(i)}
                >
                  <TestimonialCard testimonial={t} index={i} isActive={isCenter} />
                </motion.div>
              );
            })}
          </div>

          {/* 4th card centered below */}
          {TESTIMONIALS.length > 3 && (
            <div className="mt-6 max-w-[420px] mx-auto">
              <TestimonialCard testimonial={TESTIMONIALS[3]} index={3} isActive={false} />
            </div>
          )}
        </div>

        {/* ── Mobile: single animated card ── */}
        <div className="md:hidden relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TestimonialCard
                testimonial={TESTIMONIALS[active]}
                index={active}
                isActive
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot indicators + progress ── */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Review ${i + 1}`}
              className="relative overflow-hidden rounded-full cursor-pointer border-none transition-all duration-400"
              style={{
                height: '4px',
                width: i === active ? '36px' : '14px',
                background: i === active ? 'transparent' : 'rgba(176,112,144,0.25)',
              }}
            >
              {i === active && (
                <span
                  key={`prog-${active}-${paused}`}
                  className={`absolute inset-y-0 left-0 rounded-full ${!paused ? 'tm-progress-bar' : ''}`}
                  style={{
                    background: 'linear-gradient(90deg,#b07090,#9d4c6f)',
                    width: paused ? '100%' : undefined,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Arrow controls ── */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={() => goTo((active - 1 + total) % total)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-x-0.5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(176,112,144,0.3)',
              color: '#9d4c6f',
              boxShadow: '0 2px 12px rgba(176,112,144,0.12)',
            }}
            aria-label="Previous"
          >
            ←
          </button>
          <span
            className="text-xs tracking-[0.18em] uppercase"
            style={{ color: 'rgba(157,76,111,0.6)', fontFamily: "'Jost', sans-serif" }}
          >
            {active + 1} / {total}
          </span>
          <button
            onClick={() => goTo((active + 1) % total)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:translate-x-0.5"
            style={{
              background: 'linear-gradient(135deg,#b07090,#9d4c6f)',
              border: 'none',
              color: 'white',
              boxShadow: '0 4px 16px rgba(176,112,144,0.4)',
            }}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}