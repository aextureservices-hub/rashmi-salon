import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Slide Data ───────────────────────────────────────────────────────────────
// Replace these placeholder gradient slides with your actual salon images:
// import heroImg1 from '../../assets/salon1.jpeg'
// import heroImg2 from '../../assets/salon2.jpeg'
// import heroImg3 from '../../assets/salon3.jpeg'

const SLIDES = [
  {
    // img: heroImg1,
    gradient: 'linear-gradient(135deg,#f9cce0 0%,#e8caf5 50%,#ffd6c0 100%)',
    eyebrow: 'Premium Beauty & Wellness',
    headline: ['Reveal Your', 'Radiance'],
    accent: 'Radiance',
    sub: 'Where artistry meets care — award-winning treatments designed for the modern woman.',
    emoji: '🌸',
  },
  {
    // img: heroImg2,
    gradient: 'linear-gradient(135deg,#cad5f9 0%,#e8caf5 50%,#f9cce0 100%)',
    eyebrow: 'Expert Hair & Styling',
    headline: ['Transform', 'Your Look'],
    accent: 'Your Look',
    sub: 'From balayage to bridal — our stylists craft the perfect look for every occasion.',
    emoji: '✂️',
  },
  {
    // img: heroImg3,
    gradient: 'linear-gradient(135deg,#ffd6c0 0%,#f9cce0 50%,#e8caf5 100%)',
    eyebrow: 'Spa & Skin Rituals',
    headline: ['Indulge in', 'Pure Luxury'],
    accent: 'Pure Luxury',
    sub: 'Signature facials, body rituals, and nail artistry — all under one roof.',
    emoji: '💆‍♀️',
  },
];

// ─── Particle Sparkles ────────────────────────────────────────────────────────
const SPARKLES = [
  { top: '12%', left: '8%', delay: 0, size: 18 },
  { top: '22%', right: '12%', delay: 0.8, size: 14 },
  { top: '55%', left: '5%', delay: 1.5, size: 12 },
  { top: '70%', right: '7%', delay: 0.4, size: 16 },
  { top: '38%', right: '22%', delay: 1.2, size: 10 },
  { top: '80%', left: '18%', delay: 2, size: 13 },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(t);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        @keyframes sparkleFloat {
          0%,100% { transform:translateY(0) scale(1); opacity:0.5; }
          40% { transform:translateY(-8px) scale(1.15); opacity:0.9; }
          70% { transform:translateY(-4px) scale(0.95); opacity:0.7; }
        }
        @keyframes orb1 {
          0%,100% { transform:translate(0,0) scale(1); }
          33% { transform:translate(30px,-20px) scale(1.07); }
          66% { transform:translate(-20px,15px) scale(0.95); }
        }
        @keyframes orb2 {
          0%,100% { transform:translate(0,0) scale(1); }
          40% { transform:translate(-25px,20px) scale(1.05); }
          75% { transform:translate(15px,-10px) scale(0.97); }
        }
        @keyframes scrollPulse {
          0%,100% { transform:translateY(0); opacity:1; }
          50% { transform:translateY(8px); opacity:0.4; }
        }
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .sparkle-float { animation: sparkleFloat var(--dur,3s) ease-in-out infinite; }
        .orb-1 { animation: orb1 9s ease-in-out infinite; }
        .orb-2 { animation: orb2 11s ease-in-out infinite 1s; }
        .scroll-pulse { animation: scrollPulse 1.8s ease-in-out infinite; }
        .slide-progress { animation: slideProgress 5.5s linear forwards; }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* ── Background Slide (image or gradient) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Swap to <img src={slide.img} ... /> when you have real photos */}
            <div className="absolute inset-0" style={{ background: slide.gradient }} />
            {/* Noise texture overlay for depth */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Ambient Orbs ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="orb-1 absolute w-[480px] h-[480px] rounded-full blur-[80px] opacity-40 -top-24 -right-24"
            style={{ background: 'radial-gradient(circle, #f9a8c9, transparent 70%)' }} />
          <div className="orb-2 absolute w-[380px] h-[380px] rounded-full blur-[80px] opacity-35 -bottom-20 -left-16"
            style={{ background: 'radial-gradient(circle, #d8b4fe, transparent 70%)' }} />
        </div>

        {/* ── Floating Sparkles ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="sparkle-float absolute select-none"
              style={{
                top: s.top,
                left: (s as any).left,
                right: (s as any).right,
                fontSize: s.size,
                '--dur': `${2.5 + i * 0.4}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties}
            >
              {i % 2 === 0 ? '✦' : '✿'}
            </span>
          ))}
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-[130px] pb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Eyebrow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`eyebrow-${current}`}
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-[12px] border border-white/60 px-5 py-2 rounded-full text-[12px] font-medium tracking-[0.15em] uppercase mb-6"
                style={{ color: '#9d4c6f', fontFamily: "'Jost', sans-serif" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-base">{slide.emoji}</span>
                {slide.eyebrow}
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`h1-${current}`}
                className="mb-6 leading-[1.08]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(44px, 5.5vw, 76px)',
                  fontWeight: 400,
                  color: '#2d1b2e',
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                {slide.headline[0]}<br />
                <em style={{
                  background: 'linear-gradient(135deg, #b07090, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic',
                }}>
                  {slide.headline[1]}
                </em>
                <span style={{ WebkitTextFillColor: 'initial', color: '#2d1b2e' }}> ✨</span>
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                className="mb-9 leading-relaxed max-w-[420px]"
                style={{ fontSize: '15px', color: '#6b4a5e', fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                {slide.sub}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <button
                onClick={() => navigate('/booking')}
                className="relative overflow-hidden px-8 py-3.5 rounded-full text-white text-[13px] font-medium tracking-[0.12em] uppercase cursor-pointer border-none transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #b07090, #9d4c6f)',
                  boxShadow: '0 6px 24px rgba(176,112,144,0.45)',
                  fontFamily: "'Jost', sans-serif",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 36px rgba(176,112,144,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(176,112,144,0.45)')}
              >
                Book Appointment 🌸
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-8 py-3.5 rounded-full text-[13px] font-medium tracking-[0.12em] uppercase cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(176,112,144,0.35)',
                  color: '#9d4c6f',
                  fontFamily: "'Jost', sans-serif",
                  boxShadow: '0 4px 16px rgba(176,112,144,0.12)',
                }}
              >
                Explore Services
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-5 mt-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="flex -space-x-2.5">
                {['🧖‍♀️','💇‍♀️','💅','🌸'].map((e, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-sm"
                    style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#2d1b2e', fontFamily: "'Cormorant Garamond', serif", fontSize: '15px' }}>2,400+ Happy Clients</p>
                <p className="text-[11px]" style={{ color: '#9d4c6f' }}>⭐ 4.9/5.0 · Trusted since 2018</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${current}`}
              className="relative"
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Main visual frame */}
              <div
                className="w-full h-[440px] rounded-[32px] flex items-center justify-center text-[90px] relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 32px 80px rgba(176,112,144,0.22), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                {/* Decorative inner ring */}
                <div
                  className="absolute inset-4 rounded-[24px] opacity-30 pointer-events-none"
                  style={{ border: '1px dashed rgba(176,112,144,0.6)' }}
                />
                <span className="relative z-10">{slide.emoji}</span>
              </div>

              {/* Rating float card */}
              <motion.div
                className="absolute -bottom-5 -left-6 rounded-[18px] p-4 flex items-center gap-3"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 12px 40px rgba(176,112,144,0.18)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#2d1b2e', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px' }}>4.9 / 5.0 Rating</p>
                  <p className="text-[11px]" style={{ color: '#9d4c6f' }}>2,400+ happy clients</p>
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                className="absolute top-5 -right-3 px-5 py-2.5 rounded-[16px] text-white text-[12px] font-semibold tracking-wide"
                style={{
                  background: 'linear-gradient(135deg,#b07090,#9d4c6f)',
                  boxShadow: '0 8px 24px rgba(176,112,144,0.45)',
                  fontFamily: "'Jost', sans-serif",
                }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                🏆 #1 Salon in City
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Slide Indicators with Progress ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i); }}
              aria-label={`Slide ${i + 1}`}
              className="relative overflow-hidden h-[3px] rounded-full cursor-pointer border-none transition-all duration-400"
              style={{
                width: i === current ? '40px' : '20px',
                background: i === current ? 'transparent' : 'rgba(157,76,111,0.3)',
              }}
            >
              {i === current && (
                <span
                  key={`prog-${current}`}
                  className="slide-progress absolute inset-y-0 left-0 rounded-full"
                  style={{ background: '#b07090' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Scroll Cue ── */}
        <div className="absolute bottom-8 right-[5%] z-10 flex flex-col items-center gap-2">
          <div
            className="scroll-pulse w-[1px] h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(157,76,111,0.8), transparent)' }}
          />
          <span
            className="text-[10px] tracking-[3px] uppercase"
            style={{ color: 'rgba(157,76,111,0.7)', fontFamily: "'Jost', sans-serif", writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}