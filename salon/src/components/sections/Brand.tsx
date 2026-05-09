
import { P } from '../../utils/palette';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

.br *, .br *::before, .br *::after { box-sizing: border-box; margin: 0; padding: 0; }
.br {
  font-family: 'Jost', sans-serif;
  background: ${P.bg};
  padding: 64px 20px 72px;
  position: relative;
  overflow: hidden;
}

/* Ambient blobs */
.br-blob1 {
  position: absolute; top: -80px; right: -80px;
  width: 300px; height: 300px; border-radius: 50%;
  background: ${P.glow}; filter: blur(80px); pointer-events: none;
}
.br-blob2 {
  position: absolute; bottom: -60px; left: -60px;
  width: 240px; height: 240px; border-radius: 50%;
  background: ${P.glowGold}; filter: blur(70px); pointer-events: none;
}

/* Tag */
.br-tag-row { display: flex; justify-content: center; margin-bottom: 14px; }
.br-tag {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
  color: ${P.textGold}; font-weight: 600;
  background: rgba(212,169,106,0.08);
  border: 1px solid ${P.border};
  border-radius: 50px; padding: 6px 18px;
}
.br-tag-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: ${P.gold}; box-shadow: 0 0 7px ${P.gold};
}

/* Heading */
.br-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(34px, 6vw, 50px); font-weight: 700;
  text-align: center; line-height: 1.1;
  color: ${P.text}; margin-bottom: 6px;
  position: relative; z-index: 1;
}
.br-heading span {
  background: ${P.gradGold};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.br-sub {
  text-align: center; font-size: 13px;
  color: ${P.textMuted}; margin-bottom: 40px; letter-spacing: 0.3px;
  position: relative; z-index: 1;
}

/* Gold rule */
.br-rule {
  display: flex; align-items: center; gap: 12px;
  margin: 0 auto 38px; max-width: 200px; position: relative; z-index: 1;
}
.br-rule-line { flex: 1; height: 1px; background: ${P.border}; }
.br-rule-dot { width: 5px; height: 5px; border-radius: 50%; background: ${P.gold}; }

/* Grid */
.br-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: ${P.border};
  border: 1px solid ${P.border};
  border-radius: 20px; overflow: hidden;
  position: relative; z-index: 1;
}

/* Brand cell */
.br-cell {
  background: ${P.bg};
  padding: 30px 16px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px; min-height: 115px;
  transition: background 0.3s;
  position: relative; cursor: default;
}
.br-cell::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(212,169,106,0.05), transparent 70%);
  opacity: 0; transition: opacity 0.3s; pointer-events: none;
}
.br-cell:hover { background: ${P.section}; }
.br-cell:hover::after { opacity: 1; }

/* Logo text styles */
.br-logo {
  font-family: 'Jost', sans-serif;
  font-size: 22px; font-weight: 700;
  letter-spacing: -0.5px;
  color: ${P.text};
  text-align: center; line-height: 1.15;
}
.br-logo--serif {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic; font-size: 18px;
}
.br-logo--spaced { letter-spacing: 5px; font-weight: 400; font-size: 18px; }
.br-logo--light { font-weight: 300; }

.br-logo-tag {
  font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
  color: ${P.textGoldMuted}; font-weight: 500;
}

/* Circle logo wrap (Floractive) */
.br-circle {
  width: 52px; height: 52px; border-radius: 50%;
  border: 1.5px solid ${P.borderMid};
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
}

/* Footer note */
.br-note {
  text-align: center; font-size: 11px;
  color: ${P.textGoldFaint};
  margin-top: 22px; letter-spacing: 1px;
  position: relative; z-index: 1;
}
`;

const BRANDS = [
  {
    render: () => (
      <>
        <div className="br-logo" style={{ fontSize: 24, letterSpacing: 2, fontWeight: 300 }}>L'ORÉAL</div>
        <div className="br-logo-tag">Paris</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-circle">✿</div>
        <div className="br-logo br-logo--serif">Floractive</div>
        <div className="br-logo-tag">Profissional</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-logo" style={{ fontSize: 32, fontWeight: 300, letterSpacing: -2, opacity: 0.9 }}>ℂ𝕡</div>
        <div className="br-logo-tag">Professional</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-logo" style={{ fontSize: 20, fontWeight: 400, letterSpacing: -0.3 }}>Maybelline</div>
        <div className="br-logo-tag">New York</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-logo br-logo--serif" style={{ fontSize: 16 }}>Blossom Kochhar</div>
        <div className="br-logo" style={{ fontSize: 13, fontWeight: 300, letterSpacing: 1.5, marginTop: 2 }}>aroma magic</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-logo" style={{ fontSize: 22, fontWeight: 400, letterSpacing: 2 }}>
          Raaga<sup style={{ fontSize: 10 }}>®</sup>
        </div>
        <div className="br-logo-tag">Professional</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-logo br-logo--spaced" style={{ color: '#E8C9B8' }}>M·A·C</div>
        <div className="br-logo-tag">Cosmetics</div>
      </>
    ),
  },
  {
    render: () => (
      <>
        <div className="br-logo" style={{ fontSize: 22, fontWeight: 200, letterSpacing: 5 }}>NARS</div>
        <div className="br-logo-tag">Beauty</div>
      </>
    ),
  },
];

export default function Brand() {
  return (
    <>
      <style>{CSS}</style>
      <div className="br">
        <div className="br-blob1" />
        <div className="br-blob2" />

        {/* Tag */}
        <div className="br-tag-row">
          <div className="br-tag">
            <div className="br-tag-dot" />
            Associates Brands
          </div>
        </div>

        {/* Heading */}
        <h2 className="br-heading">
          Brands <span>Available</span>
        </h2>
        <p className="br-sub">Premium products trusted by professionals worldwide</p>

        {/* Rule */}
        <div className="br-rule">
          <div className="br-rule-line" />
          <div className="br-rule-dot" />
          <div className="br-rule-line" />
        </div>

        {/* Brand grid */}
        <div className="br-grid">
          {BRANDS.map((brand, i) => (
            <div key={i} className="br-cell">
              {brand.render()}
            </div>
          ))}
        </div>

        <p className="br-note">✦ &nbsp; Authentic products · Salon grade quality · Trusted worldwide &nbsp; ✦</p>
      </div>
    </>
  );
}