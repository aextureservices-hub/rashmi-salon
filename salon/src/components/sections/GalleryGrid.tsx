import { useState } from 'react';
import { GALLERY_ITEMS } from '../../utils/data';
import { cn } from '../../utils/helpers';
import type { GalleryCategory, GalleryItem } from '../../types';
import '../../styles/index.css'

const FILTER_TABS: { label: string; value: 'all' | GalleryCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hair', value: 'hair' },
  { label: 'Makeup', value: 'makeup' },
  { label: 'Nails', value: 'nails' },
];

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div
      className={cn(
        'rounded-[20px] overflow-hidden cursor-pointer relative group transition-all duration-400',
        'hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(232,125,170,0.25)]',
        item.tall && 'row-span-2'
      )}
    >
      <div
        className="gallery-ph flex items-center justify-center text-[40px]"
        style={{
          background: item.gradient,
          height: item.tall ? '220px' : '160px',
        }}
      >
        {item.icon}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,37,53,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white text-[13px] font-medium font-display">{item.label}</span>
      </div>
    </div>
  );
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all');

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === filter);

  return (
    <div>
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
                : 'bg-white text-salon-muted border-rose-deep/30 hover:bg-gradient-to-br hover:from-rose-deep hover:to-rose-darker hover:text-white hover:border-transparent'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: 'auto' }}>
        {filtered.map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
