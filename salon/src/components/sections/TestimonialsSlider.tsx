import { useState } from 'react';
import { TESTIMONIALS } from '../../utils/data';
import type { Testimonial } from '../../types';
import '../../styles/index.css'

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="min-w-[340px] bg-white rounded-3xl p-7 shadow-[0_8px_30px_rgba(232,125,170,0.1)] border border-rose-soft/20 flex-shrink-0">
      <div className="text-rose-soft text-base mb-3.5 tracking-[2px]">
        {'★'.repeat(testimonial.rating)}
      </div>
      <p className="text-[15px] text-salon-text leading-relaxed mb-5 italic font-display">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-lg bg-gradient-to-br from-rose-soft to-lavender">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-sm text-salon-text">{testimonial.authorName}</p>
          <p className="text-xs text-salon-muted">{testimonial.authorRole}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSlider() {
  const [pos, setPos] = useState(0);
  const max = TESTIMONIALS.length - 1;

  const slide = (dir: -1 | 1) => {
    setPos(prev => Math.max(0, Math.min(max - 1, prev + dir)));
  };

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{ transform: `translateX(-${pos * 364}px)` }}
        >
          {TESTIMONIALS.map(t => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-6 justify-center">
        {[-1, 1].map((dir, i) => (
          <button
            key={i}
            onClick={() => slide(dir as -1 | 1)}
            className="w-10 h-10 rounded-full border-[1.5px] border-rose-deep/40 bg-white cursor-pointer flex items-center justify-center text-base text-rose-deep hover:bg-rose-deep hover:text-white hover:border-rose-deep transition-all duration-300"
          >
            {dir === -1 ? '←' : '→'}
          </button>
        ))}
      </div>
    </div>
  );
}
