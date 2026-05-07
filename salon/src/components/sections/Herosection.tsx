import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from "../../assets/image1.jpg"
import image2 from '../../assets/bride.jpg'
import image3 from '../../assets/bride2.jpeg'

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Slide {
  img: string;
  eyebrow: string;
  headline: [string, string];
  sub: string;
  emoji: string;
  badge: string;
  accent: string;
}

// ─── Slide Data ────────────────────────────────────────────────────────────────
const SLIDES: Slide[] = [
  {
    img: image1,
    eyebrow: 'Premium Beauty & Wellness',
    headline: ['Reveal Your', 'Radiance'],
    sub: 'Where artistry meets care — award-winning treatments designed for the modern woman.',
    emoji: '🌸',
    badge: '🏆 #1 Salon in City',
    accent: '#e8527a',
  },
  {
    img: image2,
    eyebrow: 'Expert Hair & Styling',
    headline: ['Transform', 'Your Look'],
    sub: 'From balayage to bridal — our stylists craft the perfect look for every occasion.',
    emoji: '✂️',
    badge: '✨ 500+ Styles Done',
    accent: '#d44070',
  },
  {
    img: image3,
    eyebrow: 'Spa & Skin Rituals',
    headline: ['Indulge in', 'Pure Luxury'],
    sub: 'Signature facials, body rituals, and nail artistry — all under one roof.',
    emoji: '💆‍♀️',
    badge: '💎 Premium Experience',
    accent: '#c73468',
  },
];

const SLIDE_INTERVAL = 5500;

const SPARKLES = [
  { top: '14%', left: '7%',    right: undefined, delay: 0,   size: 16, icon: '✦' },
  { top: '24%', left: undefined, right: '10%',   delay: 0.8, size: 12, icon: '✿' },
  { top: '58%', left: '4%',    right: undefined, delay: 1.5, size: 11, icon: '✦' },
  { top: '72%', left: undefined, right: '6%',    delay: 0.4, size: 14, icon: '✿' },
  { top: '40%', left: undefined, right: '21%',   delay: 1.2, size: 9,  icon: '✦' },
  { top: '82%', left: '16%',   right: undefined, delay: 2.0, size: 12, icon: '✿' },
];

const AVATAR_EMOJIS = ['🧖‍♀️', '💇‍♀️', '💅', '🌸'];

// ─── Animation Variants ────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const bgVariants = {
  enter:  { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1,   transition: { duration: 1.4, ease: EASE } },
  exit:   { opacity: 0,             transition: { duration: 0.6 } },
};

const cardVariants = {
  enter:  { opacity: 0, x: 36, scale: 0.96 },
  center: { opacity: 1, x: 0,  scale: 1,   transition: { duration: 0.7, delay: 0.1, ease: EASE } },
  exit:   { opacity: 0, x: -24,            transition: { duration: 0.32 } },
};

const textVariants = {
  enter:  { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -14, transition: { duration: 0.28 } },
};

// ─── ImageCard ─────────────────────────────────────────────────────────────────
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
        {/* Decorative ring behind card */}
        <div
          className="absolute -inset-3 rounded-[36px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(232,82,122,0.18), rgba(195,30,80,0.10))',
            border: '1px solid rgba(232,82,122,0.22)',
            filter: 'blur(1px)',
          }}
        />

        {/* Main frame */}
        <div
          className="relative w-full h-[440px] rounded-[28px] overflow-hidden"
          style={{
            boxShadow: '0 40px 100px rgba(180,30,70,0.35), 0 8px 32px rgba(180,30,70,0.18), inset 0 1px 0 rgba(255,255,255,0.55)',
          }}
        >
          {slide.img ? (
            <img
              src={slide.img}
              alt={slide.eyebrow}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'rgba(180,30,70,0.12)' }}
            >
              <span className="text-[88px] select-none">{slide.emoji}</span>
            </div>
          )}

          {/* Rose-pink image tint overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(160deg, rgba(195,30,80,0.22) 0%, rgba(130,10,50,0.38) 100%)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* Bottom scrim */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(90,10,35,0.55), transparent)' }}
          />

          {/* Inner glow frame */}
          <div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(232,82,122,0.28)' }}
          />
        </div>

        {/* Rating float — glass card */}
        <motion.div
          className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-[20px] px-4 py-3"
          style={{
            background: 'rgba(255,240,245,0.88)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(232,82,122,0.28)',
            boxShadow: '0 16px 48px rgba(180,30,70,0.22), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.44 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg,#e8527a,#c73468)', boxShadow: '0 4px 14px rgba(199,52,104,0.45)' }}
          >
            ⭐
          </div>
          <div>
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: '#3d0d1e', fontFamily: "'Playfair Display', serif" }}
            >
              4.9 / 5.0 Rating
            </p>
            <p className="text-[11px]" style={{ color: '#c73468', fontFamily: "'Outfit', sans-serif" }}>
              2,400+ happy clients
            </p>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          className="absolute top-5 -left-3 px-3 py-2 rounded-[10px] text-white text-[10px] font-semibold tracking-wider uppercase"
          style={{
            background: 'linear-gradient(135deg,#e8527a,#a81845)',
            boxShadow: '0 10px 28px rgba(168,24,69,0.55)',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.1em',
          }}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.48, duration: 0.42 }}
        >
          {slide.badge}
        </motion.div>

        {/* Floating accent pill — top right */}
        <motion.div
          className="absolute -top-3 right-6 px-4 py-1.5 rounded-full text-[11px] font-medium"
          style={{
            background: 'rgba(255,240,245,0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(232,82,122,0.3)',
            color: '#a81845',
            fontFamily: "'Outfit', sans-serif",
            boxShadow: '0 4px 20px rgba(180,30,70,0.18)',
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          ✦ Trusted since 2018
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── TextBlock ─────────────────────────────────────────────────────────────────
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
      {/* Eyebrow pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`eyebrow-${slideKey}`}
          className="self-start inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
          style={{
            background: 'rgba(255,240,245,0.18)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(232,82,122,0.38)',
            color: '#ffd6e7',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42 }}
        >
          <span style={{ fontSize: '14px' }}>{slide.emoji}</span>
          {slide.eyebrow}
        </motion.div>
      </AnimatePresence>

      {/* Headline */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={`h1-${slideKey}`}
          className="mb-5 leading-[1.05]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(46px, 5.2vw, 78px)',
            fontWeight: 400,
            color: '#fff5f8',
            textShadow: '0 2px 24px rgba(100,0,30,0.45)',
          }}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.54, delay: 0.07 }}
        >
          {slide.headline[0]}
          <br />
          <em
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(120deg, #ffb3cc 0%, #ff6b9d 40%, #e8527a 80%, #ffd6e7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 12px rgba(232,82,122,0.6))',
            }}
          >
            {slide.headline[1]}
          </em>
        </motion.h1>
      </AnimatePresence>

      {/* Decorative rule */}
      <motion.div
        className="mb-6 h-px w-16 rounded-full"
        style={{ background: 'linear-gradient(90deg,rgba(232,82,122,0.9),transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Subtitle */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`sub-${slideKey}`}
          className="mb-9 leading-relaxed max-w-[420px]"
          style={{
            fontSize: '15.5px',
            color: 'rgba(255,220,232,0.92)',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.03em',
            textShadow: '0 1px 8px rgba(80,0,20,0.4)',
          }}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.44, delay: 0.13 }}
        >
          {slide.sub}
        </motion.p>
      </AnimatePresence>

      {/* CTA Buttons */}
      <motion.div
        className="flex gap-4 flex-wrap mb-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Primary CTA */}
        <button
          onClick={onBook}
          className="relative group px-8 py-3.5 rounded-full text-white overflow-hidden cursor-pointer border-none"
          style={{
            background: 'linear-gradient(135deg,#e8527a 0%,#a81845 100%)',
            boxShadow: '0 8px 32px rgba(168,24,69,0.55), inset 0 1px 0 rgba(255,255,255,0.22)',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12.5px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            transition: 'all 0.22s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 44px rgba(168,24,69,0.65), inset 0 1px 0 rgba(255,255,255,0.22)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(168,24,69,0.55), inset 0 1px 0 rgba(255,255,255,0.22)';
          }}
        >
          Book Appointment 🌸
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onServices}
          className="px-8 py-3.5 rounded-full cursor-pointer"
          style={{
            background: 'rgba(255,240,245,0.12)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(232,82,122,0.45)',
            color: '#ffd6e7',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12.5px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 20px rgba(180,30,70,0.14), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'all 0.22s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,240,245,0.2)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,240,245,0.12)';
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
        transition={{ delay: 0.52, duration: 0.48 }}
      >
        <div className="flex -space-x-2.5">
          {AVATAR_EMOJIS.map((emoji, i) => (
            <span
              key={i}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm"
              style={{
                borderColor: 'rgba(232,82,122,0.5)',
                background: 'rgba(255,240,245,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div>
          <p
            className="font-semibold leading-tight"
            style={{
              color: '#fff5f8',
              fontFamily: "'Playfair Display', serif",
              fontSize: '15px',
              textShadow: '0 1px 6px rgba(100,0,30,0.3)',
            }}
          >
            2,400+ Happy Clients
          </p>
          <p
            style={{
              color: 'rgba(255,180,205,0.85)',
              fontSize: '11px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            ⭐ 4.9 / 5.0 · Trusted since 2018
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── HeroSection ───────────────────────────────────────────────────────────────
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes sparkleFloat {
          0%,100% { transform:translateY(0) scale(1); opacity:0.45; }
          45%      { transform:translateY(-9px) scale(1.18); opacity:0.85; }
          70%      { transform:translateY(-4px) scale(0.95); opacity:0.65; }
        }
        @keyframes orbDrift1 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%     { transform:translate(30px,-20px) scale(1.07); }
          66%     { transform:translate(-20px,15px) scale(0.94); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0) scale(1); }
          40%     { transform:translate(-24px,20px) scale(1.06); }
          75%     { transform:translate(16px,-12px) scale(0.96); }
        }
        @keyframes orbDrift3 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%     { transform:translate(12px, 18px) scale(1.04); }
        }
        @keyframes scrollPulse {
          0%,100% { transform:translateY(0); opacity:1; }
          50%     { transform:translateY(8px); opacity:0.32; }
        }
        @keyframes progressFill {
          from { width:0%; }
          to   { width:100%; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .sparkle-anim  { animation: sparkleFloat var(--dur,3s) ease-in-out infinite; color: rgba(255,180,210,0.7); }
        .orb-a         { animation: orbDrift1 9s ease-in-out infinite; }
        .orb-b         { animation: orbDrift2 11s ease-in-out infinite 1s; }
        .orb-c         { animation: orbDrift3 14s ease-in-out infinite 2s; }
        .progress-fill { animation: progressFill ${SLIDE_INTERVAL}ms linear forwards; }
      `}</style>

      <section
        id="home"
        aria-label="Hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* ── Background: photo + deep rose overlay ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${current}`}
            className="absolute inset-0 z-0"
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {slide.img && (
              <img
                src={slide.img}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* PRIMARY: Deep rose-pink color wash — the hero of this design */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(168,24,69,0.78) 0%, rgba(120,10,48,0.84) 40%, rgba(80,5,32,0.88) 100%)',
              }}
            />

            {/* Secondary tinted vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, rgba(232,82,122,0.15) 0%, rgba(60,0,20,0.55) 75%)',
              }}
            />

            {/* Subtle noise grain */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Ambient Orbs ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="orb-a absolute w-[520px] h-[520px] rounded-full blur-[90px] opacity-[0.32] -top-28 -right-24"
            style={{ background: 'radial-gradient(circle,#ff6b9d,transparent 68%)' }}
          />
          <div
            className="orb-b absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-[0.26] -bottom-20 -left-16"
            style={{ background: 'radial-gradient(circle,#e8527a,transparent 68%)' }}
          />
          <div
            className="orb-c absolute w-[280px] h-[280px] rounded-full blur-[70px] opacity-[0.22] top-1/3 left-1/2"
            style={{ background: 'radial-gradient(circle,#ffa0c0,transparent 68%)' }}
          />
        </div>

        {/* ── Sparkles ── */}
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
                '--dur': `${2.5 + i * 0.4}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties}
            >
              {s.icon}
            </span>
          ))}
        </div>

        {/* ── Main Grid: Image left, Text right ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-[130px] pb-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <ImageCard slide={slide} slideKey={current} />
          <TextBlock
            slide={slide}
            slideKey={current}
            onBook={() => navigate('/booking')}
            onServices={() => navigate('/services')}
          />
        </div>

        {/* ── Bottom gradient fade ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(60,5,22,0.5), transparent)' }}
        />

        {/* ── Slide Indicators ── */}
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
                width: i === current ? '44px' : '20px',
                background: i === current ? 'transparent' : 'rgba(255,180,210,0.28)',
              }}
            >
              {i === current && (
                <span
                  key={`prog-${current}`}
                  className="progress-fill absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'linear-gradient(90deg,#ff6b9d,#e8527a)' }}
                />
              )}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}