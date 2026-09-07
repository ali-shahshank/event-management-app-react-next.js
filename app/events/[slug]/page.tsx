import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { IEvent } from '@/database';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import { getEventBySlug } from '@/lib/actions/getEventBySlug';
import EventCard from '@/components/EventCard';
import Loading from './loading';

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
          <BookingForm eventId={String(event._id)} />
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
