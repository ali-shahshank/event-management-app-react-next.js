import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import { getEvents } from '@/lib/actions/getEvent';

const Home = async () => {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section
        aria-labelledby="hero-heading"
        className="flex flex-col items-center justify-center text-center py-12 sm:py-16 lg:py-24"
      >
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
        >
          Book Your Next Big Event
        </h1>
        <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
          Hackathons, meetups and conferences all in one place.
        </p>

        <div className="mt-6 sm:mt-8">
          <ExploreBtn />
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 w-full space-y-6 sm:space-y-7">
          {events && events.length > 0 ? (
            <ul
              role="list"
              aria-labelledby="events-heading"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 list-none"
            >
              {events.map((event: IEvent) => (
                <li
                  key={String(event._id)}
                  role="listitem"
                >
                  <EventCard {...event} />
                </li>
              ))}
            </ul>
          ) : (
            <p
              role="status"
              className="text-center text-muted-foreground"
            >
              No featured events at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
