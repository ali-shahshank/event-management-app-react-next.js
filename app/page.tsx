import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import GlobalFallback from '@/components/GlobalFallback';
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  'use cache';
  cacheLife('minutes');
  const response = await fetch(`${BASE_URL}/api/events`);
  const data = await response.json();
  const events = data.events;
  return (
    <Suspense fallback={<GlobalFallback />}>
      <main>
        <section className="flex flex-col items-center justify-center">
          <h1 className="text-center">Full-stack Next.js Event App</h1>
          <p className="text-center mt-5">
            Hackathons, meetups and conferences all in one place.
          </p>
          <ExploreBtn />
          <div className="mt-20 space-y-7">
            <h3>Featured Events</h3>
            <ul className="events list-none">
              {events && events.length > 0 ? (
                events.map((event: IEvent) => (
                  <li key={event.title}>
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
    </Suspense>
  );
};

export default Home;
