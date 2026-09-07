'use client';

import { useRef } from 'react';
import EventCard from './EventCard';
import { IEvent } from '@/database';

const SimilarEventsCarousel = ({ events }: { events: IEvent[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (events.length === 0) return null;

  return (
    <div className="relative">
      {/* <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Scroll to previous events"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        <span aria-hidden="true">←</span>
      </button> */}

      <div
        ref={scrollRef}
        role="region"
        aria-label="Similar events"
        tabIndex={0}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {events.map((event) => (
          <div
            key={String(event._id)}
            className="w-full shrink-0 snap-start md:w-1/3 lg:w-1/4"
          >
            <EventCard {...event} />
          </div>
        ))}
      </div>

      {/* <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Scroll to next events"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        <span aria-hidden="true">→</span>
      </button> */}
    </div>
  );
};

export default SimilarEventsCarousel;
