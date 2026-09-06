import { IEvent } from '@/database';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import EventCard from '@/components/EventCard';
import { Suspense } from 'react';
import GlobalFallback from '@/components/GlobalFallback';
import { notFound } from 'next/navigation';

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
    <div className="flex gap-2 items-center">
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
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  ) : null;

// Event details page
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  // Render the not-found page when the event doesn't exist
  if (request.status === 404) {
    return notFound();
  }

  // Handle any other non-success response (e.g. 500) gracefully
  if (!request.ok) {
    throw new Error('Failed to load event details');
  }

  const {
    event: {
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
    },
  }: { event: IEvent } = await request.json();

  // Similar events
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <Suspense fallback={<GlobalFallback />}>
      <main>
        <div>
          <h3>Event Description</h3>
          <p>{description}</p>
        </div>
        <section className="flex">
          <Image
            src={image}
            alt="Event Image"
            height={460}
            width={560}
          />
          <aside>
            <BookingForm />
          </aside>
        </section>
        <div>
          <section className="my-4">
            <h4 className="text-lg font-semibold">Event Overview</h4>
            <p>{overview}</p>
          </section>
          <section className="mb-4">
            <h4 className="text-lg font-semibold">Event Details</h4>
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
          {/* Event Agenda */}
          <section className="mb-4">
            <h4 className="text-lg font-semibold">Event Agenda</h4>
            <EventAgendaItem agendaItems={agenda} />
          </section>
          {/* Organizer */}
          <section>
            <h4 className="text-lg font-semibold">About the Organizer</h4>
            <p>{organizer}</p>
          </section>
          {/* Tags */}
          <section>
            <EventTagItem tags={tags} />
          </section>
        </div>
        {/* Similar Events */}
        <section>
          <h2 className="text-lg font-semibold">Similar Events</h2>
          <div className="events">
            {similarEvents.map((similarEvent: IEvent) => (
              <EventCard
                key={String(similarEvent._id)}
                {...similarEvent}
              />
            ))}
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default EventDetailsPage;
