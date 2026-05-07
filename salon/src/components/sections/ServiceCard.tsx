import { useNavigate } from 'react-router-dom';
import type { Service } from '../../types';
import { P } from '../../utils/palette';

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBook) {
      onBook(service);
    } else {
      navigate('/booking');
    }
  };

  return (
    <div style={styles.card}>
      {/* Image / Icon area */}
      <div style={{ ...styles.imgArea, background: service.gradient }}>
        <span style={styles.icon}>{service.icon}</span>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={styles.name}>{service.name}</h3>
        <p style={styles.desc}>{service.description}</p>

        <div style={styles.footer}>
          <span style={styles.price}>{service.price}</span>
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
            Book Now
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
    borderRadius: 16,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
  },
  imgArea: {
    height: 130,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    lineHeight: 1,
  },
  body: {
    padding: '14px 14px 16px',
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 17,
    fontWeight: 600,
    color: P.textGold,
    margin: '0 0 6px',
    lineHeight: 1.2,
  },
  desc: {
    fontSize: 12,
    color: P.textGoldFaint,
    lineHeight: 1.55,
    margin: '0 0 12px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 18,
    fontWeight: 700,
    color: P.textGold,
  },
  btn: {
    padding: '6px 14px',
    borderRadius: 100,
    background: P.gradBrand,
    border: 'none',
    color: P.text,
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
};