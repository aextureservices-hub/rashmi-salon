import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { P } from '../utils/palette';
import { STATS } from '../utils/data';
import { FadeIn } from '../components/ui/FadeIn';
import { StatCounter } from '../components/sections/StatCounter';
import image1 from "../assets/cetificate1.jpeg";
import image2 from "../assets/cetificate2.jpeg";
import image3 from "../assets/cetificate3.jpeg";
import image4 from "../assets/cetificate4.jpeg";
import image5 from "../assets/cetificate5.jpeg";
import image7 from "../assets/cetificate8.jpeg";
import image8 from "../assets/owner.jpeg"

// ─── Types ──────────────────────────────────────────────────────────────────
interface TeamMember {
  id: number;
  avatar: string;
  name: string;
  role: string;
  years: string;
  bio: string;
  imageUrl: string;
}

interface Certification {
  id: number;
  label: string;
  year: string;
  desc: string;
  imageUrl: string;
  badgeColor: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    avatar: '👑',
    imageUrl: image8,
    name: 'Rashmi Hariharno',
    role: 'Founder & Creative Director',
    years: '14+ Years',
    bio: 'A visionary in beauty arts, Rashmi blends traditional Indian techniques with modern luxury aesthetics to create transformative experiences.',
  },
];

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    label: "L'Oréal Professionnel",
    year: '2019',
    desc: 'Globally recognised aesthetics qualification',
    imageUrl: image1,
    badgeColor: '#1a3a6b',
  },
  {
    id: 2,
    label: "L'Oréal Professionnel",
    year: '2025',
    desc: 'Elite hair colour certification',
    imageUrl: image2,
    badgeColor: '#000000',
  },
  {
    id: 3,
    label: 'Color Diploma',
    year: '2024',
    desc: 'Advanced skin & body therapy',
    imageUrl: image3,
    badgeColor: '#c8202f',
  },
  {
    id: 4,
    label: 'International Beauty Academy',
    year: '2013',
    desc: 'Quality management certified salon',
    imageUrl: image4,
    badgeColor: '#cc0000',
  },
  {
    id: 5,
    label: 'Gurukul',
    year: '2018',
    desc: 'Traditional Indian spa therapies',
    imageUrl: image5,
    badgeColor: '#2d6a4f',
  },
  {
    id: 6,
    label: "HARSHA MODI",
    year: '2022',
    desc: 'Authorised style partner',
    imageUrl: image7,
    badgeColor: '#1c1c1c',
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Shared Components ────────────────────────────────────────────────────────
interface FadeProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

function Fade({ children, delay = 0, style, className }: FadeProps) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="ab-section-label">
      <span className="ab-section-label__line" />
      <span className="ab-section-label__text">{text}</span>
      <span className="ab-section-label__line" />
    </div>
  );
}

function GoldRule() {
  return (
    <div className="ab-gold-rule">
      <div className="ab-gold-rule__line" />
      <div className="ab-gold-rule__dot" />
      <div className="ab-gold-rule__line" />
    </div>
  );
}

// ─── Section Components ───────────────────────────────────────────────────────
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="ab-hero">
      <div className="ab-hero__blob ab-hero__blob--tr" />
      <div className="ab-hero__blob ab-hero__blob--bl" />
      <div className="ab-grid-lines" />

      <div className="ab-hero__inner">
        {/* Left Column */}
        <Fade className="ab-hero__left">
          <SectionLabel text="Our Story" />
          <h1 className="ab-hero__heading ab-display">
            Where Passion<br />
            <em className="ab-shimmer">Meets Artistry</em>
          </h1>
          <p className="ab-hero__body">
            Founded in 2012, Rashmi Beauty Salon &amp; Spa was born from a simple belief — every woman
            deserves to feel extraordinary. We craft rituals that honour your beauty, rooted in
            tradition and refined by artistry.
          </p>
          <div className="ab-hero__cta-group">
            <button
              className="ab-btn ab-btn--primary"
              onClick={() => navigate('/booking')}
            >
              Book Experience
            </button>
            <button
              className="ab-btn ab-btn--ghost"
              onClick={() => navigate('/services')}
            >
              Our Services
            </button>
          </div>
        </Fade>

        {/* Right Column */}
        <Fade delay={150} className="ab-hero__right">
          <div className="ab-quote-card ab-pulse">
            <div className="ab-quote-card__inner">
              <p className="ab-quote-card__quote ab-display">
                "Beauty is not in the face; beauty is a light in the heart — and we are here to ignite yours."
              </p>
              <div className="ab-quote-card__author">
                <div className="ab-quote-card__avatar">👑</div>
                <div>
                  <div className="ab-quote-card__name">Rashmi Hariharno</div>
                  <div className="ab-quote-card__role">Founder &amp; Creative Director</div>
                </div>
              </div>
              <div className="ab-quote-card__rating">
                {[...Array(5)].map((_, i) => <span key={i} className="ab-quote-card__star">★</span>)}
                <span className="ab-quote-card__review-count">Rated 5.0 across 600+ reviews</span>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="ab-team">
      <div className="ab-team__blob" />
      <div className="ab-team__inner">
        <Fade style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel text="The Artisans" />
          <h2 className="ab-section-heading ab-display ab-gold-text">
            The Artists Behind Your Glow
          </h2>
          <GoldRule />
          <p className="ab-section-subtext">
            Each member of our team is a trained professional and passionate artist devoted to your transformation.
          </p>
        </Fade>

        <div className="ab-team__grid">
            {TEAM_MEMBERS.map((member, i) => (
              <Fade key={member.id} delay={i * 100}>
                <div className="ab-team-card">
                  <div className="ab-team-card__top-line" />
                  <div className="ab-team-card__avatar ab-float">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="ab-team-card__avatar-img"
                    />
                  </div>
                  <h3 className="ab-team-card__name ab-display">{member.name}</h3>
                  <div className="ab-team-card__role">{member.role}</div>
                  <div className="ab-team-card__badge">{member.years} Experience</div>
                  <p className="ab-team-card__bio">{member.bio}</p>
                </div>
              </Fade>
            ))}
          </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <div className="ab-stats-wrapper">
      <div className="ab-stats-inner">
        <FadeIn>
          <section className="ab-stats-section">
            <div className="ab-stats-grid">
              {STATS.map((stat) => (
                <StatCounter key={stat.id} stat={stat} />
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}

function CertificationCard({ cert, delay }: { cert: Certification; delay: number }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Fade delay={delay}>
      <div
        className="ab-cert-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Full image — no bg, no padding */}
        {!imgError ? (
          <img
            src={cert.imageUrl}
            alt={`${cert.label} certification`}
            className="ab-cert-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="ab-cert-card__img-fallback" style={{ background: `${cert.badgeColor}18` }}>
            <span className="ab-cert-card__img-fallback-initial" style={{ color: cert.badgeColor }}>
              {cert.label.charAt(0)}
            </span>
          </div>
        )}

        {/* Hover overlay — slides up from bottom */}
        <div className={`ab-cert-card__overlay ${hovered ? 'ab-cert-card__overlay--visible' : ''}`}>
          <div className="ab-cert-card__overlay-content">
            <span className="ab-cert-card__overlay-label">{cert.label}</span>
            <span className="ab-cert-card__overlay-year">{cert.year}</span>
          </div>
        </div>
      </div>
    </Fade>
  );
}

function CertificationsSection() {
  return (
    <section className="ab-certs">
      <div className="ab-certs__blob" />
      <div className="ab-certs__inner">
        <Fade style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel text="Credentials" />
          <h2 className="ab-section-heading ab-display ab-gold-text">
            Certified Excellence
          </h2>
          <GoldRule />
          <p className="ab-section-subtext">
            Our accolades are a testament to our relentless pursuit of mastery — from global beauty
            standards to India's finest wellness traditions.
          </p>
        </Fade>

        <div className="ab-certs__grid">
          {CERTIFICATIONS.map((cert, i) => (
            <CertificationCard key={cert.id} cert={cert} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

/* === Reset & Base === */
.ab *, .ab *::before, .ab *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ab {
  font-family: 'Jost', sans-serif;
  background: ${P.bg};
  color: ${P.text};
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.ab-display { font-family: 'Cormorant Garamond', serif; }

/* === Utility === */
.ab-gold-text {
  background: ${P.gradGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ab-shimmer {
  font-style: italic;
  background: linear-gradient(90deg, ${P.textGold} 0%, #fff8e8 45%, ${P.textGold} 80%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ab-shimmer 4.5s linear infinite;
}
@keyframes ab-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes ab-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
.ab-float { animation: ab-float 5s ease-in-out infinite; }

@keyframes ab-pulse {
  0%, 100% { box-shadow: 0 0 24px ${P.glow}; }
  50% { box-shadow: 0 0 48px ${P.glow}, 0 0 72px rgba(212,169,106,0.08); }
}
.ab-pulse { animation: ab-pulse 3.5s ease-in-out infinite; }

/* === Shared Layout === */
.ab-grid-lines {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(${P.border} 1px, transparent 1px),
    linear-gradient(90deg, ${P.border} 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.25;
}

/* === Section Label === */
.ab-section-label {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
  color: ${P.textGold}; font-weight: 600; margin-bottom: 20px;
}
.ab-section-label__line {
  display: block; width: 28px; height: 1px;
  background: ${P.gold}; opacity: 0.5;
}
.ab-section-label__text { display: block; }

/* === Section Typography === */
.ab-section-heading {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.1;
}
.ab-section-subtext {
  font-size: 15px;
  color: ${P.textSub};
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.75;
}

/* === Gold Rule === */
.ab-gold-rule {
  display: flex; align-items: center; gap: 14px;
  margin: 0 0 28px;
}
.ab-gold-rule__line {
  flex: 1; height: 1px; background: ${P.border};
}
.ab-gold-rule__dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: ${P.gold};
  box-shadow: 0 0 8px ${P.gold};
}

/* === Buttons === */
.ab-btn {
  padding: 14px 32px; border-radius: 50px;
  font-family: 'Jost', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; transition: all 0.3s ease;
}
.ab-btn--primary {
  background: ${P.gradBrand}; color: ${P.text};
  border: none;
  box-shadow: 0 8px 28px ${P.glow};
}
.ab-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px ${P.glow};
}
.ab-btn--ghost {
  background: transparent; color: ${P.textGold};
  border: 1px solid ${P.borderHot};
}
.ab-btn--ghost:hover {
  background: rgba(212,169,106,0.06);
  transform: translateY(-2px);
}

/* ─── HERO ─────────────────────────────────────────────────────────────────── */
.ab-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, ${P.section} 0%, ${P.bg} 55%);
  padding: 140px 5% 100px;
}
.ab-hero__blob {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
}
.ab-hero__blob--tr {
  width: 480px; height: 480px;
  background: ${P.glow}; top: -130px; right: -80px; opacity: 0.55;
}
.ab-hero__blob--bl {
  width: 280px; height: 280px;
  background: ${P.glowGold}; bottom: -70px; left: -50px; opacity: 0.35;
}
.ab-hero__inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 64px; align-items: center; position: relative;
}
.ab-hero__left { display: flex; flex-direction: column; align-items: flex-start; }
.ab-hero__heading {
  font-size: clamp(42px, 5vw, 68px);
  font-weight: 700; line-height: 1.1;
  color: ${P.text}; margin-bottom: 24px;
}
.ab-hero__body {
  font-size: 15px; line-height: 1.85;
  color: ${P.textSub}; max-width: 460px; margin-bottom: 36px;
}
.ab-hero__cta-group { display: flex; gap: 14px; flex-wrap: wrap; }

/* Quote card */
.ab-quote-card {
  border: 1px solid ${P.borderMid}; border-radius: 24px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(212,169,106,0.1), transparent, rgba(139,72,101,0.08));
}
.ab-quote-card__inner {
  border-radius: 22px; overflow: hidden;
  background: ${P.cardBg}; backdrop-filter: blur(20px);
  padding: 40px 36px;
}
.ab-quote-card__quote {
  font-size: 20px; font-style: italic; line-height: 1.65;
  color: ${P.textGold}; margin-bottom: 28px;
}
.ab-quote-card__author { display: flex; align-items: center; gap: 14px; }
.ab-quote-card__avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: ${P.gradBrand};
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.ab-quote-card__name { font-size: 14px; font-weight: 600; color: ${P.text}; }
.ab-quote-card__role { font-size: 11px; color: ${P.textMuted}; margin-top: 2px; }
.ab-quote-card__rating {
  margin-top: 24px; padding-top: 22px;
  border-top: 1px solid ${P.border};
  display: flex; align-items: center; gap: 3px;
}
.ab-quote-card__star { color: ${P.gold}; font-size: 13px; }
.ab-quote-card__review-count {
  font-size: 11px; color: ${P.textMuted}; margin-left: 8px;
}

/* ─── TEAM ──────────────────────────────────────────────────────────────────── */
.ab-team {
  padding: 100px 5%; background: ${P.bg};
  position: relative; overflow: hidden;
}
.ab-team__blob {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
  width: 600px; height: 600px;
  background: ${P.glow}; top: 20%; left: -10%; opacity: 0.2;
}
.ab-team__inner { max-width: 1200px; margin: 0 auto; position: relative; }
.ab-team__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Team card */
.ab-team-card {
  background: ${P.cardBg}; border: 1px solid ${P.border};
  border-radius: 24px; padding: 40px 32px; text-align: center;
  backdrop-filter: blur(12px); position: relative; overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
              border-color 0.4s ease, box-shadow 0.4s ease;
}
.ab-team-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(212,169,106,0.06), transparent 60%);
}
.ab-team-card:hover {
  transform: translateY(-10px);
  border-color: ${P.borderHot};
  box-shadow: 0 32px 70px rgba(0,0,0,0.4), 0 0 40px ${P.glow};
}
.ab-team-card__top-line {
  position: absolute; top: 0; left: 15%; right: 15%;
  height: 1px; background: ${P.gradGold}; opacity: 0.4;
}
.ab-team-card__avatar {
  width: 96px; height: 96px; border-radius: 50%;
  margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  font-size: 38px;
  background: linear-gradient(135deg, ${P.section}, ${P.primary});
  border: 2px solid ${P.borderMid};
  box-shadow: 0 0 0 4px ${P.cardBgSolid}, 0 0 0 5px ${P.borderHot}, 0 8px 30px ${P.glow};
  position: relative;
}
.ab-team-card__avatar::after {
  content: ''; position: absolute; inset: -6px;
  border-radius: 50%; border: 1px solid ${P.border};
}
.ab-team-card__name {
  font-size: 22px; font-weight: 600; color: ${P.text}; margin-bottom: 4px;
}
.ab-team-card__role {
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  color: ${P.textGold}; margin-bottom: 10px;
}
.ab-team-card__badge {
  display: inline-block; padding: 3px 14px; border-radius: 50px;
  background: rgba(212,169,106,0.1); border: 1px solid ${P.border};
  font-size: 11px; color: ${P.textGoldMuted}; margin-bottom: 18px;
}
.ab-team-card__bio {
  font-size: 13px; line-height: 1.75; color: ${P.textMuted};
}

/* ─── STATS ─────────────────────────────────────────────────────────────────── */
.ab-stats-wrapper {
  background: ${P.section};
  border-top: 1px solid ${P.border};
  border-bottom: 1px solid ${P.border};
}
.ab-stats-inner { max-width: 1200px; margin: 0 auto; }
.ab-stats-section { padding: 64px 5%; background: ${P.bg}; }
.ab-stats-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 32px; max-width: 900px; margin: 0 auto;
}
@media (min-width: 768px) {
  .ab-stats-grid { grid-template-columns: repeat(4, 1fr); }
}

/* ─── CERTIFICATIONS ─────────────────────────────────────────────────────────── */
.ab-certs {
  padding: 100px 5%;
  background: linear-gradient(180deg, ${P.bg} 0%, ${P.section} 100%);
  position: relative;
  overflow: hidden;
}
.ab-certs__blob {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
  width: 500px; height: 500px;
  background: ${P.glowGold}; bottom: -10%; right: -5%; opacity: 0.15;
}
.ab-certs__inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* ── Centered 3-column grid ── */
.ab-certs__grid {
  display: grid;
  grid-template-columns: repeat(3, 250px);
  gap: 20px;
  justify-content: center;   /* centres the fixed-width columns horizontally */
}

/* Card — fixed size, no stretching */
.ab-cert-card {
  position: relative;
  width: 250px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${P.border};
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.35s ease, transform 0.35s ease;
}
.ab-cert-card:hover {
  border-color: ${P.borderHot};
  box-shadow: 0 20px 56px rgba(0,0,0,0.45), 0 0 32px ${P.glow};
  transform: translateY(-5px);
}

/* Full-bleed image */
.ab-cert-card__img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}
.ab-cert-card:hover .ab-cert-card__img {
  transform: scale(1.05);
}

/* Fallback */
.ab-cert-card__img-fallback {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.ab-cert-card__img-fallback-initial {
  font-family: 'Cormorant Garamond', serif;
  font-size: 72px; font-weight: 700;
}

/* Hover overlay — slides up from bottom */
.ab-cert-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
  display: flex; align-items: flex-end;
  padding: 28px 24px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;
}
.ab-cert-card__overlay--visible {
  opacity: 1;
  transform: translateY(0);
}
.ab-cert-card__overlay-content {
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px; width: 100%;
}
.ab-cert-card__overlay-label {
  font-family: 'Jost', sans-serif;
  font-size: 15px; font-weight: 600;
  color: #ffffff; line-height: 1.3;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}
.ab-cert-card__overlay-year {
  flex-shrink: 0;
  font-size: 10px; font-weight: 600; letter-spacing: 2px;
  color: ${P.textGold};
  background: rgba(212,169,106,0.18);
  border: 1px solid rgba(212,169,106,0.4);
  padding: 4px 13px; border-radius: 50px;
  white-space: nowrap;
  backdrop-filter: blur(6px);
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ab-certs__grid {
    grid-template-columns: repeat(2, 250px);
  }
}
@media (max-width: 600px) {
  .ab-certs__grid {
    grid-template-columns: 250px;
  }
  .ab-hero__inner { grid-template-columns: 1fr; gap: 40px; }
}

.ab-team-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%; /* remove if the avatar is not circular */
}
`;

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ab">
        <HeroSection />
        <TeamSection />
        <StatsSection />
        <CertificationsSection />
      </div>
    </>
  );
}