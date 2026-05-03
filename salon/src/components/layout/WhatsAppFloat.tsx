import { useState } from 'react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { openWhatsApp } from '../../utils/helpers';
import { SALON_WHATSAPP } from '../../utils/data';
import '../../styles/index.css'

export function WhatsAppFloat() {
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleChat = () => {
    const cleaned = phone.replace(/\D/g, '');
    const target = cleaned.length >= 10 ? cleaned : SALON_WHATSAPP;
    const msg = encodeURIComponent("Hi! I'd like to connect with Lumina Beauty Studio 🌸");
    openWhatsApp(msg, target);
    handleClose();
  };

  return (
    <>
      {/* Float Button */}
      <div className="fixed bottom-7 right-7 z-[999] flex flex-col items-end gap-2.5 group">
        <div className="text-[#2D1B2E] bg-[#2D1B2E] text-white px-3.5 py-2 rounded-[20px] text-xs font-semibold whitespace-nowrap opacity-0 translate-x-2.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          Chat with us!
        </div>
        <button
          onClick={handleOpen}
          className="w-[58px] h-[58px] rounded-full bg-gradient-to-br from-wa-green to-wa-dark flex items-center justify-center cursor-pointer border-none text-white animate-wa-pulse hover:scale-110 hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={30} />
        </button>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(61,37,53,0.55)] backdrop-blur-[6px] z-[2000] flex items-center justify-center"
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="bg-white rounded-3xl p-8 max-w-[420px] w-[90%] shadow-[0_20px_60px_rgba(61,37,53,0.25)] text-center relative">
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-4 text-xl cursor-pointer text-salon-muted bg-transparent border-none"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-wa-green to-wa-dark mx-auto mb-4 flex items-center justify-center text-white">
              <WhatsAppIcon size={28} />
            </div>

            <h3 className="font-display text-[22px] font-bold text-salon-text mb-2">Chat on WhatsApp</h3>
            <p className="text-sm text-salon-muted mb-5 leading-relaxed">
              Enter your WhatsApp number to receive your booking confirmation, or just chat with us directly!
            </p>

            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              maxLength={15}
              className="w-full px-4 py-3.5 border-2 border-wa-green/35 rounded-[14px] text-[15px] text-center tracking-wide text-salon-text bg-green-50 outline-none focus:border-wa-green transition-colors"
            />

            <button
              onClick={handleChat}
              className="mt-4 w-full py-3.5 rounded-full bg-gradient-to-br from-wa-green to-wa-dark text-white text-[15px] font-bold flex items-center justify-center gap-2.5 shadow-[0_4px_18px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(37,211,102,0.55)] transition-all duration-300"
            >
              <WhatsAppIcon size={20} />
              Open WhatsApp
            </button>

            <p className="text-xs text-salon-muted mt-3.5">
              We'll reply within minutes during business hours 🌸
            </p>
          </div>
        </div>
      )}
    </>
  );
}
