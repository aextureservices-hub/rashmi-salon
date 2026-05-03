import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { NAV_LINKS } from '../../utils/data';
import { cn } from '../../utils/helpers';
import '../../styles/index.css'

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
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] transition-[width_0.1s] bg-gradient-to-r from-rose-deep to-lavender"
        style={{ width: `${progress}%` }}
      />

      {/* Navbar */}
      <nav
        className={cn(
          'fixed top-0 w-full z-[1000] px-[5%] flex items-center justify-between transition-all duration-300',
          'bg-blush/85 backdrop-blur-[20px] border-b border-rose-soft/20',
          isScrolled ? 'py-2.5 bg-blush/95 shadow-[0_4px_30px_rgba(232,125,170,0.12)]' : 'py-4'
        )}
      >
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-wide bg-gradient-to-br from-rose-deep to-purple-500 bg-clip-text text-transparent"
        >
          RB
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-salon-muted text-sm font-medium tracking-wide hover:text-rose-deep transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-rose-deep to-lavender rounded-sm group-hover:w-full transition-[width] duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={handleBookNow}
          className="hidden md:block bg-gradient-to-br from-rose-deep to-rose-darker text-white px-6 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer border-none transition-all duration-300 shadow-[0_4px_20px_rgba(232,125,170,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,125,170,0.5)]"
        >
          Book Now
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={cn('w-[22px] h-[2px] bg-rose-deep rounded-sm transition-all duration-300', mobileOpen && 'rotate-45 translate-y-[7px]')} />
          <span className={cn('w-[22px] h-[2px] bg-rose-deep rounded-sm transition-all duration-300', mobileOpen && 'opacity-0')} />
          <span className={cn('w-[22px] h-[2px] bg-rose-deep rounded-sm transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-[7px]')} />
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-[998] bg-blush/97 backdrop-blur-[20px] flex flex-col items-center justify-center gap-8 transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <button
          className="absolute top-5 right-5 text-2xl cursor-pointer bg-transparent border-none text-salon-muted"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        {NAV_LINKS.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className="text-[22px] text-salon-text font-display font-semibold hover:text-rose-deep transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleBookNow}
          className="text-[22px] text-rose-deep font-display font-semibold"
        >
          Book Now ✨
        </button>
      </div>
    </>
  );
}
