import { useNavigate } from 'react-router-dom';
import type { Service } from '../../types';
import { P } from '../../utils/palette';

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
}

export function HomeServiceCard({ service, onBook }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBook) {
      onBook(service);
    } else {
      navigate('/booking', { state: { service: service.name, price: service.price } });
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${P.borderHot}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      }}
    >

      {/* ── Image area ── */}
      <div style={styles.imgWrap}>
        {service.image ? (
          <>
            <img
              src={service.image}
              alt={service.name}
              style={styles.img}
            />
            <div style={styles.imgOverlay} />
          </>
        ) : (
          /* Fallback: gradient bg + emoji icon */
          <div style={{ ...styles.iconFallback, background: service.gradient }}>
            <span style={styles.icon}>{service.icon}</span>
          </div>
        )}

        {/* Price badge floats over image */}
        <span style={styles.priceBadge}>{service.price}</span>
      </div>

      {/* ── Body ── */}
      <div style={styles.body}>
        <h3 style={styles.name}>{service.name}</h3>
        

        <div style={styles.footer}>
          <button
            onClick={handleBook}
            style={styles.btn}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 4px 18px rgba(139,72,101,0.5)';
              (e.currentTarget as HTMLButtonElement).style.transform =
                'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLButtonElement).style.transform =
                'translateY(0)';
            }}
          >
            Book
          </button>
        </div>
      </div>

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: P.cardBgSolid,
    border: `1px solid ${P.border}`,
    borderRadius: 18,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
  },

  /* Image container */
  imgWrap: {
    position: 'relative',
    height: 350,
    overflow: 'hidden',
    flexShrink: 0,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  imgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(28,15,26,0.05) 0%, rgba(28,15,26,0.6) 100%)',
    pointerEvents: 'none',
  },

  /* Emoji fallback */
  iconFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 52,
    lineHeight: 1,
  },

  /* Price badge over image */
  priceBadge: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15,
    fontWeight: 700,
    color: P.textGold,
    background: 'rgba(28,15,26,0.75)',
    border: `1px solid ${P.border}`,
    borderRadius: 50,
    padding: '3px 12px',
    backdropFilter: 'blur(6px)',
    letterSpacing: '0.3px',
  },

  /* Card body */
  body: {
    padding: '14px 16px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flex: 1,
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15,
    fontWeight: 600,
    color: P.text,
    margin: 0,
    lineHeight: 1.2,
  },
  btn: {
    flexShrink: 0,
    padding: '7px 16px',
    borderRadius: 100,
    background: P.gradBrand,
    border: 'none',
    color: P.text,
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.8px',
    transition: 'box-shadow 0.2s, transform 0.2s',
    whiteSpace: 'nowrap',
  },
};