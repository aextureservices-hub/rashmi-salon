import { Link, useNavigate } from 'react-router-dom';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { openWhatsApp } from '../../utils/helpers';
import { SALON_WHATSAPP } from '../../utils/data';
import { P } from '../../utils/palette';
import '../../styles/index.css';

const footerServices = ['Hair Styling', 'Skin Care', 'Nail Art', 'Bridal Makeup'];
const footerLinks = [
  { label: 'About Us', path: '/about'   },
  { label: 'Gallery',  path: '/gallery' },
  { label: 'Contact',  path: '/contact' },
  { label: 'Book Now', path: '/booking' },
];
const hours = ['Mon–Fri: 9AM–8PM', 'Saturday: 9AM–8PM', 'Sunday: 10AM–6PM'];

const headingStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: P.gold,                  // gold headings instead of muted ivory
  marginBottom: '1rem',
  fontFamily: "'Outfit',sans-serif",
};

const linkStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: P.textMuted,
  fontFamily: "'Outfit',sans-serif",
  transition: 'color 0.18s ease',
};

const socialBase: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 42, height: 42, borderRadius: '50%',
  transition: 'background 0.2s ease, border-color 0.2s ease',
};

export function Footer() {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hi! I'd like to connect with Rashmi Beauty Salon & Spa 🌸");
    openWhatsApp(msg, SALON_WHATSAPP);
  };

  return (
    <footer
      className="text-white px-[5%] pt-14 pb-8"
      style={{ background: P.bg, borderTop: `1px solid ${P.border}` }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Top gold accent line */}
        <div style={{
          height: '2px',
          background: `linear-gradient(90deg,transparent,${P.gold},transparent)`,
          marginBottom: '3rem',
          opacity: 0.6,
        }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── Brand ── */}
          <div>
            {/* Logo wordmark */}
            <Link
              to="/"
              className="block mb-1"
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: '28px',
                fontWeight: 400,
                fontStyle: 'italic',
                background: P.gradGold,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.04em',
              }}
            >
              Rashmi
            </Link>
            <p style={{
              fontSize: '0.7rem',
              color: P.gold,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: "'Outfit',sans-serif",
              marginBottom: '1rem',
              opacity: 0.8,
            }}>
              Beauty Salon & Spa
            </p>

            <p style={{
              fontSize: '0.8125rem',
              color: P.textMuted,
              lineHeight: 1.8,
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 300,
            }}>
              Where beauty meets confidence. Premium salon services crafted with passion and expertise.
            </p>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: `linear-gradient(90deg,${P.borderMid},transparent)`,
              margin: '1.25rem 0',
            }} />

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/rashmi_salon_26?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ ...socialBase, border: `1px solid ${P.borderMid}`, color: P.textMuted }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = P.glowGold;
                  e.currentTarget.style.borderColor = P.gold;
                  e.currentTarget.style.color = P.gold;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = P.borderMid;
                  e.currentTarget.style.color = P.textMuted;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                style={{ ...socialBase, border: `1px solid ${P.borderMid}`, color: P.textMuted }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = P.glowGold;
                  e.currentTarget.style.borderColor = P.gold;
                  e.currentTarget.style.color = P.gold;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = P.borderMid;
                  e.currentTarget.style.color = P.textMuted;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <button
                onClick={handleWhatsApp} aria-label="WhatsApp"
                style={{
                  ...socialBase, cursor: 'pointer',
                  border: '1px solid rgba(37,211,102,0.3)',
                  background: 'rgba(37,211,102,0.08)',
                  color: '#25D366',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.08)')}
              >
                <WhatsAppIcon size={18} />
              </button>
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 style={headingStyle}>Services</h3>
            <ul className="flex flex-col gap-3">
              {footerServices.map(s => (
                <li key={s}>
                  <button
                    onClick={() => navigate('/services')}
                    className="bg-transparent border-none cursor-pointer p-0 text-left"
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = P.blush)}
                    onMouseLeave={e => (e.currentTarget.style.color = P.textMuted)}
                  >
                    <span style={{ color: P.gold, marginRight: '8px', fontSize: '10px' }}>✦</span>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 style={headingStyle}>Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.map(l => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = P.blush)}
                    onMouseLeave={e => (e.currentTarget.style.color = P.textMuted)}
                  >
                    <span style={{ color: P.gold, marginRight: '8px', fontSize: '10px' }}>✦</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Hours ── */}
          <div>
            <h3 style={headingStyle}>Hours</h3>
            <ul className="flex flex-col gap-3">
              {hours.map(h => (
                <li
                  key={h}
                  style={{
                    fontSize: '0.875rem',
                    color: P.textMuted,
                    fontFamily: "'Outfit',sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: P.gold, fontSize: '10px' }}>✦</span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Location */}
            <div
              className="mt-5 flex items-start gap-2 rounded-[12px] px-3 py-3"
              style={{
                background: 'rgba(212,169,106,0.07)',
                border: `1px solid ${P.border}`,
              }}
            >
              <span style={{ fontSize: '14px', marginTop: '1px' }}>📍</span>
              <p style={{
                fontSize: '0.75rem',
                color: P.textMuted,
                fontFamily: "'Outfit',sans-serif",
                lineHeight: 1.6,
              }}>
                Kavita Complex, Kamla College Road, Rajnandgaon
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom gold line ── */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg,transparent,${P.borderMid},transparent)`,
          marginBottom: '1.25rem',
        }} />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{
            fontSize: '0.8125rem',
            color: P.textFaint,
            fontFamily: "'Outfit',sans-serif",
          }}>
            © 2026 Rashmi Beauty Salon & Spa · Made with 🌸 in Rajnandgaon
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms'].map(label => (
              <button
                key={label}
                className="bg-transparent border-none cursor-pointer p-0"
                style={{
                  fontSize: '0.75rem',
                  color: P.textFaint,
                  fontFamily: "'Outfit',sans-serif",
                  transition: 'color 0.18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = P.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = P.textFaint)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}