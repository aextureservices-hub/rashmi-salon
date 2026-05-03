// src/components/gallery/GalleryGrid.tsx
import { useEffect, useRef } from 'react';
import { GALLERY_ITEMS } from '../../utils/data';
import type { GalleryItem } from '../../types';

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 60);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className={`g-card${item.tall ? ' tall' : ''}`}>
      <div
        className="g-placeholder"
        style={{ background: item.gradient ?? '#fde8f3' }}
      />
      <img
        src={item.image}
        alt={item.label}
        loading="lazy"
        style={{ minHeight: item.tall ? '310px' : '150px' }}
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = 'none';
          const ph = img.previousElementSibling as HTMLElement;
          if (ph) { ph.style.display = 'block'; ph.style.minHeight = img.style.minHeight; }
        }}
      />
      <div className="g-overlay">
        <span className="g-label">{item.label}</span>
        <span className="g-tag">{item.category}</span>
      </div>
    </div>
  );
}

export function GalleryGrid() {
  return (
    <div className="g-wrap">
      <div className="g-head">
        <h2>Our Gallery</h2>
        <p>crafted with care · every look a story</p>
      </div>
      <div className="g-grid">
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}