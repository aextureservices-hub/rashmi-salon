import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import type { Service } from '../../types';
import '../../styles/index.css'

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
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(232,125,170,0.1)] border border-rose-soft/20 transition-all duration-400 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(232,125,170,0.2)]">
      <div
        className="h-[180px] flex items-center justify-center text-[60px]"
        style={{ background: service.gradient }}
      >
        {service.icon}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold mb-2 text-salon-text">{service.name}</h3>
        <p className="text-[13px] text-salon-muted leading-relaxed mb-4">{service.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-rose-deep">{service.price}</span>
          <Button variant="sm" onClick={handleBook}>Book Now</Button>
        </div>
      </div>
    </div>
  );
}
