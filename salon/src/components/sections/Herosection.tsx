import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/bride.jpg';
import image3 from '../../assets/bride2.jpeg';

// ─── Constants (outside component — never recreated) ───────────────────────────
const SLIDE_INTERVAL = 5500;

const SLIDES = [
  {
    img: image1,
    eyebrow: 'Premium Beauty & Wellness',
    headline: ['Reveal Your', 'Radiance'] as [string, string],
    sub: 'Where artistry meets care — award-winning treatments designed for the modern woman.',
    emoji: '🌸',
    badge: '🏆 #1 Salon in City',
  },
  {
    img: image2,
    eyebrow: 'Expert Hair & Styling',
    headline: ['Transform', 'Your Look'] as [string, string],
    sub: 'From balayage to bridal — our stylists craft the perfect look for every occasion.',
    emoji: '✂️',
    badge: '✨ 500+ Styles Done',
  },
  {
    img: image3,
    eyebrow: 'Spa & Skin Rituals',
    headline: ['Indulge in', 'Pure Luxury'] as [string, string],
    sub: 'Signature facials, body rituals, and nail artistry — all under one roof.',
    emoji: '💆‍♀️',
    badge: '💎 Premium Experience',
  },
] as const;


// ─── Animation variants (defined once, never recreated) ────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const bgVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
  exit:   { opacity: 0, transition: { duration: 0.5 } },
} as const;

const cardVariants = {
  enter:  { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  exit:   { opacity: 0, x: -20, transition: { duration: 0.28 } },
} as const;

const contentVariants = {
  enter:  { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } },
  exit:   { opacity: 0, transition: { duration: 0.22 } },
} as const;

// ─── Static CSS (injected once, not on every render) ──────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Outfit:wght@300;400;500&display=swap');

  @keyframes sparkleFloat {
    0%,100% { transform:translateY(0) scale(1); opacity:0.4; }
    50%      { transform:translateY(-8px) scale(1.15); opacity:0.8; }
  }
  @keyframes orbDrift1 {
    0%,100% { transform:translate(0,0); }
    50%     { transform:translate(28px,-18px); }
  }
  @keyframes orbDrift2 {
    0%,100% { transform:translate(0,0); }
    50%     { transform:translate(-22px,16px); }
  }
  @keyframes progressFill {
    from { width:0% }
    to   { width:100% }
  }

  .hero-sparkle  { animation:sparkleFloat var(--dur,3s) ease-in-out infinite; color:rgba(255,180,210,0.7); position:absolute; pointer-events:none; user-select:none; }
  .hero-orb-a    { animation:orbDrift1 9s ease-in-out infinite; }
  .hero-orb-b    { animation:orbDrift2 11s ease-in-out infinite 1s; }
  .hero-progress { animation:progressFill ${SLIDE_INTERVAL}ms linear forwards; }
`;

// ─── Sparkle data (static) ────────────────────────────────────────────────────
const SPARKLES = [
  { top: '14%', left: '7%',   dur: '3.2s', delay: '0s',   size: 15, icon: '✦' },
  { top: '24%', right: '10%', dur: '3.8s', delay: '0.8s', size: 11, icon: '✿' },
  { top: '58%', left: '4%',   dur: '4.1s', delay: '1.5s', size: 10, icon: '✦' },
  { top: '72%', right: '6%',  dur: '3.5s', delay: '0.4s', size: 13, icon: '✿' },
  { top: '40%', right: '21%', dur: '2.9s', delay: '1.2s', size: 9,  icon: '✦' },
  { top: '82%', left: '16%',  dur: '4.4s', delay: '2.0s', size: 11, icon: '✿' },
] as const;

// ─── ImageCard (memoized — only re-renders when slideKey changes) ──────────────
const ImageCard = memo(function ImageCard({
  slide,
  slideKey,
}: {
  slide: typeof SLIDES[number];
  slideKey: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        className="relative flex-shrink-0 will-change-transform"
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {/* Decorative ring */}
        <div className="absolute -inset-3 rounded-[36px] pointer-events-none" style={{
          background: 'linear-gradient(135deg,rgba(232,82,122,0.15),rgba(195,30,80,0.08))',
          border: '1px solid rgba(232,82,122,0.2)',
        }} />

        {/* Image frame */}
        <div className="relative w-full h-[440px] rounded-[28px] overflow-hidden" style={{
          boxShadow: '0 32px 80px rgba(180,30,70,0.3),inset 0 1px 0 rgba(255,255,255,0.5)',
        }}>
          <img
            src={slide.img}
            alt={slide.eyebrow}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Rose tint */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(160deg,rgba(195,30,80,0.2) 0%,rgba(100,5,35,0.42) 100%)',
            mixBlendMode: 'multiply',
          }} />
          {/* Bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{
            background: 'linear-gradient(to top,rgba(80,5,28,0.55),transparent)',
          }} />
          {/* Inner border glow */}
          <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{
            boxShadow: 'inset 0 0 0 1px rgba(232,82,122,0.25)',
          }} />
        </div>

        {/* Rating float */}
        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-[18px] px-4 py-3" style={{
          background: 'rgba(255,240,245,0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(232,82,122,0.25)',
          boxShadow: '0 12px 36px rgba(180,30,70,0.18)',
        }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{
            background: 'linear-gradient(135deg,#e8527a,#c73468)',
          }}>⭐</div>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: '#3d0d1e', fontFamily: "'Playfair Display',serif" }}>
              4.9 / 5.0 Rating
            </p>
            <p className="text-[11px]" style={{ color: '#c73468', fontFamily: "'Outfit',sans-serif" }}>
              2,000+ happy clients
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-5 -left-3 px-2 py-2 rounded-[10px] text-white text-[10px] font-semibold" style={{
          background: 'linear-gradient(135deg,#e8527a,#a81845)',
          boxShadow: '0 8px 24px rgba(168,24,69,0.5)',
          fontFamily: "'Outfit',sans-serif",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {slide.badge}
        </div>

        {/* Top pill */}
        <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full text-[11px] font-medium" style={{
          background: 'rgba(255,240,245,0.82)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(232,82,122,0.28)',
          color: '#a81845',
          fontFamily: "'Outfit',sans-serif",
        }}>
          ✦ Trusted since 2012
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

// ─── TextBlock (memoized) ──────────────────────────────────────────────────────
const TextBlock = memo(function TextBlock({
  slide,
  slideKey,
  onBook,
  onServices,
}: {
  slide: typeof SLIDES[number];
  slideKey: number;
  onBook: () => void;
  onServices: () => void;
}) {
  return (
    // KEY FIX: Single AnimatePresence for ALL text — was 4 separate ones before
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        className="flex flex-col will-change-transform"
        variants={contentVariants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {/* Eyebrow */}
        <div className="self-start inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6" style={{
          background: 'rgba(255,240,245,0.15)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(232,82,122,0.35)',
          color: '#ffd6e7',
          fontFamily: "'Outfit',sans-serif",
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          <span style={{ fontSize: '14px' }}>{slide.emoji}</span>
          {slide.eyebrow}
        </div>

        {/* Headline */}
        <h1 className="mb-4 leading-[1.05]" style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 'clamp(44px,5vw,76px)',
          fontWeight: 400,
          color: '#fff5f8',
          textShadow: '0 2px 20px rgba(100,0,30,0.4)',
        }}>
          {slide.headline[0]}
          <br />
          <em style={{
            fontStyle: 'italic',
            background: 'linear-gradient(120deg,#ffb3cc 0%,#ff6b9d 45%,#e8527a 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {slide.headline[1]}
          </em>
        </h1>

        {/* Divider */}
        <div className="mb-5 h-px w-14 rounded-full" style={{
          background: 'linear-gradient(90deg,rgba(232,82,122,0.9),transparent)',
        }} />

        {/* Subtitle */}
        <p className="mb-9 leading-relaxed max-w-[420px]" style={{
          fontSize: '15.5px',
          color: 'rgba(255,215,228,0.9)',
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 300,
          letterSpacing: '0.025em',
        }}>
          {slide.sub}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap mb-10">
          <button
            onClick={onBook}
            className="px-8 py-3.5 rounded-full text-white cursor-pointer border-none"
            style={{
              background: 'linear-gradient(135deg,#e8527a,#a81845)',
              boxShadow: '0 8px 28px rgba(168,24,69,0.5)',
              fontFamily: "'Outfit',sans-serif",
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(168,24,69,0.62)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(168,24,69,0.5)';
            }}
          >
            Book Appointment 🌸
          </button>

          <button
            onClick={onServices}
            className="px-8 py-3.5 rounded-full cursor-pointer"
            style={{
              background: 'rgba(255,240,245,0.1)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(232,82,122,0.4)',
              color: '#ffd6e7',
              fontFamily: "'Outfit',sans-serif",
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'transform 0.18s ease, background 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(255,240,245,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.background = 'rgba(255,240,245,0.1)';
            }}
          >
            Explore Services
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

// ─── HeroSection ───────────────────────────────────────────────────────────────
export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const goToSlide = useCallback((i: number) => setCurrent(i), []);
  const goNext    = useCallback(() => setCurrent(p => (p + 1) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [goNext]);

  // Stable nav callbacks
  const handleBook     = useCallback(() => navigate('/booking'),  [navigate]);
  const handleServices = useCallback(() => navigate('/services'), [navigate]);

  const slide = SLIDES[current];

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <section id="home" aria-label="Hero" className="relative min-h-screen flex items-center overflow-hidden">

        {/* ── Background ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 z-0"
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <img
              src={slide.img}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            {/* Deep rose wash */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg,rgba(168,24,69,0.76) 0%,rgba(110,8,42,0.84) 45%,rgba(70,3,26,0.88) 100%)',
            }} />
            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 60% 40%,rgba(232,82,122,0.12) 0%,rgba(55,0,18,0.52) 75%)',
            }} />
          </motion.div>
        </AnimatePresence>

        {/* ── Ambient Orbs (CSS-only, zero JS) ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="hero-orb-a absolute w-[480px] h-[480px] rounded-full blur-[85px] opacity-[0.28] -top-24 -right-20"
            style={{ background: 'radial-gradient(circle,#ff6b9d,transparent 68%)' }} />
          <div className="hero-orb-b absolute w-[380px] h-[380px] rounded-full blur-[75px] opacity-[0.22] -bottom-16 -left-14"
            style={{ background: 'radial-gradient(circle,#e8527a,transparent 68%)' }} />
        </div>

        {/* ── Sparkles (CSS-only) ── */}
        <div className="absolute inset-0 z-[2]" aria-hidden="true">
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="hero-sparkle"
              style={{
                top: s.top,
                left: 'left' in s ? (s as any).left : undefined,
                right: 'right' in s ? (s as any).right : undefined,
                fontSize: s.size,
                '--dur': s.dur,
                animationDelay: s.delay,
              } as React.CSSProperties}
            >
              {s.icon}
            </span>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-[130px] pb-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <ImageCard slide={slide} slideKey={current} />
          <TextBlock
            slide={slide}
            slideKey={current}
            onBook={handleBook}
            onServices={handleServices}
          />
        </div>

        {/* ── Bottom fade ── */}
        <div className="absolute bottom-0 inset-x-0 h-28 z-[3] pointer-events-none" style={{
          background: 'linear-gradient(to top,rgba(55,3,18,0.5),transparent)',
        }} />

        {/* ── Slide Indicators ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              onClick={() => goToSlide(i)}
              className="relative overflow-hidden h-[3px] rounded-full cursor-pointer border-none"
              style={{
                width: i === current ? '44px' : '20px',
                background: i === current ? 'transparent' : 'rgba(255,180,210,0.25)',
                transition: 'width 0.3s ease',
              }}
            >
              {i === current && (
                <span
                  key={`p-${current}`}
                  className="hero-progress absolute inset-y-0 left-0 rounded-full"
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