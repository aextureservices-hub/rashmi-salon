import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FadeIn } from '../components/ui/FadeIn';
import { StatCounter } from '../components/sections/StatCounter';
import { ServiceCard } from '../components/sections/ServiceCard';
import { TestimonialsSlider } from '../components/sections/TestimonialsSlider';
import { SERVICES, STATS } from '../utils/data';
import '../styles/index.css'

const FEATURED_SERVICES = SERVICES.slice(0, 4);

const TRANSFORMATIONS = [
  { before: '🙍‍♀️', after: '💁‍♀️', gradient: 'linear-gradient(160deg,#F9D5E5,#EDD5F9)', title: 'Hair Transformation', subtitle: 'Balayage + Cut + Style' },
  { before: '😐', after: '😍', gradient: 'linear-gradient(160deg,#FFE0C4,#F9D5E5)', title: 'Glow Facial', subtitle: 'Deep Cleanse + Hydration' },
  { before: '🤲', after: '💅', gradient: 'linear-gradient(160deg,#EDD5F9,#D5E8FF)', title: 'Nail Art', subtitle: 'Gel Polish + Design' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="min-h-screen relative flex items-center overflow-hidden bg-gradient-hero">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[60px] opacity-50 animate-float bg-radial-rose-soft -top-[100px] -right-[100px]" style={{ background: 'radial-gradient(circle,#F9A8C9,transparent)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[60px] opacity-50 animate-float -bottom-[100px] -left-[100px]" style={{ animationDelay: '3s', background: 'radial-gradient(circle,#E8D5F5,transparent)' }} />
          <div className="absolute w-[300px] h-[300px] rounded-full blur-[60px] opacity-50 animate-float top-1/2 left-1/2" style={{ animationDelay: '5s', background: 'radial-gradient(circle,#FFD6C0,transparent)' }} />
          {/* Sparkles */}
          <span className="absolute top-[15%] left-[10%] text-xl animate-sparkle opacity-60">✦</span>
          <span className="absolute top-[30%] right-[15%] text-xl animate-sparkle opacity-60" style={{ animationDelay: '1s' }}>✿</span>
          <span className="absolute bottom-[25%] left-[20%] text-xl animate-sparkle opacity-60" style={{ animationDelay: '2s' }}>✦</span>
          <span className="absolute top-[60%] right-[8%] text-xl animate-sparkle opacity-60" style={{ animationDelay: '1.5s' }}>✿</span>
        </div>

        <div className="relative z-[2] px-[5%] pt-[120px] pb-20 max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-[10px] border border-rose-soft/40 px-5 py-2 rounded-full text-[13px] text-rose-deep font-medium mb-6 animate-fade-slide-up"
            >
              🌸 Premium Beauty Studio · Est. 2018
            </div>
            <h1
              className="font-display text-[clamp(40px,5vw,68px)] leading-[1.1] font-bold mb-5 animate-fade-slide-up text-salon-text"
              style={{ animationDelay: '0.2s' }}
            >
              Glow Like<br />
              <span className="bg-gradient-to-br from-rose-deep to-purple-500 bg-clip-text text-transparent">
                Never Before
              </span>{' '}✨
            </h1>
            <p
              className="text-base text-salon-muted leading-relaxed mb-9 max-w-[420px] animate-fade-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              Experience luxury beauty treatments crafted for the modern woman. Where confidence meets artistry, and every visit is a transformation.
            </p>
            <div
              className="flex gap-4 flex-wrap animate-fade-slide-up"
              style={{ animationDelay: '0.6s' }}
            >
              <Button variant="primary" onClick={() => navigate('/booking')}>
                Book Appointment 🌸
              </Button>
              <Button variant="outline" onClick={() => navigate('/services')}>
                Explore Services
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
            <div
              className="w-full h-[420px] rounded-[30px] flex items-center justify-center text-[80px] shadow-[0_30px_80px_rgba(232,125,170,0.3)]"
              style={{ background: 'linear-gradient(160deg,#f9cce0 0%,#e8caf5 40%,#cad5f9 80%)' }}
            >
              🌸
            </div>
            {/* Rating Card */}
            <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-[20px] rounded-[20px] p-4 shadow-[0_10px_40px_rgba(232,125,170,0.2)] border border-rose-soft/30">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs font-semibold text-salon-text">4.9 / 5.0 Rating</p>
                  <p className="text-[11px] text-salon-muted">2,400+ happy clients</p>
                </div>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute top-5 -right-2.5 bg-gradient-to-br from-rose-deep to-rose-darker text-white rounded-[20px] px-5 py-3 text-[13px] font-semibold shadow-[0_6px_20px_rgba(232,125,170,0.4)]">
              🏆 #1 Salon in City
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-7 left-1/2 animate-bounce2 flex flex-col items-center gap-2">
          <div className="w-1.5 h-2.5 border-[1.5px] border-salon-muted rounded-sm relative">
            <div className="w-0.5 h-[3px] bg-salon-muted rounded-sm absolute top-0.5 left-1/2 -translate-x-1/2 animate-[scrollDown_1.5s_ease-in-out_infinite]" />
          </div>
          <span className="text-[11px] text-salon-muted tracking-[2px] uppercase">Scroll</span>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────────────────── */}
      <FadeIn>
        <section className="py-16 bg-white border-t border-rose-soft/15">
          <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-[5%]">
            {STATS.map(stat => (
              <StatCounter key={stat.id} stat={stat} />
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ─── Featured Services ────────────────────────────────────────────── */}
      <FadeIn>
        <section
          className="py-20 px-[5%]"
          style={{ background: 'linear-gradient(160deg,#FFF5FB,#F5EEFF,#FFF5FB)' }}
        >
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              tag="What We Offer"
              title="Our Signature Services"
              subtitle="Indulge in our carefully curated beauty treatments, designed to make you feel your absolute best."
              center
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <FadeIn>
        <section
          className="py-20 px-[5%]"
          style={{ background: 'linear-gradient(135deg,#F5EEFF,#FFF0F8)' }}
        >
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader tag="Client Love" title="What They Say About Us" center />
            <TestimonialsSlider />
          </div>
        </section>
      </FadeIn>

      {/* ─── Transformations ─────────────────────────────────────────────── */}
      <FadeIn>
        <section className="py-20 px-[5%] bg-white">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              tag="Transformations"
              title="Before & After Magic ✨"
              subtitle="Real results from our talented artists. Every transformation tells a story."
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TRANSFORMATIONS.map(t => (
                <div key={t.title} className="rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(232,125,170,0.12)]">
                  <div className="grid grid-cols-2">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-[200px] flex items-center justify-center text-[30px]">
                      {t.before}
                    </div>
                    <div className="h-[200px] flex items-center justify-center text-[30px]" style={{ background: t.gradient }}>
                      {t.after}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-display text-base font-semibold text-salon-text">{t.title}</h4>
                    <p className="text-xs text-salon-muted mt-1">{t.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
