import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { IEvent } from '@/database';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import { getEventBySlug } from '@/lib/actions/getEventBySlug';
import Loading from './loading';
import SimilarEventsCarousel from '@/components/SimilarEvents';

// Event Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: 'Event not found | DevEvent' };
  }

  const description = event.overview || event.description;

  return {
    title: `${event.title} | DevEvent`,
    description,
    openGraph: {
      title: event.title,
      description,
      images: [{ url: event.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description,
      images: [event.image],
    },
  };
}

// Event details component
const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex gap-2 items-center mb-1">
      <Image
        src={icon}
        alt={alt}
        width={24}
        height={24}
      />
      <p>{label}</p>
    </div>
  );
};

// Event agenda component
export const EventAgendaItem = ({ agendaItems }: { agendaItems: string[] }) => {
  return agendaItems.length > 0 ? (
    <div className="agenda">
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

// Event tags component
export const EventTagItem = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <ul className="flex gap-2 list-none">
      {tags.map((tag) => (
        <li key={tag}>
          {' '}
          <span className="px-6 py-2 rounded-4xl border border-white/[0.48]">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  ) : null;

// All params/data access lives here, inside <Suspense> — this is what
// lets the page shell prerender immediately while this streams in.
async function EventDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  // Triggers the route's not-found.tsx convention file
  if (!event) {
    notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <>
      {/* Header */}
      <div className="space-y-10">
        <section className="flex flex-col space-y-8">
          <div>
            <h1 className="text-[40px] leading-tight font-medium">
              {event.title}
            </h1>
            <p className="text-[20px]">{description}</p>
          </div>
          <div className="relative w-full h-[360px]">
            <Image
              src={image}
              alt={`${event.title} event banner`}
              fill
              priority
              className="object-cover rounded-[16px]"
            />
          </div>
        </section>
        {/* Event Overview */}
        <section className="flex flex-col">
          <h2 className="text-[20px] text-secondary font-medium">
            Event Overview
          </h2>
          <p className="text-muted-foreground">{overview}</p>
        </section>
        {/* Event details, agenda and bookings */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between align-middle">
          <div className="lg:w-2/3 space-y-10">
            {/* Event Details */}
            <section className="flex flex-col">
              <h4 className="text-lg font-medium mb-4">Event Details</h4>
              <EventDetailItem
                icon="/icons/calendar.svg"
                alt="Calendar Icon"
                label={date}
              />
              <EventDetailItem
                icon="/icons/clock.svg"
                alt="Clock Icon"
                label={time}
              />
              <EventDetailItem
                icon="/icons/pin.svg"
                alt="Pin Icon"
                label={location}
              />
              <EventDetailItem
                icon="/icons/mode.svg"
                alt="Mode Icon"
                label={mode}
              />
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="Audience Icon"
                label={audience}
              />
            </section>
            {/* Agenda */}
            <section className="flex flex-col">
              <h4 className="text-lg font-medium mb-4">Agenda</h4>
              <EventAgendaItem agendaItems={agenda} />
            </section>
          </div>
          <div className="lg:w-1/3">
            <BookingForm eventId={String(event._id)} />
          </div>
        </div>
        {/* Organizer */}
        <section>
          <h4 className="text-lg font-medium mb-4">About The Organizer</h4>
          <p>{organizer}</p>
        </section>
        {/* Tags */}
        <section>
          <EventTagItem tags={tags} />
        </section>
        {/* Similar Events */}
        <section>
          <h4 className="text-lg font-medium mb-4">Similar Events</h4>
          <SimilarEventsCarousel events={similarEvents} />
        </section>
      </div>
    </>
  );
}

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
};

export default EventDetailsPage;
