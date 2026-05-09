import  { useState, useEffect } from 'react';
import { P } from '../utils/palette';
import { GalleryGrid } from '../components/sections/GalleryGrid';
import type{ GalleryItem } from '../components/sections/GalleryGrid'; 
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image7.jpeg"
import image3 from "../assets/image13.jpeg"
import image4 from "../assets/bride2.jpeg"
import image5 from "../assets/img5.jpg"
import image6 from "../assets/image10.jpeg"
import image7 from "../assets/image6.jpeg"
import image8 from "../assets/image9.jpeg"
import image9 from "../assets/img10.jpg"
import image10 from "../assets/img7.jpg"
import image11 from "../assets/img4.jpg"
import image12 from "../assets/image2.jpeg"
import image13 from "../assets/img3.jpg"
import image14 from "../assets/img2.jpg"
import image15 from "../assets/img8.jpg"
import image16 from "../assets/img22.jpg"
import image17 from "../assets/image18.jpeg"
import image18 from "../assets/img21.jpg"
import image19 from "../assets/img6.jpg"
import image20 from "../assets/bride.jpg"

const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1',  label: 'Bridal Elegance',   category: 'Makeup',    image: image1, gradient: 'linear-gradient(135deg,#3D1A2E,#6B3050)', tall: true },
  { id: '2',  label: 'Golden Highlights', category: 'Bridal', image: image2, gradient: 'linear-gradient(135deg,#4A2010,#B8894E)' },
  { id: '3',  label: 'Pearl Glam',        category: 'Makeup',     image: image3, gradient: 'linear-gradient(135deg,#2A1030,#8B4865)' },
  { id: '4',  label: 'Silk Drape Saree',  category: 'Bridal',    image: image4, gradient: 'linear-gradient(135deg,#1C0F1A,#D4A96A)', tall: true },
  { id: '5',  label: 'Dewy Skin Ritual',  category: 'Makeup',   image: image5, gradient: 'linear-gradient(135deg,#2E1628,#E8C9B8)' },
  { id: '6',  label: 'Smokey Romance',    category: 'Bridal',     image: image6, gradient: 'linear-gradient(135deg,#1C0F1A,#8B4865)' },
  { id: '7',  label: 'Luxe Nail Art',     category: 'Makeup',      image: image7, gradient: 'linear-gradient(135deg,#3D1A2E,#D4A96A)', tall: true },
  { id: '8',  label: 'Royal Mehndi',      category: 'Makeup',     image: image8, gradient: 'linear-gradient(135deg,#2E1628,#6B3050)' },
  { id: '9',  label: 'Glass Skin Finish', category: 'Makeup',   image: image9, gradient: 'linear-gradient(135deg,#241020,#B8894E)' },
  { id: '10', label: 'Celestial Updo',    category: 'Bridal',  image: image10, gradient: 'linear-gradient(135deg,#2E1628,#D4A96A)', tall: true },
  { id: '11', label: 'Balayage Dreams',   category: 'Bridal', image: image11, gradient: 'linear-gradient(135deg,#3D1A2E,#E8C9B8)' },
  { id: '12', label: 'Heritage Look',     category: 'Makeup',     image: image12, gradient: 'linear-gradient(135deg,#1C0F1A,#8B4865)' },
  { id: '13',  label: 'Golden Highlights', category: 'Makeup', image: image13, gradient: 'linear-gradient(135deg,#4A2010,#B8894E)' },
  { id: '14',  label: 'Silk Drape Saree',  category: 'Makeup',    image: image14, gradient: 'linear-gradient(135deg,#1C0F1A,#D4A96A)', tall: true },
  { id: '15',  label: 'Dewy Skin Ritual',  category: 'Makeup',   image: image15, gradient: 'linear-gradient(135deg,#2E1628,#E8C9B8)' },
  { id: '16',  label: 'Smokey Romance',    category: 'Makeup',     image: image16, gradient: 'linear-gradient(135deg,#1C0F1A,#8B4865)' },
  { id: '17',  label: 'Luxe Nail Art',     category: 'Bridal',      image: image17, gradient: 'linear-gradient(135deg,#3D1A2E,#D4A96A)', tall: true },
  { id: '18',  label: 'Royal Mehndi',      category: 'Bridal',     image: image18, gradient: 'linear-gradient(135deg,#2E1628,#6B3050)' },
  { id: '19',  label: 'Glass Skin Finish', category: 'Makeup',   image: image19, gradient: 'linear-gradient(135deg,#241020,#B8894E)' },
  { id: '20', label: 'Celestial Updo',    category: 'Bridal',  image: image20, gradient: 'linear-gradient(135deg,#2E1628,#D4A96A)', tall: true },
];

const CATEGORIES = ['All', ...Array.from(new Set(GALLERY_ITEMS.map(i => i.category)))];


const injectGalleryStyles = () => {
  if (document.getElementById('gallery-premium-styles')) return;
  const style = document.createElement('style');
  style.id = 'gallery-premium-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

    .pg-card {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid ${P.border};
      cursor: pointer;
      transform: translateY(18px);
      opacity: 0;
      transition: transform 0.65s cubic-bezier(0.22,1,0.36,1),
                  opacity 0.65s ease,
                  box-shadow 0.4s ease,
                  border-color 0.4s ease;
    }
    .pg-card.visible { transform: translateY(0); opacity: 1; }
    .pg-card:hover {
      border-color: ${P.borderHot};
      box-shadow: 0 8px 40px ${P.glow}, 0 0 0 1px ${P.borderMid};
    }
    .pg-card:hover .pg-overlay { opacity: 1; transform: translateY(0); }
    .pg-card:hover .pg-img-wrap::after { opacity: 1; }
    
    .pg-img-wrap { width: 100%; height: 100%; position: relative; }
    .pg-img-wrap::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(28,15,26,0.92) 100%);
      opacity: 0.7;
      transition: opacity 0.4s ease;
    }

    .pg-placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .pg-placeholder::before {
      content: '✦';
      font-size: 28px;
      color: ${P.textGoldFaint};
      letter-spacing: 6px;
    }

    .pg-overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 20px 18px 16px;
      z-index: 2; opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }

    .pg-shimmer {
      position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(212,169,106,0.07) 50%, transparent 60%);
      background-size: 200% 100%;
      animation: shimmer 3.5s infinite;
      pointer-events: none;
      z-index: 1;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .pg-filter-btn {
      background: transparent;
      border: 1px solid ${P.borderMid};
      color: ${P.textMuted};
      padding: 7px 20px;
      border-radius: 100px;
      font-family: 'Jost', sans-serif;
      font-size: 13px;
      letter-spacing: 1.5px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
    }
    .pg-filter-btn:hover { border-color: ${P.borderHot}; color: ${P.textGold}; }
    .pg-filter-btn.active {
      background: linear-gradient(135deg, ${P.goldDark}, ${P.gold});
      border-color: transparent;
      color: ${P.bg};
      font-weight: 500;
    }

    .pg-grid { columns: 3 260px; column-gap: 4px; }
    .pg-col-item { break-inside: avoid; margin-bottom: 16px; }
    @media (max-width: 640px) { .pg-grid { columns: 2 160px; } }
  `;
  document.head.appendChild(style);
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  useEffect(() => { injectGalleryStyles(); }, []);

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "'Jost', sans-serif" }}>
      {/* Hero Section */}
      <header style={{ background: `linear-gradient(160deg, ${P.section} 0%, ${P.bg} 70%)`, borderBottom: `1px solid ${P.border}`, padding: '100px 5% 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: P.glow, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase', color: P.textGold, marginBottom: 16, fontWeight: 500 }}>Our Portfolio</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 300, fontStyle: 'italic', background: P.gradText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A Glimpse of Our Magic</h1>
      </header>

      {/* Gallery Section */}
      <section style={{ padding: '64px 5% 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`pg-filter-btn${activeFilter === cat ? ' active' : ''}`} onClick={() => setActiveFilter(cat)}>{cat}</button>
            ))}
          </div>
          <GalleryGrid items={GALLERY_ITEMS} activeFilter={activeFilter} />
        </div>
      </section>
    </div>
  );
}