import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import { BookingSteps } from '../components/sections/BookingSteps';
import { BookingCalendar } from '../components/sections/BookingCalendar';
import { Button } from '../components/ui/Button';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { BOOKING_SERVICES } from '../utils/data';
import { cn } from '../utils/helpers';
import '../styles/index.css'

const TIME_SLOTS = [
  { time: '9:00 AM', unavailable: true },
  { time: '10:00 AM' },
  { time: '11:00 AM' },
  { time: '12:00 PM', unavailable: true },
  { time: '1:00 PM' },
  { time: '2:00 PM' },
  { time: '3:00 PM', unavailable: true },
  { time: '4:00 PM' },
  { time: '5:00 PM' },
  { time: '6:00 PM' },
  { time: '7:00 PM', unavailable: true },
  { time: '7:30 PM' },
];

export default function Booking() {
  const location = useLocation();
  const {
    currentStep, booking, details,
    selectService, selectDate, selectTime,
    updateDetails, goToStep, confirmBooking,
    sendToWhatsApp, reset,
  } = useBooking();

  // Pre-fill from navigation state (e.g. from Services page)
  useEffect(() => {
    const state = location.state as { service?: string; price?: string } | null;
    if (state?.service && state?.price) {
      selectService(state.service, state.price);
      goToStep(2);
    }
  }, [location.state, selectService, goToStep]);

  const handleConfirm = () => {
    const ok = confirmBooking();
    if (!ok) alert('Please fill in your name and phone number, and complete all steps 🌸');
  };

  return (
    <div
      className="min-h-screen px-[5%] py-[100px]"
      style={{ background: 'linear-gradient(160deg,#FFF0F8,#F5EEFF)' }}
    >
      <div className="text-center mb-10">
        <p className="text-xs tracking-[3px] uppercase text-rose-deep font-semibold mb-3">Reserve Your Spot</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-salon-text">
          Book Your Appointment 🌸
        </h1>
      </div>

      <div className="bg-white rounded-[28px] p-10 max-w-[700px] mx-auto shadow-[0_20px_70px_rgba(232,125,170,0.2)] border border-rose-soft/25">
        <BookingSteps currentStep={currentStep} />

        {/* ── Step 1: Service ── */}
        {currentStep === 1 && (
          <div>
            <h3 className="font-display text-[26px] font-semibold text-center text-salon-text mb-2">Choose Your Service</h3>
            <p className="text-center text-salon-muted text-sm mb-7">What would you like to book today?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOOKING_SERVICES.map(svc => (
                <button
                  key={svc.name}
                  onClick={() => selectService(svc.name, svc.price)}
                  className={cn(
                    'p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-left bg-blush',
                    booking.service === svc.name
                      ? 'border-rose-deep bg-rose-soft/10'
                      : 'border-rose-deep/20 hover:border-rose-deep/50'
                  )}
                >
                  <div className="text-2xl mb-2">{svc.icon}</div>
                  <p className="font-semibold text-sm text-salon-text">{svc.name}</p>
                  <p className="text-[13px] text-rose-deep mt-0.5">from {svc.price}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-7">
              <Button variant="next" onClick={() => goToStep(2)}>Next: Pick a Date →</Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Date ── */}
        {currentStep === 2 && (
          <div>
            <h3 className="font-display text-[26px] font-semibold text-center text-salon-text mb-2">Select a Date</h3>
            <p className="text-center text-salon-muted text-sm mb-7">Choose your preferred appointment date</p>

            <BookingCalendar
              selectedDateLabel={booking.dateLabel}
              onSelectDate={selectDate}
            />

            <div className="flex justify-between mt-7">
              <Button variant="back" onClick={() => goToStep(1)}>← Back</Button>
              <Button variant="next" onClick={() => goToStep(3)}>Next: Pick a Time →</Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Time ── */}
        {currentStep === 3 && (
          <div>
            <h3 className="font-display text-[26px] font-semibold text-center text-salon-text mb-2">Choose a Time</h3>
            <p className="text-center text-salon-muted text-sm mb-7">Select your preferred time slot</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot.time}
                  disabled={slot.unavailable}
                  onClick={() => !slot.unavailable && selectTime(slot.time)}
                  className={cn(
                    'py-3 px-2 rounded-xl text-center text-[13px] font-medium cursor-pointer border-[1.5px] transition-all duration-300',
                    slot.unavailable
                      ? 'opacity-35 cursor-default line-through text-salon-muted border-rose-deep/25 bg-blush'
                      : booking.time === slot.time
                        ? 'bg-gradient-to-br from-rose-deep to-rose-darker text-white border-transparent'
                        : 'bg-blush text-salon-text border-rose-deep/25 hover:border-rose-deep hover:bg-rose-soft/15'
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-7">
              <Button variant="back" onClick={() => goToStep(2)}>← Back</Button>
              <Button variant="next" onClick={() => goToStep(4)}>Next: Your Details →</Button>
            </div>
          </div>
        )}

        {/* ── Step 4: Details ── */}
        {currentStep === 4 && (
          <div>
            <h3 className="font-display text-[26px] font-semibold text-center text-salon-text mb-2">Your Details</h3>
            <p className="text-center text-salon-muted text-sm mb-7">Almost done! Just a few details.</p>

            {/* Summary */}
            <div className="bg-blush rounded-2xl p-4 mb-5 text-sm grid grid-cols-2 gap-2">
              {[
                ['Service', booking.service],
                ['Date', booking.dateLabel],
                ['Time', booking.time],
                ['Price', booking.servicePrice],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="text-salon-muted">{label}: </span>
                  <span className={cn('font-semibold', label === 'Price' ? 'text-rose-deep' : 'text-salon-text')}>
                    {value || '—'}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: 'Full Name', field: 'name' as const, type: 'text', placeholder: 'Your full name' },
                { label: 'Phone Number', field: 'phone' as const, type: 'tel', placeholder: '+91 98765 43210' },
              ].map(input => (
                <div key={input.field}>
                  <label className="block text-[13px] font-medium text-salon-text mb-2">{input.label}</label>
                  <input
                    type={input.type}
                    value={details[input.field]}
                    onChange={e => updateDetails(input.field, e.target.value)}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 border-[1.5px] border-rose-deep/25 rounded-xl text-sm text-salon-text bg-blush outline-none focus:border-rose-deep focus:bg-white transition-all placeholder:text-salon-muted/50"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[13px] font-medium text-salon-text mb-2">Special Requests (Optional)</label>
                <textarea
                  value={details.notes}
                  onChange={e => updateDetails('notes', e.target.value)}
                  placeholder="Any preferences or notes..."
                  className="w-full px-4 py-3 border-[1.5px] border-rose-deep/25 rounded-xl text-sm text-salon-text bg-blush outline-none focus:border-rose-deep focus:bg-white transition-all placeholder:text-salon-muted/50 resize-y min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex justify-between mt-7">
              <Button variant="back" onClick={() => goToStep(3)}>← Back</Button>
              <Button variant="next" onClick={handleConfirm}>Confirm & Send to WhatsApp ✉️</Button>
            </div>
          </div>
        )}

        {/* ── Step 5: Success ── */}
        {currentStep === 5 && (
          <div className="text-center py-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-soft to-lavender mx-auto mb-5 flex items-center justify-center text-[36px] animate-pop">
              ✓
            </div>
            <h3 className="font-display text-[28px] font-semibold text-salon-text mb-2.5">
              Booking Confirmed! 🎉
            </h3>
            <p className="text-salon-muted text-[15px] mb-5">
              Your appointment details are ready. Click below to send them instantly via WhatsApp!
            </p>

            {/* Summary Card */}
            <div
              className="rounded-2xl p-5 border border-rose-soft/30 mb-6 text-left text-sm leading-8"
              style={{ background: 'linear-gradient(135deg,rgba(249,168,201,0.15),rgba(232,213,245,0.15))' }}
            >
              {[
                ['💅 Service', booking.service],
                ['📅 Date', booking.dateLabel],
                ['⏰ Time', booking.time],
                ['👤 Name', details.name],
                ['📞 Phone', details.phone],
              ].map(([label, value]) => (
                <div key={label}>
                  {label}: <strong>{value || '—'}</strong>
                </div>
              ))}
            </div>

            <Button
              variant="whatsapp"
              fullWidth
              onClick={sendToWhatsApp}
              className="mb-3.5"
            >
              <WhatsAppIcon size={22} />
              Send Booking via WhatsApp
            </Button>

            <Button variant="outline" fullWidth onClick={reset}>
              Book Another Appointment 🌸
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
