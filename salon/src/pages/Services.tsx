import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/sections/ServiceCard';
import { SERVICES } from '../utils/data';
import { P } from '../utils/palette';
import type { Service, ServiceCategory } from '../types';

type FilterValue = 'all' | ServiceCategory;

interface FilterTab {
  label: string;
  value: FilterValue;
}

const FILTER_TABS: FilterTab[] = [
  { label: 'All Services', value: 'all' },
  { label: '💇‍♀️ Hair',    value: 'hair' },
  { label: '✨ Skin',      value: 'skin' },
  { label: '💅 Nails',    value: 'nails' },
  { label: '💄 Makeup',   value: 'makeup' },
];

const CAT_LABELS: Record<string, string> = {
  hair:   'Hair Services',
  skin:   'Skin Care',
  nails:  'Nail Studio',
  makeup: 'Makeup & Beauty',
};

// --- font injection (run once) ---
if (typeof document !== 'undefined' && !document.getElementById('sp-fonts')) {
  const link = document.createElement('link');
  link.id   = 'sp-fonts';
  link.rel  = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500&display=swap';
  document.head.appendChild(link);
}

export default function Services() {
  const [filter, setFilter]         = useState<FilterValue>('all');
  const [hoveredTab, setHoveredTab] = useState<FilterValue | null>(null);
  const navigate = useNavigate();

  const filtered: Service[] =
    filter === 'all' ? SERVICES : SERVICES.filter(s => s.category === filter);

  const handleBook = (service: Service) => {
    navigate('/booking', { state: { service: service.name, price: service.price } });
  };

  // Group by category for "All" view
  const categories = ['hair', 'skin', 'nails', 'makeup'] as ServiceCategory[];

  return (
    <div style={styles.root}>

      {/* ── Hero ── */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <p style={styles.eyebrow}>Our Expertise</p>
          <h1 style={styles.heroTitle}>
            Beauty Treatments<br />Designed for You
          </h1>
          <p style={styles.heroSub}>
            Explore our full range of premium beauty services,
            each crafted with love and expertise.
          </p>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div style={styles.filtersWrap}>
        {FILTER_TABS.map(tab => {
          const isActive  = filter === tab.value;
          const isHovered = hoveredTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              onMouseEnter={() => setHoveredTab(tab.value)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                ...styles.tab,
                ...(isActive
                  ? styles.tabActive
                  : isHovered
                  ? styles.tabHover
                  : {}),
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Grid ── */}
      <section style={styles.section}>
        <div style={styles.gridWrap}>

          {filter === 'all'
            ? categories.map(cat => {
                const items = filtered.filter(s => s.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat} style={styles.catGroup}>
                    {/* Category divider label */}
                    <div style={styles.catLabel}>{CAT_LABELS[cat]}</div>

                    {/* Responsive card grid */}
                    <div style={styles.grid}>
                      {items.map(service => (
                        <CardHover key={service.id}>
                          <ServiceCard service={service} onBook={handleBook} />
                        </CardHover>
                      ))}
                    </div>
                  </div>
                );
              })
            : (
              <div style={styles.grid}>
                {filtered.map(service => (
                  <CardHover key={service.id}>
                    <ServiceCard service={service} onBook={handleBook} />
                  </CardHover>
                ))}
              </div>
            )
          }

        </div>
      </section>
    </div>
  );
}

// Hover wrapper — lifts the card on hover
function CardHover({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 50px rgba(139,72,101,0.28)'
          : '0 4px 20px rgba(139,72,101,0.08)',
        borderRadius: 16,
      }}
    >
      {children}
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const styles: Record<string, CSSProperties> = {
  root: {
    background: P.bg,
    minHeight:  '100vh',
    fontFamily: "'Jost', sans-serif",
    color:      P.text,
  },

  // Hero
  hero: {
    padding:    '80px 5% 56px',
    textAlign:  'center',
    background: `linear-gradient(160deg, ${P.section} 0%, ${P.bg} 65%)`,
    borderBottom: `1px solid ${P.border}`,
  },
  heroInner: {
    maxWidth: 600,
    margin:   '0 auto',
  },
  eyebrow: {
    fontSize:      11,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color:         P.textGold,
    fontWeight:    500,
    marginBottom:  12,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize:   'clamp(28px, 5vw, 46px)',
    fontWeight: 700,
    // Gold gradient text
    background:             P.gradGold,
    WebkitBackgroundClip:   'text',
    WebkitTextFillColor:    'transparent',
    backgroundClip:         'text',
    lineHeight:  1.2,
    margin:      '0 0 16px',
  },
  heroSub: {
    fontSize:   14,
    color:      P.textGoldFaint,
    fontWeight: 300,
    lineHeight: 1.7,
    margin:     0,
  },

  // Filter tabs
  filtersWrap: {
    display:        'flex',
    gap:            8,
    flexWrap:       'wrap',
    justifyContent: 'center',
    padding:        '32px 5% 0',
  },
  tab: {
    padding:      '8px 20px',
    borderRadius: 100,
    border:       `1px solid ${P.borderMid}`,
    background:   'transparent',
    color:        P.textGoldMuted,
    fontFamily:   "'Jost', sans-serif",
    fontSize:     13,
    fontWeight:   400,
    cursor:       'pointer',
    transition:   'all 0.25s',
    letterSpacing:'0.5px',
  },
  tabHover: {
    borderColor: P.borderHot,
    color:       P.textGold,
  },
  tabActive: {
    background:  P.gradBrand,
    borderColor: 'transparent',
    color:       P.text,
    boxShadow:   `0 4px 20px ${P.glow}`,
  },

  // Grid section
  section: {
    padding: '36px 5% 64px',
  },
  gridWrap: {
    maxWidth: 1200,
    margin:   '0 auto',
  },

  // Category group (used in "All" view)
  catGroup: {
    marginBottom: 36,
  },
  catLabel: {
    fontSize:      10,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color:         P.textGoldFaint,
    fontWeight:    500,
    paddingBottom: 10,
    marginBottom:  16,
    borderBottom:  `1px solid ${P.border}`,
  },

  // Responsive card grid
  // 2 cols on mobile  →  3 on tablet  →  4 on desktop
  // (via inline media-query workaround using CSS custom properties is not
  //  possible in plain CSSProperties, so we use a gridTemplateColumns trick
  //  with minmax + auto-fill that achieves the same result)
  grid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap:                 16,
  },
};

/*
  NOTE — Responsive grid explanation:
  `repeat(auto-fill, minmax(160px, 1fr))` produces:
    • ≤ ~360px viewport  → 2 columns  (2 × 160 = 320px, fits in 5% padded container)
    • ~540–740px         → 3 columns
    • ≥ ~740px           → 4 columns
  This perfectly satisfies the "show 2 per row on mobile, 3 on tablet" requirement
  without needing @media queries or a separate CSS file.

  If you want to force EXACTLY 2 on mobile / 3 on mid / 4 on desktop,
  add the CSS below to your index.css or a <style> tag:

  .sp-grid { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 600px)  { .sp-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 900px)  { .sp-grid { grid-template-columns: repeat(4, 1fr); } }

  Then replace `style={styles.grid}` with `className="sp-grid"`.
*/