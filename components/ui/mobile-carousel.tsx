'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselProps = {
  children: ReactNode[];
  className?: string;
  itemWidth?: string;
};

export default function MobileCarousel({ children, className = '', itemWidth = 'w-[82%] sm:w-[48%]' }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / children.length));
    setActiveIndex(Math.max(0, Math.min(children.length - 1, idx)));
  };

  useEffect(() => {
    updateState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    return () => {
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [children.length]);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 360), behavior: 'smooth' });
  };

  if (children.length === 0) return null;

  return (
    <div className={`relative lg:hidden ${className}`}>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children.map((child, i) => (
          <div key={i} className={`snap-center shrink-0 ${itemWidth}`}>
            {child}
          </div>
        ))}
      </div>

      {canLeft && (
        <button
          onClick={() => scrollBy(-1)}
          className="absolute top-[40%] -left-2 -translate-y-1/2 w-9 h-9 rounded-full surface-abyss border border-brand-edge flex items-center justify-center shadow-card text-white hover:scale-110 transition-transform z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
      )}
      {canRight && (
        <button
          onClick={() => scrollBy(1)}
          className="absolute top-[40%] -right-2 -translate-y-1/2 w-9 h-9 rounded-full surface-abyss border border-brand-edge flex items-center justify-center shadow-card text-white hover:scale-110 transition-transform z-10"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {children.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {children.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === activeIndex ? 'w-5 bg-brand-primary' : 'w-1.5 bg-brand-edge'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
