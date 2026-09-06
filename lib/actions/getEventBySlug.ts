import { cacheLife } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

// Fetches a single event by slug, cached for hours via Next.js Cache
// Components. Returns null if no matching event exists.
export async function getEventBySlug(slug: string): Promise<IEvent | null> {
  'use cache';
  cacheLife('hours');

  await connectDB();

  const event = await Event.findOne({ slug }).lean();

  if (!event) {
    return null;
  }

  // .lean() returns a plain object, but _id is still a BSON ObjectId —
  // stringify it so the result is safe to pass to Client Components
  // and to serialize into the cache.
  return {
    ...event,
    _id: String(event._id),
  } as IEvent;
}
