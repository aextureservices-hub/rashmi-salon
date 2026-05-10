import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import { BookingSteps } from '../components/sections/BookingSteps';
import { BookingCalendar } from '../components/sections/BookingCalendar';
import { BOOKING_SERVICES } from '../utils/data';
import { cn } from '../utils/helpers';
import { P } from '../utils/palette';
import { SALON_WHATSAPP} from '../utils/data';

const TIME_SLOTS = [
  { time: '9:00 AM' },
  { time: '10:00 AM' },
  { time: '11:00 AM' },
  { time: '12:00 PM'},
  { time: '1:00 PM' },
  { time: '2:00 PM' },
  { time: '3:00 PM'},
  { time: '4:00 PM' },
  { time: '5:00 PM' },
  { time: '6:00 PM' },
  { time: '7:00 PM' },
  { time: '8:00 PM' },
];

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

.bk *, .bk *::before, .bk *::after { box-sizing: border-box; margin: 0; padding: 0; }
.bk {
  font-family: 'Jost', sans-serif;
  background: ${P.bg};
  color: ${P.text};
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow-x: hidden;
}
.bk-display { font-family: 'Cormorant Garamond', serif; }

/* Gold gradient text */
.bk-gold-text {
  background: ${P.gradGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shimmer */
.bk-shimmer {
  font-style: italic;
  background: linear-gradient(90deg, ${P.textGold} 0%, #fff8e8 45%, ${P.textGold} 80%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: bk-shimmer 4s linear infinite;
}
@keyframes bk-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

/* Blobs */
.bk-blob {
  position: fixed; border-radius: 50%;
  filter: blur(100px); pointer-events: none; z-index: 0;
}

/* Grid lines */
.bk-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(${P.border} 1px, transparent 1px),
    linear-gradient(90deg, ${P.border} 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.22;
}

/* ── PAGE LAYOUT ── */
.bk-page {
  position: relative; z-index: 1;
  padding: 110px 5% 80px;
  max-width: 800px; margin: 0 auto;
}

/* ── HERO TEXT ── */
.bk-hero { text-align: center; margin-bottom: 44px; }
.bk-tag {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
  color: ${P.textGold}; font-weight: 600; margin-bottom: 16px;
}
.bk-tag::before, .bk-tag::after {
  content: ''; width: 24px; height: 1px;
  background: ${P.gold}; opacity: 0.5; display: block;
}
.bk-hero__heading {
  font-size: clamp(34px, 4.5vw, 54px);
  font-weight: 700; line-height: 1.1; color: ${P.text};
  margin-bottom: 14px;
}
.bk-hero__sub {
  font-size: 14px; color: ${P.textSub}; line-height: 1.75;
  max-width: 420px; margin: 0 auto;
}

/* ── CARD ── */
.bk-card {
  background: ${P.cardBg};
  border: 1px solid ${P.border};
  border-radius: 28px;
  padding: 44px 44px;
  backdrop-filter: blur(20px);
  position: relative; overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,169,106,0.06);
}
.bk-card::before {
  content: '';
  position: absolute; top: 0; left: 12%; right: 12%; height: 1px;
  background: linear-gradient(90deg, transparent, ${P.gold}, transparent);
  opacity: 0.4;
}
.bk-card::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(212,169,106,0.04) 0%, transparent 60%);
}

/* ── STEP HEADING ── */
.bk-step-heading {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 600; text-align: center;
  color: ${P.text}; margin-bottom: 8px;
  position: relative; z-index: 1;
}
.bk-step-sub {
  text-align: center; font-size: 13px;
  color: ${P.textSub}; margin-bottom: 28px;
  position: relative; z-index: 1;
}

/* ── STEP 1: SERVICE GRID ── */
.bk-services-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; position: relative; z-index: 1;
}
.bk-svc-btn {
  padding: 18px 16px; border-radius: 18px;
  border: 1px solid ${P.border};
  background: rgba(28,15,26,0.6);
  cursor: pointer; text-align: left;
  transition: border-color 0.25s ease, background 0.25s ease,
              transform 0.25s ease, box-shadow 0.25s ease;
  position: relative; overflow: hidden;
}
.bk-svc-btn::before {
  content: '';
  position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(212,169,106,0.08), transparent 70%);
  transition: opacity 0.3s ease;
}
.bk-svc-btn:hover::before, .bk-svc-btn--active::before { opacity: 1; }
.bk-svc-btn:hover {
  border-color: ${P.borderMid};
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.bk-svc-btn--active {
  border-color: ${P.borderHot};
  background: rgba(212,169,106,0.08);
  box-shadow: 0 0 0 1px ${P.borderHot}, 0 10px 30px rgba(0,0,0,0.3);
}
.bk-svc-btn__icon { font-size: 26px; margin-bottom: 10px; display: block; }
.bk-svc-btn__name {
  font-size: 13px; font-weight: 600;
  color: ${P.text}; margin-bottom: 4px;
}
.bk-svc-btn__price { font-size: 12px; color: ${P.textGold}; }

/* ── STEP 2 & 3: DATE / TIME ── */
.bk-calendar-wrap { position: relative; z-index: 1; }

.bk-time-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 10px; position: relative; z-index: 1;
}
@media (min-width: 480px) { .bk-time-grid { grid-template-columns: repeat(4, 1fr); } }

.bk-time-btn {
  padding: 13px 8px; border-radius: 14px; text-align: center;
  font-size: 12px; font-weight: 500;
  border: 1px solid ${P.border};
  background: rgba(28,15,26,0.6); color: ${P.text};
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease,
              transform 0.2s ease, box-shadow 0.2s ease;
}
.bk-time-btn:hover:not(:disabled) {
  border-color: ${P.borderMid};
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}
.bk-time-btn--active {
  background: linear-gradient(135deg, ${P.gold}, ${P.goldDark});
  color: ${P.bg}; border-color: transparent;
  box-shadow: 0 6px 24px rgba(212,169,106,0.35);
  font-weight: 700;
}
.bk-time-btn--disabled {
  opacity: 0.3; cursor: not-allowed;
  text-decoration: line-through; color: ${P.textMuted};
}

/* ── STEP 4: DETAILS ── */
.bk-summary {
  background: rgba(212,169,106,0.06);
  border: 1px solid ${P.border};
  border-radius: 16px; padding: 18px 20px;
  margin-bottom: 24px;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 10px; position: relative; z-index: 1;
}
.bk-summary__item-label { font-size: 11px; color: ${P.textMuted}; margin-bottom: 2px; }
.bk-summary__item-value { font-size: 13px; font-weight: 600; color: ${P.text}; }
.bk-summary__item-value--gold { color: ${P.textGold}; }

.bk-fields { display: flex; flex-direction: column; gap: 18px; position: relative; z-index: 1; }
.bk-label {
  display: block; font-size: 10px; font-weight: 600;
  letter-spacing: 1.8px; text-transform: uppercase;
  color: ${P.textGoldMuted}; margin-bottom: 8px;
}
.bk-input, .bk-textarea {
  width: 100%; padding: 14px 18px;
  background: rgba(28,15,26,0.75);
  border: 1px solid ${P.border};
  border-radius: 14px;
  font-family: 'Jost', sans-serif;
  font-size: 14px; color: ${P.text};
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.bk-input::placeholder, .bk-textarea::placeholder { color: ${P.textFaint}; }
.bk-input:focus, .bk-textarea:focus {
  border-color: ${P.borderHot};
  box-shadow: 0 0 0 3px rgba(212,169,106,0.08), 0 4px 20px rgba(0,0,0,0.2);
}
.bk-textarea { resize: vertical; min-height: 90px; }

/* ── STEP 5: SUCCESS ── */
.bk-success { text-align: center; padding: 16px 0; position: relative; z-index: 1; }
.bk-success__ring {
  width: 90px; height: 90px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(212,169,106,0.2), rgba(139,72,101,0.2));
  border: 1px solid ${P.borderHot};
  margin: 0 auto 24px;
  display: flex; align-items: center; justify-content: center;
  font-size: 36px;
  box-shadow: 0 0 0 8px rgba(212,169,106,0.06), 0 0 40px rgba(212,169,106,0.15);
  animation: bk-pop 0.6s cubic-bezier(0.22,1,0.36,1);
}
@keyframes bk-pop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1);   opacity: 1; }
}
.bk-success__heading {
  font-size: 30px; font-weight: 700;
  color: ${P.text}; margin-bottom: 10px;
}
.bk-success__body {
  font-size: 14px; color: ${P.textSub};
  margin-bottom: 28px; line-height: 1.75;
}
.bk-success__summary {
  border: 1px solid ${P.border};
  border-radius: 18px; padding: 22px 24px;
  margin-bottom: 24px; text-align: left;
  background: rgba(212,169,106,0.05);
}
.bk-success__row {
  display: flex; justify-content: space-between;
  align-items: center; padding: 8px 0;
  border-bottom: 1px solid ${P.border};
  font-size: 13px;
}
.bk-success__row:last-child { border-bottom: none; }
.bk-success__row-label { color: ${P.textMuted}; }
.bk-success__row-value { font-weight: 600; color: ${P.text}; }

/* ── NAV BUTTONS ── */
.bk-nav {
  display: flex; justify-content: space-between;
  align-items: center; margin-top: 28px;
  position: relative; z-index: 1;
}
.bk-nav--end { justify-content: flex-end; }

.bk-btn {
  padding: 13px 28px; border-radius: 50px;
  font-family: 'Jost', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 1.8px; text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
}
.bk-btn--next {
  background: linear-gradient(135deg, ${P.gold}, ${P.goldDark});
  color: ${P.bg}; border: none;
  box-shadow: 0 8px 28px rgba(212,169,106,0.3);
}
.bk-btn--next:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(212,169,106,0.4);
}
.bk-btn--back {
  background: transparent;
  color: ${P.textGoldMuted};
  border: 1px solid ${P.border};
}
.bk-btn--back:hover {
  border-color: ${P.borderMid};
  color: ${P.textGold};
  transform: translateY(-1px);
}
.bk-btn--whatsapp {
  width: 100%; display: flex; align-items: center;
  justify-content: center; gap: 10px; margin-bottom: 12px;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #ffffff; border: none;
  box-shadow: 0 8px 28px rgba(37,211,102,0.25);
}
.bk-btn--whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(37,211,102,0.35);
}
.bk-btn--outline {
  width: 100%;
  background: transparent;
  color: ${P.textGoldMuted};
  border: 1px solid ${P.border};
}
.bk-btn--outline:hover {
  border-color: ${P.borderMid};
  color: ${P.textGold};
}

/* Gold rule */
.bk-rule {
  display: flex; align-items: center; gap: 14px;
  margin: 16px auto 0; max-width: 240px;
}
.bk-rule__line { flex: 1; height: 1px; background: ${P.border}; }
.bk-rule__dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: ${P.gold}; box-shadow: 0 0 8px ${P.gold};
}

@media (max-width: 600px) {
  .bk-card { padding: 28px 20px; }
  .bk-services-grid { grid-template-columns: 1fr; }
}
/* ── Service card image ── */
.bk-svc-img-wrap {
  position: relative;
  height: 280px;
  overflow: hidden;
  border-radius: 17px 17px 0 0;
}
.bk-svc-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.4s ease;
}
.bk-svc-btn:hover .bk-svc-img { transform: scale(1.06); }
.bk-svc-btn--active .bk-svc-img { transform: scale(1.06); }

.bk-svc-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(28,15,26,0.65) 100%);
  pointer-events: none;
}

.bk-svc-info {
  padding: 10px 12px 12px;
  text-align: left;
}
`;

export default function Booking() {
  const location = useLocation();
  const {
    currentStep, booking, details,
    selectService, selectDate, selectTime,
    updateDetails, goToStep, confirmBooking,
     reset,
  } = useBooking();

  useEffect(() => {
    const state = location.state as { service?: string; price?: string } | null;
    if (state?.service && state?.price) {
      selectService(state.service, state.price);
      goToStep(2);
    }
  }, [location.state, selectService, goToStep]);

   

  const handleConfirm = () => {
    if (!booking.service || !booking.dateLabel || !booking.time) {
      alert('Please complete all steps first ✨');
      return;
    }
    if (!details.name || !details.phone) {
      alert('Please enter your name and phone number ✨');
      return;
    }

    const message = [
      `✨ *New Appointment — Rashmi Beauty Salon*`,
      ``,
      `💅 *Service:* ${booking.service}`,
      `📅 *Date:*    ${booking.dateLabel}`,
      `⏰ *Time:*    ${booking.time}`,
      `💰 *Price:*   ${booking.servicePrice}`,
      ``,
      `👤 *Name:*    ${details.name}`,
      `📞 *Phone:*   ${details.phone}`,
      details.notes ? `📝 *Notes:*   ${details.notes}` : '',
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${SALON_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    confirmBooking(); // advance to step 5
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="bk">

        {/* Ambient blobs */}
        <div className="bk-blob" style={{ width: 560, height: 560, background: P.glow,     top: '-10%', right: '-10%', opacity: 0.55 }} />
        <div className="bk-blob" style={{ width: 400, height: 400, background: P.glowGold, bottom: '5%', left: '-8%',  opacity: 0.4  }} />
        <div className="bk-grid" />

        <div className="bk-page">

          {/* Hero */}
          <div className="bk-hero">
            <div className="bk-tag">Reserve Your Spot</div>
            <h1 className="bk-hero__heading bk-display">
              Book Your<br />
              <span className="bk-shimmer">Appointment</span>
            </h1>
            <p className="bk-hero__sub">
              Choose your service, pick a date and time, and we'll take care of the rest.
            </p>
            <div className="bk-rule">
              <div className="bk-rule__line" />
              <div className="bk-rule__dot" />
              <div className="bk-rule__line" />
            </div>
          </div>

          {/* Main card */}
          <div className="bk-card">
            <BookingSteps currentStep={currentStep} />

            
           {/* ── Step 1: Service ── */}
            {currentStep === 1 && (
              <div>
                <h3 className="bk-step-heading bk-display bk-gold-text">Choose Your Service</h3>
                <p className="bk-step-sub">What would you like to experience today?</p>

                <div className="bk-services-grid">
                  {BOOKING_SERVICES.map((svc, i) => (
                    <button
                      key={svc.name}
                      onClick={() => selectService(svc.name, svc.price)}
                      className={cn('bk-svc-btn', booking.service === svc.name && 'bk-svc-btn--active')}
                      style={{ animationDelay: `${i * 60}ms`, padding: 0 }}  // remove padding so image fills top
                    >
                      {/* Image thumbnail */}
                      <div className="bk-svc-img-wrap">
                        <img src={svc.image} alt={svc.name} className="bk-svc-img" />
                        <div className="bk-svc-img-overlay" />
                      </div>

                      {/* Text below */}
                      <div className="bk-svc-info">
                        <div className="bk-svc-btn__name">{svc.name}</div>
                        <div className="bk-svc-btn__price">from {svc.price}</div>
                      </div>
                    </button>
                  ))}
    </div>

    <div className="bk-nav bk-nav--end">
      <button className="bk-btn bk-btn--next" onClick={() => goToStep(2)}>
        Next →
                      </button>
                    </div>
                  </div>
                )}

            {/* ── Step 2: Date ── */}
            {currentStep === 2 && (
              <div>
                <h3 className="bk-step-heading bk-display bk-gold-text">Select a Date</h3>
                <p className="bk-step-sub">Choose your preferred appointment date</p>

                <div className="bk-calendar-wrap">
                  <BookingCalendar
                    selectedDateLabel={booking.dateLabel}
                    onSelectDate={selectDate}
                  />
                </div>

                <div className="bk-nav">
                  <button className="bk-btn bk-btn--back" onClick={() => goToStep(1)}>← Back</button>
                  <button className="bk-btn bk-btn--next" onClick={() => goToStep(3)}>Next →</button>
                </div>
              </div>
            )}

            {/* ── Step 3: Time ── */}
            {currentStep === 3 && (
              <div>
                <h3 className="bk-step-heading bk-display bk-gold-text">Choose a Time</h3>
                <p className="bk-step-sub">Select your preferred time slot</p>

                <div className="bk-time-grid">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot.time}
                      disabled={slot.unavailable}
                      onClick={() => !slot.unavailable && selectTime(slot.time)}
                      className={cn(
                        'bk-time-btn',
                        slot.unavailable         && 'bk-time-btn--disabled',
                        booking.time === slot.time && 'bk-time-btn--active',
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                <div className="bk-nav">
                  <button className="bk-btn bk-btn--back" onClick={() => goToStep(2)}>← Back</button>
                  <button className="bk-btn bk-btn--next" onClick={() => goToStep(4)}>Next: →</button>
                </div>
              </div>
            )}

            {/* ── Step 4: Details ── */}
            {currentStep === 4 && (
              <div>
                <h3 className="bk-step-heading bk-display bk-gold-text">Your Details</h3>
                <p className="bk-step-sub">Almost done — fill in your details to confirm.</p>

                {/* Summary */}
                <div className="bk-summary">
                  {[
                    { label: 'Service', value: booking.service },
                    { label: 'Date',    value: booking.dateLabel },
                    { label: 'Time',    value: booking.time },
                    { label: 'Price',   value: booking.servicePrice, gold: true },
                  ].map(({ label, value, gold }) => (
                    <div key={label}>
                      <div className="bk-summary__item-label">{label}</div>
                      <div className={cn('bk-summary__item-value', gold && 'bk-summary__item-value--gold')}>
                        {value || '—'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bk-fields">
                  <div>
                    <label className="bk-label">Full Name</label>
                    <input
                      type="text"
                      className="bk-input"
                      placeholder="Your full name"
                      value={details.name}
                      onChange={e => updateDetails('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="bk-label">Your WhatsApp Number</label>
                    <input
                      type="tel"
                      className="bk-input"
                      placeholder="+91 98765 43210"
                      value={details.phone}
                      onChange={e => updateDetails('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="bk-label">Special Requests <span style={{ color: 'var(--bk-faint, rgba(245,236,215,0.3))', fontWeight: 400, letterSpacing: 0, textTransform: 'none', fontSize: '11px' }}>(Optional)</span></label>
                    <textarea
                      className="bk-textarea"
                      placeholder="Any preferences or special notes..."
                      value={details.notes}
                      onChange={e => updateDetails('notes', e.target.value)}
                    />
                  </div>
                </div>

                <div className="bk-nav">
                  <button className="bk-btn bk-btn--back" onClick={() => goToStep(3)}>← Back</button>
                  <button className="bk-btn bk-btn--next" onClick={handleConfirm}>
                    Confirm →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 5: Success ── */}
            {currentStep === 5 && (
              <div className="bk-success">
                <div className="bk-success__ring">✦</div>
                <h3 className="bk-success__heading bk-display bk-gold-text">
                  Booking Confirmed!
                </h3>
                <p className="bk-success__body">
                  Your appointment is ready. Send the details directly via WhatsApp and we'll see you soon!
                </p>

                <div className="bk-success__summary">
                  {[
                    { label: '💅 Service', value: booking.service },
                    { label: '📅 Date',    value: booking.dateLabel },
                    { label: '⏰ Time',    value: booking.time },
                    { label: '👤 Name',    value: details.name },
                    { label: '📞 Phone',   value: details.phone },
                  ].map(({ label, value }) => (
                    <div className="bk-success__row" key={label}>
                      <span className="bk-success__row-label">{label}</span>
                      <span className="bk-success__row-value">{value || '—'}</span>
                    </div>
                  ))}
                </div>
                <button className="bk-btn bk-btn--outline" onClick={reset}>
                  Book Another Appointment ✦
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}