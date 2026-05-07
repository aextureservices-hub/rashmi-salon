import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { NAV_LINKS } from '../../utils/data';
import { cn } from '../../utils/helpers';
import { P } from '../../utils/palette';
import '../../styles/index.css';

function RBLogo() {
  return (
    <svg
      viewBox="0 0 80 64"
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-11"
      aria-label="Rashmi Beauty Salon & Spa"
    >
      <defs>
        <linearGradient id="rbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#E8C9B8" />
          <stop offset="45%"  stopColor="#D4A96A" />
          <stop offset="100%" stopColor="#8B4865" />
        </linearGradient>
      </defs>

      <text
        x="4" y="52"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="76" fontWeight="400" fontStyle="italic"
        fill="url(#rbGrad)" letterSpacing="-2"
      >R</text>

      <text
        x="32" y="52"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="46" fontWeight="400" fontStyle="italic"
        fill="url(#rbGrad)" opacity="0.92" letterSpacing="-2"
      >B</text>

      <line
        x1="6" y1="57" x2="70" y2="57"
        stroke="url(#rbGrad)" strokeWidth="0.8" opacity="0.5"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <span
        className={cn(
          'block h-[2px] rounded-full origin-center transition-all duration-400 ease-in-out',
          open ? 'rotate-45 translate-y-[9px]' : 'animate-float-line-1'
        )}
        style={{
          width: '100%',
          background: `linear-gradient(90deg, ${P.gold}, ${P.primary})`,
        }}
      />
      <span
        className={cn(
          'block h-[2px] rounded-full origin-center transition-all duration-300 ease-in-out',
          open ? 'opacity-0 scale-x-0' : 'animate-float-line-2'
        )}
        style={{
          width: '75%',
          alignSelf: 'flex-end',
          background: `linear-gradient(90deg, ${P.primary}, ${P.gold})`,
        }}
      />
      <span
        className={cn(
          'block h-[2px] rounded-full origin-center transition-all duration-400 ease-in-out',
          open ? '-rotate-45 -translate-y-[9px]' : 'animate-float-line-3'
        )}
        style={{
          width: open ? '100%' : '88%',
          background: `linear-gradient(90deg, ${P.gold}, ${P.primary})`,
        }}
      />
    </div>
  );
}

export function Navbar() {
  const { progress, isScrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar — gold gradient */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] transition-[width_0.1s]"
        style={{
          width: `${progress}%`,
          background: P.gradGold,
        }}
      />

      {/* Navbar */}
      <nav
        className={cn(
          'fixed top-0 w-full z-[1000] px-[5%] flex items-center justify-between transition-all duration-300',
          isScrolled ? 'py-2' : 'py-3'
        )}
        style={{
          background: isScrolled
            ? 'rgba(28,15,26,0.97)'
            : 'rgba(28,15,26,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${P.border}`,
          boxShadow: isScrolled
            ? `0 4px 30px rgba(212,169,106,0.10)`
            : 'none',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <RBLogo />
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="relative group transition-colors duration-300"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: P.textGoldMuted,
                  fontWeight: 500,
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = P.gold)
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = P.textGoldMuted)
                }
              >
                {link.label}
                {/* Underline hover */}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[1px] rounded-sm group-hover:w-full transition-[width] duration-300"
                  style={{ background: P.gradGold }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Now CTA */}
        <button
          onClick={handleBookNow}
          className="hidden md:block px-6 py-2.5 rounded-full text-[12px] font-semibold cursor-pointer tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.15em',
            border: `1px solid ${P.borderMid}`,
            color: P.gold,
            background: 'transparent',
            boxShadow: `0 2px 16px ${P.glowGold}`,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = P.gradGold;
            el.style.color = P.primaryDark;
            el.style.borderColor = 'transparent';
            el.style.boxShadow = `0 6px 28px ${P.glowGold}`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = 'transparent';
            el.style.color = P.gold;
            el.style.borderColor = P.borderMid;
            el.style.boxShadow = `0 2px 16px ${P.glowGold}`;
          }}
        >
          Book Now
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer rounded-full transition-all duration-300"
          style={{ border: `1px  ${P.border}` }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLButtonElement).style.borderColor = P.borderHot)
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLButtonElement).style.borderColor = P.border)
          }
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-[998] flex flex-col items-center justify-center gap-9 transition-all duration-400',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{
          background: 'rgba(28,15,26,0.97)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
          style={{
            color: P.gold,
            background: 'rgba(212,169,106,0.08)',
            border: `1px solid ${P.border}`,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = P.gradGold;
            el.style.color = P.primaryDark;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = 'rgba(212,169,106,0.08)';
            el.style.color = P.gold;
          }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Mobile logo */}
        <div className="mb-2">
          <RBLogo />
        </div>

        {/* Thin gold divider */}
        <div
          style={{
            height: '1px',
            width: '60px',
            background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`,
          }}
        />

        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-[20px] tracking-[0.18em] uppercase transition-colors duration-300"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              color: P.textGoldMuted,
              transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
              opacity: mobileOpen ? 1 : 0,
              transition: `color 0.3s, transform 0.4s ${i * 50}ms, opacity 0.4s ${i * 50}ms`,
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = P.gold)
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = P.textGoldMuted)
            }
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <button
          onClick={handleBookNow}
          className="mt-2 px-10 py-3 rounded-full text-[13px] tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: P.gold,
            border: `1px solid ${P.borderMid}`,
            background: 'transparent',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = P.gradGold;
            el.style.color = P.primaryDark;
            el.style.borderColor = 'transparent';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = 'transparent';
            el.style.color = P.gold;
            el.style.borderColor = P.borderMid;
          }}
        >
          Book Now ✨
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes floatLine1 {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          33%       { transform: translateY(-2px) scaleX(0.95); }
          66%       { transform: translateY(1px) scaleX(1.02); }
        }
        @keyframes floatLine2 {
          0%, 100% { transform: translateX(0px) scaleX(1); opacity: 1; }
          40%      { transform: translateX(3px) scaleX(0.88); opacity: 0.75; }
          80%      { transform: translateX(-2px) scaleX(0.94); opacity: 0.9; }
        }
        @keyframes floatLine3 {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          25%      { transform: translateY(1.5px) scaleX(1.04); }
          70%      { transform: translateY(-1.5px) scaleX(0.96); }
        }
        .animate-float-line-1 { animation: floatLine1 2.8s ease-in-out infinite; }
        .animate-float-line-2 { animation: floatLine2 2.4s ease-in-out infinite 0.3s; }
        .animate-float-line-3 { animation: floatLine3 3.1s ease-in-out infinite 0.6s; }
      `}</style>
    </>
  );
}