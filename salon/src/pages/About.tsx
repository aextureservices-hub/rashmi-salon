import { TEAM_MEMBERS, VALUES } from '../utils/data';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FadeIn } from '../components/ui/FadeIn';
import '../styles/index.css'

export default function About() {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="px-[5%] pt-[120px] pb-16"
        style={{ background: 'linear-gradient(135deg,#FFF0F8,#F5EEFF)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs tracking-[3px] uppercase text-rose-deep font-semibold mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-salon-text max-w-[600px] leading-tight mb-4">
            Where Passion Meets Artistry 🌸
          </h1>
          <p className="text-base text-salon-muted leading-relaxed max-w-[600px]">
            Founded in 2018, Lumina Beauty Studio was born from a simple belief — every woman deserves to feel extraordinary.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20 px-[5%] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <SectionHeader
              tag="Meet the Team"
              title="The Artists Behind Your Glow"
              center
            />
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map(member => (
                <div
                  key={member.id}
                  className="text-center bg-white rounded-3xl p-8 shadow-[0_4px_25px_rgba(232,125,170,0.1)] border border-rose-soft/20 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(232,125,170,0.2)]"
                >
                  <div className="w-[90px] h-[90px] rounded-full mx-auto mb-4 flex items-center justify-center text-[36px] bg-gradient-to-br from-rose-soft to-lavender border-[3px] border-white shadow-[0_4px_20px_rgba(232,125,170,0.25)]">
                    {member.avatar}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-salon-text mb-1">{member.name}</h3>
                  <p className="text-[13px] text-rose-deep font-medium mb-2.5">{member.role}</p>
                  <p className="text-xs text-salon-muted leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Values */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {VALUES.map(value => (
                <div
                  key={value.id}
                  className="p-7 rounded-[20px] border border-rose-soft/20 bg-white transition-all duration-300 hover:shadow-[0_12px_40px_rgba(232,125,170,0.15)] hover:-translate-y-1"
                >
                  <div className="text-[32px] mb-3.5">{value.icon}</div>
                  <h4 className="font-display text-lg font-semibold text-salon-text mb-2">{value.title}</h4>
                  <p className="text-[13px] text-salon-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
