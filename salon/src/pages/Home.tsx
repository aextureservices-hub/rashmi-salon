
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
  {
    image: 'https://instagram.frpr5-1.fna.fbcdn.net/v/t51.82787-15/658821379_17932422384228007_9144910755359512669_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzg2NDgxNDQyMDExOTkwMDY2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNDl4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=ZtIDGE-NDiAQ7kNvwHTNfnh&_nc_oc=AdpopLfS0jZHx35sHjbFrz0qa2yRJwJtX50AqTSUc1bXe4p9n8Sqs0y2SNFNYBIc5Ny9oOGlT6Rgp2yIltn_2tHe&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.frpr5-1.fna&_nc_gid=MDGZ79R9BqLPb5t8d74RvA&_nc_ss=7a22e&oh=00_Af4Xp9as2WL_zUd4Jr-qiuHHxjvPP26CpBM-AUD9gMnH7Q&oe=69FD0E0B',
    title: 'Hair Transformation',
    subtitle: 'Balayage + Cut + Style',
  },
  {
    image: '/images/transformations/facial.jpg',
    title: 'Glow Facial',
    subtitle: 'Deep Cleanse + Hydration',
  },
  {
    image: '/images/transformations/nails.jpg',
    title: 'Nail Art',
    subtitle: 'Gel Polish + Design',
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero (Image Slider) ──────────────────────────────────────────── */}
      <HeroSection />

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
                      
                      {/* Single image split into Before / After */}
                      <div className="relative h-[200px] overflow-hidden">
                        
                        {/* BEFORE — left half: grayscale */}
                        <div className="absolute inset-0 w-full h-full">
                          <img
                            src={t.image}
                            alt={`${t.title} before`}
                            className="w-full h-full object-cover"
                            style={{ filter: 'grayscale(100%) brightness(0.85)' }}
                          />
                        </div>

                        {/* AFTER — right half: full color, clipped to right 50% */}
                        <div className="absolute inset-0 w-full h-full" style={{ clipPath: 'inset(0 0 0 50%)' }}>
                          <img
                            src={t.image}
                            alt={`${t.title} after`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Center divider line */}
                        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/90 z-10" />

                        {/* Center divider handle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9d4c6f" strokeWidth="2.5">
                            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3"/>
                          </svg>
                        </div>

                        {/* Before label */}
                        <span className="absolute bottom-2 left-3 z-10 text-[10px] font-semibold tracking-widest uppercase text-white bg-black/40 px-2 py-0.5 rounded-full">
                          Before
                        </span>

                        {/* After label */}
                        <span className="absolute bottom-2 right-3 z-10 text-[10px] font-semibold tracking-widest uppercase text-white bg-rose-deep/70 px-2 py-0.5 rounded-full">
                          After
                        </span>
                      </div>

                      {/* Card footer */}
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