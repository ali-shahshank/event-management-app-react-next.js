'use client';

import Link from 'next/link';
import Image from 'next/image';
import posthog from 'posthog-js';
import { formatTime } from '@/lib/formatTime';

interface props {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ image, title, slug, location, date, time }: props) => {
  return (
    <article className="h-full">
      <Link
        className="event-card group flex h-full flex-col gap-3 rounded-lg transition-shadow duration-200 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary motion-reduce:transition-none"
        href={`/events/${slug}`}
        aria-label={`View event: ${title}, ${date} at ${formatTime(time)}, ${location}`}
        onClick={() =>
          posthog.capture('event_details_opened', {
            event_slug: slug,
            event_location: location,
          })
        }
      >
        <div className="relative w-full aspect-[41/30] overflow-hidden rounded-md">
          <Image
            className="poster object-cover transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            src={image}
            alt={`${title} event banner`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col gap-2 px-1">
          <p className="text-start font-medium text-base sm:text-lg line-clamp-2">
            {title}
          </p>
          <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
            <Image
              src="/icons/pin.svg"
              alt=""
              width={14}
              height={14}
            />
            <span>{location}</span>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="datetime flex items-center gap-2">
              <Image
                src="/icons/calendar.svg"
                alt=""
                height={14}
                width={14}
              />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/clock.svg"
                alt=""
                height={14}
                width={14}
              />
              <span>{formatTime(time)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default EventCard;

export const EventCardSkeleton = () => {
  return (
    <article className="h-full">
      <div className="flex h-full flex-col gap-3 rounded-lg">
        <div
          className="relative w-full aspect-[41/30] overflow-hidden rounded-md
            bg-muted animate-pulse motion-reduce:animate-none"
        />
        <div className="flex flex-col gap-2 px-1">
          <div className="h-4 w-1/2 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="h-5 w-3/4 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="h-4 w-1/3 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="h-4 w-1/4 rounded bg-muted animate-pulse motion-reduce:animate-none" />
        </div>
      </div>
    </article>
  );
};
