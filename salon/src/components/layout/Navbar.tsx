import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { NAV_LINKS } from '../../utils/data';
import { cn } from '../../utils/helpers';
import '../../styles/index.css';

// RB Logo matching the salon's elegant serif monogram style
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
          <stop offset="0%" stopColor="#b07090" />
          <stop offset="100%" stopColor="#c490a8" />
        </linearGradient>
      </defs>

      {/* R — elegant serif R */}
      <text
        x="4"
        y="52"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="76"
        fontWeight="400"
        fontStyle="italic"
        fill="url(#rbGrad)"
        letterSpacing="-2"
      >
        R
      </text>

      {/* B — overlapping, offset slightly to create interlock effect */}
      <text
        x="32"
        y="52"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="46"
        fontWeight="400"
        fontStyle="italic"
        fill="url(#rbGrad)"
        opacity="0.92"
        letterSpacing="-2"
      >
        B
      </text>

      {/* Subtle underline flourish */}
      <line
        x1="6"
        y1="57"
        x2="70"
        y2="57"
        stroke="url(#rbGrad)"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}

// Floating hamburger lines with wave animation
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <span
        className={cn(
          'block h-[2px] rounded-full bg-gradient-to-r from-rose-deep to-purple-400 origin-center transition-all duration-400 ease-in-out',
          open
            ? 'rotate-45 translate-y-[9px]'
            : 'animate-float-line-1'
        )}
        style={{ width: open ? '100%' : '100%' }}
      />
      <span
        className={cn(
          'block h-[2px] rounded-full bg-gradient-to-r from-purple-400 to-rose-deep origin-center transition-all duration-300 ease-in-out',
          open
            ? 'opacity-0 scale-x-0'
            : 'animate-float-line-2'
        )}
        style={{ width: '75%', alignSelf: 'flex-end' }}
      />
      <span
        className={cn(
          'block h-[2px] rounded-full bg-gradient-to-r from-rose-deep to-purple-400 origin-center transition-all duration-400 ease-in-out',
          open
            ? '-rotate-45 -translate-y-[9px]'
            : 'animate-float-line-3'
        )}
        style={{ width: open ? '100%' : '88%' }}
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
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] transition-[width_0.1s] bg-gradient-to-r from-rose-deep via-pink-400 to-lavender"
        style={{ width: `${progress}%` }}
      />

      {/* Navbar */}
      <nav
        className={cn(
          'fixed top-0 w-full z-[1000] px-[5%] flex items-center justify-between transition-all duration-300',
          'bg-blush/85 backdrop-blur-[20px] border-b border-rose-soft/20',
          isScrolled
            ? 'py-2 bg-blush/97 shadow-[0_4px_30px_rgba(176,112,144,0.14)]'
            : 'py-3'
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
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
                className="text-salon-muted text-sm font-medium tracking-widest uppercase hover:text-rose-deep transition-colors duration-300 relative group"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', letterSpacing: '0.12em' }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-rose-deep to-lavender rounded-sm group-hover:w-full transition-[width] duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Now CTA */}
        <button
          onClick={handleBookNow}
          className="hidden md:block px-6 py-2.5 rounded-full text-[12px] font-semibold cursor-pointer border border-rose-deep/30 text-rose-deep bg-white/60 hover:bg-gradient-to-br hover:from-rose-deep hover:to-rose-darker hover:text-white hover:border-transparent transition-all duration-300 shadow-[0_2px_16px_rgba(176,112,144,0.18)] hover:shadow-[0_6px_28px_rgba(176,112,144,0.38)] hover:-translate-y-0.5 tracking-widest uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.15em' }}
        >
          Book Now
        </button>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer border-rose-soft/30 rounded-full backdrop-blur-sm hover:bg-white/70 transition-all duration-300 hover:shadow-[0_2px_16px_rgba(176,112,144,0.25)]"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-[998] bg-blush/97 backdrop-blur-[24px] flex flex-col items-center justify-center gap-9 transition-all duration-400',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-rose-deep bg-white/50 border border-rose-soft/30 rounded-full cursor-pointer backdrop-blur-sm hover:bg-rose-deep hover:text-white transition-all duration-300"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Mobile logo */}
        <div className="mb-2">
          <RBLogo />
        </div>

        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-[20px] text-salon-text hover:text-rose-deep transition-colors tracking-[0.18em] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
              opacity: mobileOpen ? 1 : 0,
              transition: `color 0.3s, transform 0.4s ${i * 50}ms, opacity 0.4s ${i * 50}ms`,
            }}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <button
          onClick={handleBookNow}
          className="mt-2 px-10 py-3 rounded-full border border-rose-deep/40 text-rose-deep text-[13px] tracking-[0.2em] uppercase bg-white/50 hover:bg-rose-deep hover:text-white transition-all duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Book Now ✨
        </button>
      </div>

      {/* Floating hamburger animation keyframes injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes floatLine1 {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          33% { transform: translateY(-2px) scaleX(0.95); }
          66% { transform: translateY(1px) scaleX(1.02); }
        }
        @keyframes floatLine2 {
          0%, 100% { transform: translateX(0px) scaleX(1); opacity: 1; }
          40% { transform: translateX(3px) scaleX(0.88); opacity: 0.75; }
          80% { transform: translateX(-2px) scaleX(0.94); opacity: 0.9; }
        }
        @keyframes floatLine3 {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          25% { transform: translateY(1.5px) scaleX(1.04); }
          70% { transform: translateY(-1.5px) scaleX(0.96); }
        }

        .animate-float-line-1 {
          animation: floatLine1 2.8s ease-in-out infinite;
        }
        .animate-float-line-2 {
          animation: floatLine2 2.4s ease-in-out infinite 0.3s;
        }
        .animate-float-line-3 {
          animation: floatLine3 3.1s ease-in-out infinite 0.6s;
        }
      `}</style>
    </>
  );
}