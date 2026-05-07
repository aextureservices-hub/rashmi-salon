import { SectionHeader } from '../components/ui/SectionHeader';
import { FadeIn } from '../components/ui/FadeIn';
import { StatCounter } from '../components/sections/StatCounter';
import { ServiceCard } from '../components/sections/ServiceCard';
import { TestimonialsSlider } from '../components/sections/TestimonialsSlider';
import { HeroSection } from '../components/sections/Herosection';
import { SERVICES, STATS } from '../utils/data';
import { P, DIVIDER } from '../utils/palette';
import '../styles/index.css';
import second from '../assets/faceab.png';
import thired from '../assets/nailsab.png';

const FEATURED_SERVICES = SERVICES.slice(0, 4);

const TRANSFORMATIONS = [
  {
    image: 'https://instagram.frpr5-1.fna.fbcdn.net/v/t51.82787-15/658821379_17932422384228007_9144910755359512669_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzg2NDgxNDQyMDExOTkwMDY2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNDl4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=ZtIDGE-NDiAQ7kNvwHTNfnh&_nc_oc=AdpopLfS0jZHx35sHjbFrz0qa2yRJwJtX50AqTSUc1bXe4p9n8Sqs0y2SNFNYBIc5Ny9oOGlT6Rgp2yIltn_2tHe&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.frpr5-1.fna&_nc_gid=MDGZ79R9BqLPb5t8d74RvA&_nc_ss=7a22e&oh=00_Af4Xp9as2WL_zUd4Jr-qiuHHxjvPP26CpBM-AUD9gMnH7Q&oe=69FD0E0B',
    title: 'Hair Transformation',
    subtitle: 'Balayage + Cut + Style',
  },
  { image: second, title: 'Glow Facial', subtitle: 'Deep Cleanse + Hydration' },
  { image: thired, title: 'Nail Art',    subtitle: 'Gel Polish + Design' },
];

export default function Home() {
  return (
    <div style={{ background: P.bg, minHeight: '100vh' }}>

      {/* ─── Hero ── */}
      <HeroSection />

      {/* ─── Featured Services ── */}
      <FadeIn>
        <section className="py-20 px-[5%]" style={{ background: P.bg }}>
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              tag="What We Offer"
              title="Our Signature Services"
              subtitle="Indulge in our carefully curated beauty treatments, designed to make you feel your absolute best."
              center gold
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <div style={DIVIDER} />

      {/* ─── Stats ── */}
      <FadeIn>
        <section className="py-16 px-[5%]" style={{ background: P.bg }}>
          <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <StatCounter key={stat.id} stat={stat} />
            ))}
          </div>
        </section>
      </FadeIn>

      <div style={DIVIDER} />

      {/* ─── Testimonials ── */}
      <FadeIn>
        <section className="py-20 px-[5%]" style={{ background: P.bg }}>
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader tag="Client Love" title="What They Say About Us" center gold/>
            <TestimonialsSlider />
          </div>
        </section>
      </FadeIn>

      <div style={DIVIDER} />

      {/* ─── Transformations ── */}
      <FadeIn>
        <section className="py-20 px-[5%]" style={{ background: P.bg }}>
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              tag="Transformations"
              title="Before & After Magic ✨"
              subtitle="Real results from our talented artists. Every transformation tells a story."
              center gold
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TRANSFORMATIONS.map(t => (
                <div
                  key={t.title}
                  className="rounded-[20px] overflow-hidden"
                  style={{
                    background: P.cardBg,
                    border: `1px solid ${P.borderMid}`,
                    boxShadow: `0 8px 30px ${P.glow}`,
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${P.glow}, 0 0 0 1px ${P.borderHot}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = '';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${P.glow}`;
                  }}
                >
                  {/* Before / After split */}
                  <div className="relative h-[220px] overflow-hidden">

                    {/* BEFORE — grayscale */}
                    <div className="absolute inset-0">
                      <img
                        src={t.image}
                        alt={`${t.title} before`}
                        className="w-full h-full object-cover"
                        style={{ filter: 'grayscale(100%) brightness(0.68)' }}
                      />
                    </div>

                    {/* AFTER — color, right half */}
                    <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 50%)' }}>
                      <img
                        src={t.image}
                        alt={`${t.title} after`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Warm gold overlay on the after side */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        clipPath: 'inset(0 0 0 50%)',
                        background: 'linear-gradient(160deg,rgba(212,169,106,0.08),transparent 60%)',
                      }}
                    />

                    {/* Divider line */}
                    <div
                      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] z-10"
                      style={{ background: P.blush }}
                    />

                    {/* Divider handle */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: P.gradGold,
                        boxShadow: `0 4px 16px ${P.glow}, 0 0 0 2px ${P.borderHot}`,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.primaryDark} strokeWidth="2.5">
                        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
                      </svg>
                    </div>

                    {/* Before label */}
                    <span
                      className="absolute bottom-3 left-3 z-10 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(28,15,26,0.72)',
                        color: P.textMuted,
                        border: `1px solid ${P.border}`,
                        fontFamily: "'Outfit',sans-serif",
                      }}
                    >
                      Before
                    </span>

                    {/* After label */}
                    <span
                      className="absolute bottom-3 right-3 z-10 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: P.gradBrand,
                        color: P.blush,
                        fontFamily: "'Outfit',sans-serif",
                        boxShadow: `0 4px 12px ${P.glow}`,
                      }}
                    >
                      After
                    </span>
                  </div>

                  {/* Card footer */}
                  <div
                    className="px-5 py-4"
                    style={{ borderTop: `1px solid ${P.border}` }}
                  >
                    <h4
                      className="text-base font-semibold mb-1"
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        color: P.text,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t.title}
                    </h4>
                    <p
                      className="text-xs"
                      style={{
                        color: P.textMuted,
                        fontFamily: "'Outfit',sans-serif",
                        letterSpacing: '0.06em',
                      }}
                    >
                      {t.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}