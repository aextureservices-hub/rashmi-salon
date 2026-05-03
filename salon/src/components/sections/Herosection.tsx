import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  img: string;
  gradient: string;
  eyebrow: string;
  headline: [string, string];
  sub: string;
  emoji: string;
  badge: string;
}

// ─── Slide Data ───────────────────────────────────────────────────────────────
// To use real images, import them at the top and set them in the `img` field:
//   import heroImg1 from '../../assets/salon1.jpeg';
//   import heroImg2 from '../../assets/salon2.jpeg';
//   import heroImg3 from '../../assets/salon3.jpeg';
// Then replace img: '' with img: heroImg1, etc.

const SLIDES: Slide[] = [
  {
    img: 'https://lh3.googleusercontent.com/p/AF1QipOUdSYWqKy6FiIrgmw5IpPgp4N_FdswRi0bRmaq=s1360-w1360-h1020-rw',
    gradient: 'linear-gradient(135deg,#f9cce0 0%,#e8caf5 50%,#ffd6c0 100%)',
    eyebrow: 'Premium Beauty & Wellness',
    headline: ['Reveal Your', 'Radiance'],
    sub: 'Where artistry meets care — award-winning treatments designed for the modern woman.',
    emoji: '🌸',
    badge: '🏆 #1 Salon in City',
  },
  {
    img: 'https://lh3.googleusercontent.com/p/AF1QipMlB8c0PWPbI0QnyME-bMNYemNzlkxnX5KTzXF3=s1360-w1360-h1020-rw',
    gradient: 'linear-gradient(135deg,#cad5f9 0%,#e8caf5 50%,#f9cce0 100%)',
    eyebrow: 'Expert Hair & Styling',
    headline: ['Transform', 'Your Look'],
    sub: 'From balayage to bridal — our stylists craft the perfect look for every occasion.',
    emoji: '✂️',
    badge: '✨ 500+ Styles Done',
  },
  {
    img: 'https://lh3.googleusercontent.com/p/AF1QipMLI-yhtxgthcJmQirdRSszPrJ0wKT4V1ru_jW-=s1360-w1360-h1020-rw',
    gradient: 'linear-gradient(135deg,#ffd6c0 0%,#f9cce0 50%,#e8caf5 100%)',
    eyebrow: 'Spa & Skin Rituals',
    headline: ['Indulge in', 'Pure Luxury'],
    sub: 'Signature facials, body rituals, and nail artistry — all under one roof.',
    emoji: '💆‍♀️',
    badge: '💎 Premium Experience',
  },
];

const SLIDE_INTERVAL = 5500;

const SPARKLES = [
  { top: '12%', left: '8%',   right: undefined, delay: 0,   size: 18, icon: '✦' },
  { top: '22%', left: undefined, right: '12%',  delay: 0.8, size: 14, icon: '✿' },
  { top: '55%', left: '5%',   right: undefined, delay: 1.5, size: 12, icon: '✦' },
  { top: '70%', left: undefined, right: '7%',   delay: 0.4, size: 16, icon: '✿' },
  { top: '38%', left: undefined, right: '22%',  delay: 1.2, size: 10, icon: '✦' },
  { top: '80%', left: '18%',  right: undefined, delay: 2.0, size: 13, icon: '✿' },
];

const AVATAR_EMOJIS = ['🧖‍♀️', '💇‍♀️', '💅', '🌸'];

// ─── Animation Variants ───────────────────────────────────────────────────────
const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const bgVariants = {
  enter:  { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1,   transition: { duration: 1.2, ease: EASE_SMOOTH } },
  exit:   { opacity: 0,             transition: { duration: 0.55 } },
};

const cardVariants = {
  enter:  { opacity: 0, x: 28, scale: 0.97 },
  center: { opacity: 1, x: 0,  scale: 1,   transition: { duration: 0.65, delay: 0.1, ease: EASE_SMOOTH } },
  exit:   { opacity: 0, x: -20,            transition: { duration: 0.3 } },
};

const textVariants = {
  enter:  { opacity: 0, y: 22 },
  center: { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -12, transition: { duration: 0.28 } },
};

// ─── ImageCard ────────────────────────────────────────────────────────────────
function ImageCard({ slide, slideKey }: { slide: Slide; slideKey: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`card-${slideKey}`}
        className="relative flex-shrink-0"
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {/* Main frame */}
        <div
          className="w-full h-[420px] rounded-[28px] overflow-hidden relative"
          style={{ boxShadow: '0 32px 80px rgba(176,112,144,0.25), inset 0 1px 0 rgba(255,255,255,0.8)' }}
        >
          {slide.img ? (
            <img
              src={slide.img}
              alt={slide.eyebrow}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            /* Placeholder — remove once real images are added */
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.7)',
              }}
            >
              <div
                className="absolute inset-4 rounded-[20px] pointer-events-none opacity-30"
                style={{ border: '1px dashed rgba(176,112,144,0.6)' }}
              />
              <span className="text-[88px] relative z-10 select-none">{slide.emoji}</span>
            </div>
          )}

          {/* Bottom gradient scrim for images */}
          {slide.img && (
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(to top,rgba(45,27,46,0.3),transparent)' }}
            />
          )}
        </div>

        {/* Rating float */}
        <motion.div
          className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-[18px] px-4 py-3"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 12px 40px rgba(176,112,144,0.2)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-2xl">⭐</span>
          <div>
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: '#2d1b2e', fontFamily: "'Cormorant Garamond', serif" }}
            >
              4.9 / 5.0 Rating
            </p>
            <p className="text-[11px]" style={{ color: '#9d4c6f' }}>2,400+ happy clients</p>
          </div>
        </motion.div>

        {/* Slide badge */}
        <motion.div
          className="absolute top-5 -right-3 px-4 py-2 rounded-[14px] text-white text-[12px] font-semibold tracking-wide"
          style={{
            background: 'linear-gradient(135deg,#b07090,#9d4c6f)',
            boxShadow: '0 8px 24px rgba(176,112,144,0.45)',
            fontFamily: "'Jost', sans-serif",
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          {slide.badge}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── TextBlock ────────────────────────────────────────────────────────────────
function TextBlock({
  slide,
  slideKey,
  onBook,
  onServices,
}: {
  slide: Slide;
  slideKey: number;
  onBook: () => void;
  onServices: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* Eyebrow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`eyebrow-${slideKey}`}
          className="self-start inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-[12px] font-medium tracking-[0.15em] uppercase"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.65)',
            color: '#9d4c6f',
            fontFamily: "'Jost', sans-serif",
          }}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42 }}
        >
          <span className="text-base">{slide.emoji}</span>
          {slide.eyebrow}
        </motion.div>
      </AnimatePresence>

      {/* Headline */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={`h1-${slideKey}`}
          className="mb-5 leading-[1.07]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(42px, 5vw, 74px)',
            fontWeight: 400,
            color: '#2d1b2e',
          }}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.52, delay: 0.07 }}
        >
          {slide.headline[0]}
          <br />
          <em
            style={{
              background: 'linear-gradient(135deg,#b07090,#8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}
          >
            {slide.headline[1]}
          </em>
          <span style={{ WebkitTextFillColor: 'initial', color: '#2d1b2e' }}> ✨</span>
        </motion.h1>
      </AnimatePresence>

      {/* Subtitle */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`sub-${slideKey}`}
          className="mb-8 leading-relaxed max-w-[420px]"
          style={{
            fontSize: '15px',
            color: '#6b4a5e',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
          }}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, delay: 0.13 }}
        >
          {slide.sub}
        </motion.p>
      </AnimatePresence>

      {/* CTA Buttons */}
      <motion.div
        className="flex gap-4 flex-wrap mb-9"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, delay: 0.28 }}
      >
        <button
          onClick={onBook}
          className="px-8 py-3.5 rounded-full text-white text-[13px] font-medium tracking-[0.12em] uppercase cursor-pointer border-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#b07090,#9d4c6f)',
            boxShadow: '0 6px 24px rgba(176,112,144,0.45)',
            fontFamily: "'Jost', sans-serif",
          }}
        >
          Book Appointment 🌸
        </button>
        <button
          onClick={onServices}
          className="px-8 py-3.5 rounded-full text-[13px] font-medium tracking-[0.12em] uppercase cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
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

      {/* Trust strip */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.45 }}
      >
        <div className="flex -space-x-2.5">
          {AVATAR_EMOJIS.map((emoji, i) => (
            <span
              key={i}
              className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-sm"
              style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)' }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div>
          <p
            className="font-semibold leading-tight"
            style={{ color: '#2d1b2e', fontFamily: "'Cormorant Garamond', serif", fontSize: '15px' }}
          >
            2,400+ Happy Clients
          </p>
          <p className="text-[11px]" style={{ color: '#9d4c6f' }}>⭐ 4.9/5.0 · Trusted since 2018</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const goToSlide = useCallback((index: number) => setCurrent(index), []);
  const goNext    = useCallback(() => setCurrent(prev => (prev + 1) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  const slide = SLIDES[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        @keyframes sparkleFloat {
          0%,100% { transform:translateY(0) scale(1); opacity:0.5; }
          45%      { transform:translateY(-8px) scale(1.15); opacity:0.9; }
          70%      { transform:translateY(-4px) scale(0.96); opacity:0.7; }
        }
        @keyframes orbDrift1 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%     { transform:translate(28px,-18px) scale(1.06); }
          66%     { transform:translate(-18px,14px) scale(0.95); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0) scale(1); }
          40%     { transform:translate(-22px,18px) scale(1.05); }
          75%     { transform:translate(14px,-10px) scale(0.97); }
        }
        @keyframes scrollPulse {
          0%,100% { transform:translateY(0); opacity:1; }
          50%     { transform:translateY(8px); opacity:0.35; }
        }
        @keyframes progressFill {
          from { width:0%; }
          to   { width:100%; }
        }

        .sparkle-anim   { animation:sparkleFloat var(--dur,3s) ease-in-out infinite; }
        .orb-a          { animation:orbDrift1 9s ease-in-out infinite; }
        .orb-b          { animation:orbDrift2 11s ease-in-out infinite 1s; }
        .scroll-cue     { animation:scrollPulse 1.8s ease-in-out infinite; }
        .progress-fill  { animation:progressFill ${SLIDE_INTERVAL}ms linear forwards; }
      `}</style>

      <section
        id="home"
        aria-label="Hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${current}`}
            className="absolute inset-0 z-0"
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {slide.img ? (
              <img
                src={slide.img}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: slide.gradient }} />
            )}
            {/* Noise overlay */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Orbs */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="orb-a absolute w-[460px] h-[460px] rounded-full blur-[75px] opacity-[0.38] -top-20 -right-20"
            style={{ background: 'radial-gradient(circle,#f9a8c9,transparent 70%)' }}
          />
          <div
            className="orb-b absolute w-[360px] h-[360px] rounded-full blur-[75px] opacity-[0.32] -bottom-16 -left-14"
            style={{ background: 'radial-gradient(circle,#d8b4fe,transparent 70%)' }}
          />
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="sparkle-anim absolute select-none"
              style={{
                top:   s.top,
                left:  s.left,
                right: s.right,
                fontSize: s.size,
                '--dur': `${2.5 + i * 0.38}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties}
            >
              {s.icon}
            </span>
          ))}
        </div>

        {/* ── Main Grid: Image first, Text second ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-[130px] pb-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <ImageCard slide={slide} slideKey={current} />
          <TextBlock
            slide={slide}
            slideKey={current}
            onBook={() => navigate('/booking')}
            onServices={() => navigate('/services')}
          />
        </div>

        {/* Slide Indicators */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3"
          role="tablist"
          aria-label="Slides"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className="relative overflow-hidden h-[3px] rounded-full cursor-pointer border-none transition-all duration-300"
              style={{
                width: i === current ? '40px' : '20px',
                background: i === current ? 'transparent' : 'rgba(157,76,111,0.3)',
              }}
            >
              {i === current && (
                <span
                  key={`prog-${current}`}
                  className="progress-fill absolute inset-y-0 left-0 rounded-full"
                  style={{ background: '#b07090' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 right-[5%] z-10 flex flex-col items-center gap-2" aria-hidden="true">
          <div
            className="scroll-cue w-[1px] h-12"
            style={{ background: 'linear-gradient(to bottom,rgba(157,76,111,0.8),transparent)' }}
          />
          <span
            className="text-[10px] tracking-[3px] uppercase"
            style={{
              color: 'rgba(157,76,111,0.7)',
              fontFamily: "'Jost', sans-serif",
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}