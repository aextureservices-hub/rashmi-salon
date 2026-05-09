import { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO } from '../utils/data';
import type { ContactFormData } from '../types';
import { P } from '../utils/palette';
import {SALON_WHATSAPP} from "../utils/data"

const INITIAL_FORM: ContactFormData = { name: '', email: '', phone: '', message: '' };

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Fade({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

.ct *, .ct *::before, .ct *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ct {
  font-family: 'Jost', sans-serif;
  background: ${P.bg};
  color: ${P.text};
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.ct-display { font-family: 'Cormorant Garamond', serif; }

/* Gold gradient text */
.ct-gold-text {
  background: ${P.gradGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shimmer animation */
.ct-shimmer {
  background: linear-gradient(90deg, ${P.textGold} 0%, #fff8e8 45%, ${P.textGold} 80%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ct-shimmer 4s linear infinite;
}
@keyframes ct-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Grid bg */
.ct-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(${P.border} 1px, transparent 1px),
    linear-gradient(90deg, ${P.border} 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.35;
}

/* Blob */
.ct-blob {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
}

/* Section tag */
.ct-tag {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
  color: ${P.textGold}; font-weight: 600; margin-bottom: 18px;
}
.ct-tag::before, .ct-tag::after {
  content: ''; width: 24px; height: 1px;
  background: ${P.gold}; opacity: 0.6; display: block;
}

/* ── HERO ── */
.ct-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, ${P.section} 0%, ${P.bg} 55%);
  padding: 130px 5% 90px;
  text-align: center;
}
.ct-hero__heading {
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 700; line-height: 1.1;
  color: ${P.text}; margin-bottom: 18px;
}
.ct-hero__sub {
  font-size: 15px; color: ${P.textSub};
  max-width: 480px; margin: 0 auto;
  line-height: 1.8;
}

/* Gold rule */
.ct-rule {
  display: flex; align-items: center; gap: 14px;
  margin: 20px auto 0; max-width: 280px;
}
.ct-rule__line { flex: 1; height: 1px; background: ${P.border}; }
.ct-rule__dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: ${P.gold}; box-shadow: 0 0 8px ${P.gold};
}

/* ── BODY ── */
.ct-body {
  padding: 80px 5% 100px;
  background: ${P.bg};
  position: relative; overflow: hidden;
}
.ct-body__inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 48px; align-items: start;
}

/* ── FORM CARD ── */
.ct-form-card {
  background: ${P.cardBg};
  border: 1px solid ${P.border};
  border-radius: 28px;
  padding: 44px 40px;
  backdrop-filter: blur(16px);
  position: relative; overflow: hidden;
}
.ct-form-card::before {
  content: '';
  position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
  background: ${P.gradGold}; opacity: 0.35;
}
.ct-form-card::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(212,169,106,0.05) 0%, transparent 65%);
}
.ct-form-card__heading {
  font-size: 26px; font-weight: 600;
  color: ${P.text}; margin-bottom: 32px;
  position: relative; z-index: 1;
}

/* Success toast */
.ct-toast {
  background: rgba(212,169,106,0.1);
  border: 1px solid ${P.borderHot};
  border-radius: 14px; padding: 14px 20px;
  margin-bottom: 24px;
  font-size: 13px; color: ${P.textGold};
  font-weight: 500; text-align: center;
  animation: ct-toast-in 0.4s cubic-bezier(0.22,1,0.36,1);
  position: relative; z-index: 1;
}
@keyframes ct-toast-in {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Form fields */
.ct-field { margin-bottom: 22px; position: relative; z-index: 1; }
.ct-label {
  display: block; font-size: 11px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: ${P.textGoldMuted}; margin-bottom: 8px;
}
.ct-input, .ct-textarea {
  width: 100%; padding: 14px 18px;
  background: rgba(28,15,26,0.7);
  border: 1px solid ${P.border};
  border-radius: 14px;
  font-family: 'Jost', sans-serif;
  font-size: 14px; color: ${P.text};
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}
.ct-input::placeholder, .ct-textarea::placeholder {
  color: ${P.textFaint};
}
.ct-input:focus, .ct-textarea:focus {
  border-color: ${P.borderHot};
  background: rgba(46,22,40,0.8);
  box-shadow: 0 0 0 3px rgba(212,169,106,0.08), 0 4px 20px rgba(0,0,0,0.2);
}
.ct-textarea { resize: vertical; min-height: 130px; }

/* Submit button */
.ct-submit {
  width: 100%; padding: 16px 32px;
  background: linear-gradient(135deg, ${P.gold}, ${P.goldDark});
  color: ${P.bg}; border: none;
  border-radius: 50px; cursor: pointer;
  font-family: 'Jost', sans-serif;
  font-size: 12px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  position: relative; z-index: 1;
  box-shadow: 0 8px 32px rgba(212,169,106,0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.ct-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(212,169,106,0.4);
}
.ct-submit:active { transform: translateY(0); }

/* ── INFO PANEL ── */
.ct-info-panel { display: flex; flex-direction: column; gap: 16px; }

/* Info card */
.ct-info-card {
  background: ${P.cardBg};
  border: 1px solid ${P.border};
  border-radius: 20px; padding: 22px 24px;
  backdrop-filter: blur(12px);
  display: flex; align-items: center; gap: 18px;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
.ct-info-card:hover {
  border-color: ${P.borderMid};
  transform: translateX(6px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
}
.ct-info-card__icon {
  width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
  background: rgba(212,169,106,0.1);
  border: 1px solid ${P.borderMid};
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}
.ct-info-card__label {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: ${P.textGoldMuted}; font-weight: 600; margin-bottom: 5px;
}
.ct-info-card__value {
  font-size: 14px; font-weight: 500;
  color: ${P.text}; line-height: 1.5;
  white-space: pre-line;
}

/* Map */
.ct-map {
  border-radius: 20px; overflow: hidden;
  border: 1px solid ${P.border};
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  height: 230px; position: relative;
}
.ct-map::before {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  border-radius: 20px;
  border: 1px solid ${P.borderMid};
}
.ct-map iframe { display: block; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .ct-body__inner { grid-template-columns: 1fr; }
  .ct-form-card { padding: 32px 24px; }
}
`;

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert('Please fill in your name and email ✨');
      return;
    }

    // ── Build WhatsApp message ──────────────────────────────────────────────
    const WHATSAPP_NUMBER = SALON_WHATSAPP; // ← Replace with salon's number (91 = India code, no +)

    const message = [
      `✨ *New Enquiry — Rashmi Beauty Salon*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📞 *Phone:* ${form.phone || 'Not provided'}`,
      ``,
      `💬 *Message:*`,
      form.message || 'No message provided.',
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ct">

        {/* ═══ HERO ═══ */}
        <section className="ct-hero">
          <div className="ct-blob" style={{ width: 500, height: 500, background: P.glow, top: -160, right: -100, opacity: 0.6 }} />
          <div className="ct-blob" style={{ width: 300, height: 300, background: P.glowGold, bottom: -80, left: -60, opacity: 0.4 }} />
          <div className="ct-grid" />

          <div style={{ position: 'relative' }}>
            <Fade>
              <div className="ct-tag">Get in Touch</div>
              <h1 className="ct-hero__heading ct-display">
                We'd Love to<br />
                <span className="ct-shimmer">Hear From You</span>
              </h1>
              <p className="ct-hero__sub">
                Reach out to book an appointment, ask about our services, or simply say hello.
                Our team is here to make you feel extraordinary.
              </p>
              <div className="ct-rule">
                <div className="ct-rule__line" />
                <div className="ct-rule__dot" />
                <div className="ct-rule__line" />
              </div>
            </Fade>
          </div>
        </section>

        {/* ═══ BODY ═══ */}
        <section className="ct-body">
          <div className="ct-blob" style={{ width: 600, height: 600, background: P.glow, top: '10%', left: '-15%', opacity: 0.18 }} />
          <div className="ct-blob" style={{ width: 400, height: 400, background: P.glowGold, bottom: '5%', right: '-10%', opacity: 0.12 }} />

          <div className="ct-body__inner">

            {/* ── Form ── */}
            <Fade delay={60}>
              <div className="ct-form-card">
                <h3 className="ct-form-card__heading ct-display ct-gold-text">
                  Send Us a Message
                </h3>

                {submitted && (
                  <div className="ct-toast">
                    ✨ Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                <div className="ct-field">
                  <label className="ct-label">Your Name</label>
                  <input
                    type="text"
                    className="ct-input"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                </div>

                <div className="ct-field">
                  <label className="ct-label">Email Address</label>
                  <input
                    type="email"
                    className="ct-input"
                    placeholder="priya@example.com"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="ct-field">
                  <label className="ct-label">Phone Number</label>
                  <input
                    type="tel"
                    className="ct-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                </div>

                <div className="ct-field">
                  <label className="ct-label">Message</label>
                  <textarea
                    className="ct-textarea"
                    placeholder="Tell us about your beauty goals..."
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                  />
                </div>

                <button className="ct-submit" onClick={handleSubmit}>
                  Send Message ✦
                </button>
              </div>
            </Fade>

            {/* ── Info Panel ── */}
            <Fade delay={160}>
              <div className="ct-info-panel">
                {CONTACT_INFO.map((info, i) => (
                  <div key={info.label} className="ct-info-card" style={{ transitionDelay: `${i * 60}ms` }}>
                    <div className="ct-info-card__icon">{info.icon}</div>
                    <div>
                      <div className="ct-info-card__label">{info.label}</div>
                      <div className="ct-info-card__value">{info.value}</div>
                    </div>
                  </div>
                ))}

                {/* Map */}
                <div className="ct-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d81.0198356!3d21.0892391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2945926e889bd1:0x4801e5671ac97b20!2sRashmi+Beauty+Salon+%26+Academy!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="230"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rashmi Beauty Salon & Academy"
                  />
                </div>
              </div>
            </Fade>

          </div>
        </section>

      </div>
    </>
  );
}