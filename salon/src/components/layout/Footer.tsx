import { Link, useNavigate } from 'react-router-dom';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { openWhatsApp } from '../../utils/helpers';
import { SALON_WHATSAPP } from '../../utils/data';
import '../../styles/index.css'

const footerServices = ['Hair Styling', 'Skin Care', 'Nail Art', 'Bridal Makeup'];
const footerLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'Book Now', path: '/booking' },
];
const hours = ['Mon–Fri: 9AM–8PM', 'Saturday: 9AM–8PM', 'Sunday: 10AM–6PM'];

export function Footer() {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hi! I'd like to connect with Lumina Beauty Studio 🌸");
    openWhatsApp(msg, SALON_WHATSAPP);
  };

  return (
    <footer className="bg-gradient-dark text-white px-[5%] pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="block font-display text-[26px] font-bold bg-gradient-to-br from-rose-soft to-purple-300 bg-clip-text text-transparent mb-3">
              ✦ Lumina
            </Link>
            <p className="text-sm text-white/55 leading-relaxed">
              Where beauty meets artistry. Experience premium salon services crafted with passion and expertise.
            </p>
            <div className="flex gap-3 mt-5">
              <button className="w-[42px] h-[42px] rounded-full border border-white/15 bg-transparent flex items-center justify-center text-base cursor-pointer hover:bg-rose-deep/20 transition-colors">📸</button>
              <button className="w-[42px] h-[42px] rounded-full border border-white/15 bg-transparent flex items-center justify-center text-base cursor-pointer hover:bg-rose-deep/20 transition-colors">🦋</button>
              <button
                onClick={handleWhatsApp}
                className="w-[42px] h-[42px] rounded-full border border-wa-green/40 bg-wa-green/15 flex items-center justify-center cursor-pointer hover:bg-wa-green/30 transition-colors text-wa-green"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-[2px] uppercase text-white/70 mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {footerServices.map(s => (
                <li key={s}>
                  <button
                    onClick={() => navigate('/services')}
                    className="text-white/50 text-sm hover:text-rose-soft transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[2px] uppercase text-white/70 mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/50 text-sm hover:text-rose-soft transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-semibold tracking-[2px] uppercase text-white/70 mb-4">Hours</h3>
            <ul className="flex flex-col gap-2.5">
              {hours.map(h => (
                <li key={h} className="text-white/50 text-sm">{h}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-white/40">📍 Civil Lines, Raipur</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40">© 2026 Lumina Beauty Studio. Made with 🌸 in Raipur</p>
          <p className="text-xs text-white/30">Privacy · Terms</p>
        </div>
      </div>
    </footer>
  );
}
