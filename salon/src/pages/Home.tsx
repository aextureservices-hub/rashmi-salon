
import { SectionHeader } from '../components/ui/SectionHeader';
import { FadeIn } from '../components/ui/FadeIn';
import { StatCounter } from '../components/sections/StatCounter';
import { ServiceCard } from '../components/sections/ServiceCard';
import { TestimonialsSlider } from '../components/sections/TestimonialsSlider';
import { HeroSection } from '../components/sections/Herosection';
import { SERVICES, STATS } from '../utils/data';
import '../styles/index.css';

const FEATURED_SERVICES = SERVICES.slice(0, 4);

const TRANSFORMATIONS = [
  { before: '🙍‍♀️', after: '💁‍♀️', gradient: 'linear-gradient(160deg,#F9D5E5,#EDD5F9)', title: 'Hair Transformation', subtitle: 'Balayage + Cut + Style' },
  { before: '😐', after: '😍', gradient: 'linear-gradient(160deg,#FFE0C4,#F9D5E5)', title: 'Glow Facial', subtitle: 'Deep Cleanse + Hydration' },
  { before: '🤲', after: '💅', gradient: 'linear-gradient(160deg,#EDD5F9,#D5E8FF)', title: 'Nail Art', subtitle: 'Gel Polish + Design' },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero (Image Slider) ──────────────────────────────────────────── */}
      <HeroSection />

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