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
    const msg = encodeURIComponent("Hi! I'd like to connect with Rashmi Beauty Salon & Spa 🌸");
    openWhatsApp(msg, SALON_WHATSAPP);
  };

  return (
    <footer className="bg-gradient-dark text-white px-[5%] pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="block font-display text-[26px] font-bold bg-gradient-to-br from-rose-soft to-purple-300 bg-clip-text text-transparent mb-3">
              RB
            </Link>
            <p className="text-sm text-white/55 leading-relaxed">
              Where beauty meets Confidence. Experience premium salon services crafted with passion and expertise.
            </p>
            <div className="flex gap-3 mt-5">
             <a href="https://www.instagram.com/rashmi_salon_26?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-[42px] h-[42px] rounded-full border border-white/15 bg-transparent flex items-center justify-center cursor-pointer hover:bg-rose-deep/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[42px] h-[42px] rounded-full border border-white/15 bg-transparent flex items-center justify-center cursor-pointer hover:bg-rose-deep/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
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
            <p className="mt-4 text-xs text-white/40">📍 Kavita Complex Kamla College Road Rajnandgaon</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40">© 2026 Rashmi Beauty Salon & Spa. Made with 🌸 in Rajnandgaon</p>
          <p className="text-xs text-white/30">Privacy · Terms</p>
        </div>
      </div>
    </footer>
  );
}
