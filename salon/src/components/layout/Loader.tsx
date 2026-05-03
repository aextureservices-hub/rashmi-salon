import { useEffect, useState } from 'react';
import { cn } from '../../utils/helpers';
import '../../styles/index.css';

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  rotation: i * 30,
  isPurple: i % 2 !== 0,
  delay: i * 0.08,
}));

const SPARKLES = [
  { size: 5, color: '#e879a0', left: '20%', top: '25%', dur: 3.1, delay: 0.2 },
  { size: 3, color: '#a855f7', left: '78%', top: '18%', dur: 2.7, delay: 0.7 },
  { size: 4, color: '#f9a8c9', left: '60%', top: '70%', dur: 3.5, delay: 1.1 },
  { size: 3, color: '#c084e8', left: '35%', top: '80%', dur: 2.9, delay: 0.4 },
  { size: 5, color: '#e879a0', left: '85%', top: '55%', dur: 3.3, delay: 1.4 },
  { size: 3, color: '#a855f7', left: '12%', top: '65%', dur: 2.6, delay: 0.9 },
  { size: 4, color: '#f9a8c9', left: '50%', top: '12%', dur: 3.8, delay: 0.1 },
  { size: 3, color: '#c084e8', left: '90%', top: '30%', dur: 3.0, delay: 1.7 },
];

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=Jost:wght@200;300&display=swap');

        @keyframes petalBloom {
          0%   { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.3); }
          60%  { opacity: 1; transform: translateX(-50%) translateY(-56px) scale(1.1); }
          100% { opacity: 0.85; transform: translateX(-50%) translateY(-52px) scale(1); }
        }
        @keyframes heartPulse {
          0%,100% { transform: translate(-50%, -50%) scale(1);    filter: drop-shadow(0 0 8px rgba(232,121,160,0.6)) drop-shadow(0 0 18px rgba(192,38,211,0.3)); }
          50%      { transform: translate(-50%, -50%) scale(1.22); filter: drop-shadow(0 0 16px rgba(232,121,160,0.9)) drop-shadow(0 0 32px rgba(192,38,211,0.55)); }
        }
        @keyframes spinRing {
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes sparkleFly {
          0%   { opacity:0; transform:translateY(0) scale(0); }
          20%  { opacity:.9; transform:translateY(-8px) scale(1); }
          80%  { opacity:.7; transform:translateY(-22px) scale(.8); }
          100% { opacity:0; transform:translateY(-34px) scale(.2); }
        }
        @keyframes shimmerText {
          to { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes loadBar {
          to { width: 100%; }
        }
        @keyframes shimmerBar {
          to { background-position: 200% center; }
        }
        @keyframes taglineBlink {
          0%,100% { opacity:.55; }
          50%     { opacity:1; }
        }
        @keyframes decoExpand {
          0%   { opacity:0; transform:scale(0.4); }
          50%  { opacity:.7; }
          100% { opacity:.25; transform:scale(1); }
        }
      `}</style>

      <div
        className={cn(
          'fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden',
          'transition-all duration-700',
          hidden && 'opacity-0 scale-105 pointer-events-none'
        )}
        style={{ background: 'linear-gradient(135deg,#fff5f9 0%,#fdf0fa 40%,#f5eeff 100%)' }}
      >
        {/* Decorative expanding rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[260, 340, 420].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-rose-300/20"
              style={{
                width: size, height: size,
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                animation: `decoExpand 2s ease-out ${0.3 + i * 0.25}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Floating sparkles */}
        {SPARKLES.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: s.size, height: s.size,
              background: s.color,
              left: s.left, top: s.top,
              animation: `sparkleFly ${s.dur}s linear ${s.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}

        {/* Petal flower */}
        <div className="relative mb-9" style={{ width: 140, height: 140 }}>
          {PETALS.map((p) => (
            <div
              key={p.id}
              className="absolute"
              style={{
                width: 18, height: 36,
                borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
                top: '50%', left: '50%',
                transformOrigin: 'bottom center',
                background: p.isPurple
                  ? 'linear-gradient(160deg,#c084e8,#a855f7)'
                  : 'linear-gradient(160deg,#f9a8c9,#e879a0)',
                transform: `translateX(-50%) rotate(${p.rotation}deg) translateY(-52px)`,
                animation: `petalBloom 0.5s ease ${p.delay}s forwards`,
                opacity: 0,
              }}
            />
          ))}

          {/* Spinning border ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 110, height: 110,
              top: '50%', left: '50%',
              border: '1.5px solid transparent',
              background: 'linear-gradient(#fdf0f5,#fdf0f5) padding-box, linear-gradient(135deg,#e879a0,#a855f7,#e879a0) border-box',
              animation: 'spinRing 2.4s linear infinite',
              transform: 'translate(-50%,-50%)',
            }}
          />

          {/* Centre Heart ❤️ */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              animation: 'heartPulse 1.6s ease-in-out infinite',
            }}
          >
            <svg
              width="40"
              height="36"
              viewBox="0 0 40 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="heartGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%"   stopColor="#fde8f3" />
                  <stop offset="50%"  stopColor="#e879a0" />
                  <stop offset="100%" stopColor="#c026d3" />
                </radialGradient>
              </defs>
              <path
                d="M20 33 C20 33 2 21 2 11 C2 6 6 2 11 2 C14.5 2 17.5 3.8 20 7 C22.5 3.8 25.5 2 29 2 C34 2 38 6 38 11 C38 21 20 33 20 33Z"
                fill="url(#heartGrad)"
              />
            </svg>
          </div>
        </div>

        {/* Salon name */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.1rem',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            background: 'linear-gradient(110deg,#be185d 0%,#7c3aed 50%,#be185d 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmerText 2s linear infinite, fadeSlideUp 0.7s ease 0.9s both',
          }}
        >
          Rashmi Beauty Salon
        </div>

        {/* Progress bar */}
        <div
          className="mt-6 rounded-full overflow-hidden"
          style={{
            width: 180, height: 2,
            background: 'rgba(190,24,93,0.12)',
            animation: 'fadeSlideUp 0.6s ease 1.1s both',
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: 0,
              background: 'linear-gradient(90deg,#e879a0,#a855f7,#e879a0)',
              backgroundSize: '200% auto',
              animation: 'loadBar 1.8s cubic-bezier(0.4,0,0.2,1) 1.2s forwards, shimmerBar 1.2s linear infinite',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 300,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(190,24,93,0.6)',
            marginTop: 14,
            animation: 'fadeSlideUp 0.6s ease 1.3s both, taglineBlink 1.8s ease-in-out 1.3s infinite',
          }}
        >
          Preparing your glow…
        </p>
      </div>
    </>
  );
}