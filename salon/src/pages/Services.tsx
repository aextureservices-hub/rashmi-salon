import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/sections/ServiceCard';
import { SERVICES } from '../utils/data';
import { cn } from '../utils/helpers';
import type { Service, ServiceCategory } from '../types';
import '../styles/index.css'

type FilterValue = 'all' | ServiceCategory;

const FILTER_TABS: { label: string; value: FilterValue }[] = [
  { label: 'All Services', value: 'all' },
  { label: '💇‍♀️ Hair', value: 'hair' },
  { label: '✨ Skin', value: 'skin' },
  { label: '💅 Nails', value: 'nails' },
  { label: '💄 Makeup', value: 'makeup' },
];

export default function Services() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const navigate = useNavigate();

  const filtered = filter === 'all' ? SERVICES : SERVICES.filter(s => s.category === filter);

  const handleBook = (service: Service) => {
    navigate('/booking', { state: { service: service.name, price: service.price } });
  };

  return (
    <>
      {/* Hero Banner */}
      <div
        className="px-[5%] pt-[120px] pb-16 text-center"
        style={{ background: 'linear-gradient(135deg,#FFF0F8,#F5EEFF)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs tracking-[3px] uppercase text-rose-deep font-semibold mb-3">
            Our Expertise
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-salon-text max-w-[600px] mx-auto mb-4 leading-tight">
            Beauty Treatments Designed for You
          </h1>
          <p className="text-base text-salon-muted max-w-[500px] mx-auto">
            Explore our full range of premium beauty services, each crafted with love and expertise.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Filter Tabs */}
          <div className="flex gap-3 flex-wrap mb-10 justify-center">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  'px-6 py-2.5 rounded-full border-[1.5px] text-sm font-medium cursor-pointer transition-all duration-300',
                  filter === tab.value
                    ? 'bg-gradient-to-br from-rose-deep to-rose-darker text-white border-transparent shadow-[0_4px_18px_rgba(232,125,170,0.35)] -translate-y-0.5'
                    : 'bg-white text-salon-muted border-rose-deep/30 hover:border-rose-deep/60'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(service => (
              <ServiceCard key={service.id} service={service} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
