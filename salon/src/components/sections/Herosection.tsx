import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/bride.jpg';
import image3 from '../../assets/bride2.jpeg';
import { P } from '../../utils/palette';

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

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Outfit:wght@300;400;500&display=swap');

  @keyframes sparkleFloat {
    0%,100% { transform:translateY(0) scale(1); opacity:0.35; }
    50%      { transform:translateY(-8px) scale(1.15); opacity:0.75; }
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

  .hero-sparkle  { animation:sparkleFloat var(--dur,3s) ease-in-out infinite; color:rgba(212,169,106,0.65); position:absolute; pointer-events:none; user-select:none; }
  .hero-orb-a    { animation:orbDrift1 9s ease-in-out infinite; }
  .hero-orb-b    { animation:orbDrift2 11s ease-in-out infinite 1s; }
  .hero-progress { animation:progressFill ${SLIDE_INTERVAL}ms linear forwards; }
`;

const SPARKLES = [
  { top: '14%', left: '7%',   dur: '3.2s', delay: '0s',   size: 15, icon: '✦' },
  { top: '24%', right: '10%', dur: '3.8s', delay: '0.8s', size: 11, icon: '✿' },
  { top: '58%', left: '4%',   dur: '4.1s', delay: '1.5s', size: 10, icon: '✦' },
  { top: '72%', right: '6%',  dur: '3.5s', delay: '0.4s', size: 13, icon: '✿' },
  { top: '40%', right: '21%', dur: '2.9s', delay: '1.2s', size: 9,  icon: '✦' },
  { top: '82%', left: '16%',  dur: '4.4s', delay: '2.0s', size: 11, icon: '✿' },
] as const;

const ImageCard = memo(function ImageCard({
  slide, slideKey,
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
        initial="enter" animate="center" exit="exit"
      >
        <div className="absolute -inset-3 rounded-[36px] pointer-events-none" style={{
          background: `linear-gradient(135deg,rgba(139,72,101,0.15),rgba(212,169,106,0.08))`,
          border: `1px solid ${P.border}`,
        }} />

        <div className="relative w-full h-[440px] rounded-[28px] overflow-hidden" style={{
          boxShadow: `0 32px 80px rgba(139,72,101,0.28),inset 0 1px 0 rgba(212,169,106,0.3)`,
        }}>
          <img src={slide.img} alt={slide.eyebrow}
            className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(160deg,rgba(139,72,101,0.18) 0%,rgba(28,15,26,0.45) 100%)',
            mixBlendMode: 'multiply',
          }} />
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{
            background: 'linear-gradient(to top,rgba(28,15,26,0.6),transparent)',
          }} />
          <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{
            boxShadow: `inset 0 0 0 1px ${P.border}`,
          }} />
        </div>

        {/* Rating float */}
        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-[18px] px-4 py-3" style={{
          background: 'rgba(245,236,215,0.92)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${P.border}`,
          boxShadow: '0 12px 36px rgba(139,72,101,0.18)',
        }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{
            background: `linear-gradient(135deg,${P.primary},#6B3050)`,
          }}>⭐</div>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: '#2E1628', fontFamily: "'Playfair Display',serif" }}>
              4.9 / 5.0 Rating
            </p>
            <p className="text-[11px]" style={{ color: P.primary, fontFamily: "'Outfit',sans-serif" }}>
              2,000+ happy clients
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-5 -left-3 px-3 py-2 rounded-[10px] text-white text-[10px] font-semibold" style={{
          background: `linear-gradient(135deg,${P.primary},#6B3050)`,
          boxShadow: `0 8px 24px ${P.glow}`,
          fontFamily: "'Outfit',sans-serif",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {slide.badge}
        </div>

        {/* Top pill */}
        <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full text-[11px] font-medium" style={{
          background: 'rgba(245,236,215,0.85)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${P.borderMid}`,
          color: '#6B3050',
          fontFamily: "'Outfit',sans-serif",
        }}>
          ✦ Trusted since 2012
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

const TextBlock = memo(function TextBlock({
  slide, slideKey, onBook, onServices,
}: {
  slide: typeof SLIDES[number];
  slideKey: number;
  onBook: () => void;
  onServices: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        className="flex flex-col will-change-transform"
        variants={contentVariants}
        initial="enter" animate="center" exit="exit"
      >
        {/* Eyebrow */}
        <div className="self-start inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6" style={{
          background: 'rgba(212,169,106,0.12)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${P.borderMid}`,
          color: P.blush,
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
          color: P.text,
          textShadow: '0 2px 20px rgba(28,15,26,0.5)',
        }}>
          {slide.headline[0]}
          <br />
          <em style={{
            fontStyle: 'italic',
            background: `linear-gradient(120deg,${P.blush} 0%,${P.gold} 45%,${P.primary} 85%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {slide.headline[1]}
          </em>
        </h1>

        {/* Divider */}
        <div className="mb-5 h-px w-14 rounded-full" style={{
          background: `linear-gradient(90deg,${P.gold},transparent)`,
        }} />

        {/* Subtitle */}
        <p className="mb-9 leading-relaxed max-w-[420px]" style={{
          fontSize: '15.5px',
          color: P.textMuted,
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 300,
          letterSpacing: '0.025em',
        }}>
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap mb-10">
          <button
            onClick={onBook}
            className="px-8 py-3.5 rounded-full text-white cursor-pointer border-none"
            style={{
              background: `linear-gradient(135deg,${P.primary},#6B3050)`,
              boxShadow: `0 8px 28px ${P.glow}`,
              fontFamily: "'Outfit',sans-serif",
              fontSize: '12.5px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 14px 40px ${P.glow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = `0 8px 28px ${P.glow}`;
            }}
          >
            Book Appointment 🌸
          </button>

          <button
            onClick={onServices}
            className="px-8 py-3.5 rounded-full cursor-pointer"
            style={{
              background: 'rgba(212,169,106,0.08)',
              backdropFilter: 'blur(14px)',
              border: `1px solid ${P.borderMid}`,
              color: P.blush,
              fontFamily: "'Outfit',sans-serif",
              fontSize: '12.5px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              transition: 'transform 0.18s ease, background 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(212,169,106,0.16)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.background = 'rgba(212,169,106,0.08)';
            }}
          >
            Explore Services
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const goToSlide = useCallback((i: number) => setCurrent(i), []);
  const goNext    = useCallback(() => setCurrent(p => (p + 1) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [goNext]);

  const handleBook     = useCallback(() => navigate('/booking'),  [navigate]);
  const handleServices = useCallback(() => navigate('/services'), [navigate]);

  const slide = SLIDES[current];

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <section id="home" aria-label="Hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: P.bg }}
      >
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div key={current} className="absolute inset-0 z-0"
            variants={bgVariants} initial="enter" animate="center" exit="exit"
          >
            <img src={slide.img} alt="" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager" decoding="async" />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg,rgba(139,72,101,0.72) 0%,rgba(46,22,40,0.82) 45%,rgba(28,15,26,0.9) 100%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 60% 40%,rgba(212,169,106,0.1) 0%,rgba(28,15,26,0.5) 75%)',
            }} />
          </motion.div>
        </AnimatePresence>

        {/* Orbs */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="hero-orb-a absolute w-[480px] h-[480px] rounded-full blur-[85px] opacity-[0.22] -top-24 -right-20"
            style={{ background: 'radial-gradient(circle,#D4A96A,transparent 68%)' }} />
          <div className="hero-orb-b absolute w-[380px] h-[380px] rounded-full blur-[75px] opacity-[0.18] -bottom-16 -left-14"
            style={{ background: 'radial-gradient(circle,#8B4865,transparent 68%)' }} />
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 z-[2]" aria-hidden="true">
          {SPARKLES.map((s, i) => {
            const pos = 'left' in s
              ? { left: (s as { left: string } & typeof s).left }
              : { right: (s as { right: string } & typeof s).right };
            return (
              <span key={i} className="hero-sparkle" style={{
                top: s.top, ...pos, fontSize: s.size,
                ['--dur' as string]: s.dur, animationDelay: s.delay,
              }}>
                {s.icon}
              </span>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-[130px] pb-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <ImageCard slide={slide} slideKey={current} />
          <TextBlock slide={slide} slideKey={current} onBook={handleBook} onServices={handleServices} />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-28 z-[3] pointer-events-none"
          style={{ background: 'linear-gradient(to top,rgba(28,15,26,0.55),transparent)' }} />

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i} type="button" role="tab"
              aria-selected={i === current}
              onClick={() => goToSlide(i)}
              className="relative overflow-hidden h-[3px] rounded-full cursor-pointer"
              style={{
                width: i === current ? '44px' : '20px',
                background: i === current ? 'transparent' : 'rgba(212,169,106,0.2)',
                border: 'none', padding: 0,
                transition: 'width 0.3s ease',
              }}
            >
              {i === current && (
                <span key={`p-${current}`} className="hero-progress absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg,${P.blush},${P.gold})` }} />
              )}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}