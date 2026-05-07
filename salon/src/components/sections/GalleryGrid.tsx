import  { useEffect, useRef, useState } from 'react';
import { P } from '../../utils/palette';


export interface GalleryItem {
  id: string;
  label: string;
  category: string;
  image: string;
  gradient?: string;
  tall?: boolean;
}

export function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(!item.image);
  const height = item.tall ? 320 : 200;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 55);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div className="pg-col-item">
      <div ref={cardRef} className="pg-card" style={{ height }}>
        <div className="pg-img-wrap">
          {imgFailed ? (
            <div className="pg-placeholder" style={{ background: item.gradient ?? P.section, height }} />
          ) : (
            <img src={item.image} alt={item.label} loading="lazy" onError={() => setImgFailed(true)}
              style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
          )}
        </div>
        <div className="pg-shimmer" />
        <div className="pg-overlay">
          <div style={{ display: 'inline-block', background: P.gradBrand, padding: '2px 10px', borderRadius: 100, marginBottom: 6 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '1.8px', textTransform: 'uppercase', color: P.gold, fontWeight: 500 }}>
              {item.category}
            </span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: P.text, margin: 0, lineHeight: 1.25 }}>
            {item.label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function GalleryGrid({ items, activeFilter }: { items: GalleryItem[], activeFilter: string }) {
  const filtered = activeFilter === 'All' ? items : items.filter(i => i.category === activeFilter);
  return (
    <div className="pg-grid">
      {filtered.map((item, i) => (
        <GalleryCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}