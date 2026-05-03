import { useState } from 'react';
import { CONTACT_INFO } from '../utils/data';
import { Button } from '../components/ui/Button';
import type { ContactFormData } from '../types';
import '../styles/index.css'

const INITIAL_FORM: ContactFormData = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert('Please fill in your name and email 🌸');
      return;
    }
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputCls = 'w-full px-4 py-3 border-[1.5px] border-rose-deep/25 rounded-xl text-sm text-salon-text bg-blush outline-none focus:border-rose-deep focus:bg-white transition-all placeholder:text-salon-muted/50';

  return (
    <>
      {/* Hero Banner */}
      <div
        className="px-[5%] pt-[120px] pb-16 text-center"
        style={{ background: 'linear-gradient(135deg,#FFF0F8,#F5EEFF)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs tracking-[3px] uppercase text-rose-deep font-semibold mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-salon-text leading-tight">
            We'd Love to Hear From You 🌸
          </h1>
        </div>
      </div>

      {/* Contact Content */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-white rounded-3xl p-9 shadow-[0_8px_40px_rgba(232,125,170,0.12)] border border-rose-soft/20">
            <h3 className="font-display text-[22px] font-semibold text-salon-text mb-6">Send us a Message</h3>

            {submitted && (
              <div className="bg-rose-soft/20 border border-rose-deep/20 rounded-xl p-4 mb-5 text-center text-sm text-rose-deep font-medium">
                ✨ Thank you! We'll get back to you within 24 hours.
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-salon-text mb-2">Your Name</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-salon-text mb-2">Email Address</label>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="priya@example.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-salon-text mb-2">Phone Number</label>
                <input
                  type="tel"
                  className={inputCls}
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-salon-text mb-2">Message</label>
                <textarea
                  className={`${inputCls} resize-y min-h-[120px]`}
                  placeholder="Tell us about your beauty goals..."
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                />
              </div>
              <Button variant="primary" fullWidth onClick={handleSubmit}>
                Send Message 💌
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col gap-5">
            {CONTACT_INFO.map(info => (
              <div
                key={info.label}
                className="bg-white rounded-[20px] p-5 border border-rose-soft/20 shadow-[0_4px_20px_rgba(232,125,170,0.08)] flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-soft/20 to-lavender/20 flex items-center justify-center text-lg flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-salon-muted font-medium">{info.label}</p>
                  <p className="text-sm font-semibold text-salon-text mt-0.5 whitespace-pre-line">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div
              className="rounded-[20px] h-[200px] flex items-center justify-center border border-rose-soft/20"
              style={{ background: 'linear-gradient(160deg,#f0e8f8,#f8e0ee)' }}
            >
              <div className="text-center text-salon-muted">
                <div className="text-[32px] mb-2">📍</div>
                <p className="text-[13px] font-medium">12 Rose Garden Lane, Raipur</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[13px] font-semibold text-salon-text mb-3">Follow & Chat With Us</p>
              <div className="flex gap-3">
                {['📸', '🦋', '▶️'].map(icon => (
                  <button
                    key={icon}
                    className="w-[42px] h-[42px] rounded-full border-[1.5px] border-rose-deep/30 bg-white flex items-center justify-center text-base cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-rose-deep hover:to-rose-darker hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,125,170,0.35)]"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
