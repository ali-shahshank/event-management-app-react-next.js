import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import { getEvents } from '@/lib/actions/getEvent';

const Home = async () => {
  const events = await getEvents();

  return (
    <main>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-center">Event Booking Platform</h1>
        <p className="text-center mt-5">
          Hackathons, meetups and conferences all in one place.
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events list-none">
            {events && events.length > 0 ? (
              events.map((event: IEvent) => (
                <li key={String(event._id)}>
                  <EventCard {...event} />
                </li>
              ))
            ) : (
              <p>No featured events at the moment.</p>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
