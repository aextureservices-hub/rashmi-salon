import { useState } from 'react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { openWhatsApp } from '../../utils/helpers';
import { SALON_WHATSAPP } from '../../utils/data';
import '../../styles/index.css';

export function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const handleChat = () => {
    const msg = encodeURIComponent("Hi! I'd like to book an appointment at Rashmi Beauty Salon & Spa 🌸");
    openWhatsApp(msg, SALON_WHATSAPP);
  };

  return (
    <>
      {/* Keyframe styles */}
      <style>{`
        @keyframes wa-ripple {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        @keyframes wa-ripple2 {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes wa-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-5px) rotate(-4deg); }
          60% { transform: translateY(-3px) rotate(3deg); }
        }
        @keyframes wa-shine {
          0% { left: -60%; opacity: 0; }
          20% { opacity: 1; }
          100% { left: 120%; opacity: 0; }
        }
        @keyframes label-in {
          0% { opacity: 0; transform: translateX(10px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .wa-btn-bob { animation: wa-bob 3s ease-in-out infinite; }
        .wa-btn-bob:hover { animation: none; }

        .wa-ripple-1 {
          position: absolute; inset: 0; border-radius: 9999px;
          background: rgba(37, 211, 102, 0.45);
          animation: wa-ripple 2s ease-out infinite;
        }
        .wa-ripple-2 {
          position: absolute; inset: 0; border-radius: 9999px;
          background: rgba(37, 211, 102, 0.25);
          animation: wa-ripple2 2s ease-out infinite 0.65s;
        }
        .wa-shine::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.38), transparent);
          animation: wa-shine 3.5s ease-in-out infinite 1.2s;
        }
        .wa-label-animate { animation: label-in 0.25s ease-out both; }
      `}</style>

      <div className="fixed bottom-7 right-7 z-[999] flex flex-col items-end gap-3">

        {/* Tooltip label */}
        {hovered && (
          <div className="wa-label-animate flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none">
            <span className="text-[10px]">💬</span>
            Chat with us on WhatsApp
          </div>
        )}

        {/* Button wrapper for ripples */}
        <div className="relative flex items-center justify-center">
          {/* Ripple rings */}
          <div className="wa-ripple-1" />
          <div className="wa-ripple-2" />

          {/* Main button */}
          <button
            onClick={handleChat}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Chat on WhatsApp"
            className="wa-btn-bob wa-shine relative z-10 w-[62px] h-[62px] rounded-full flex items-center justify-center cursor-pointer border-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #29d06b 0%, #25d366 40%, #128C7E 100%)',
              boxShadow: '0 6px 28px rgba(37,211,102,0.55), 0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            {/* Inner glow ring */}
            <span
              className="absolute inset-[3px] rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
            <WhatsAppIcon size={32} />
          </button>
        </div>
      </div>
    </>
  );
}