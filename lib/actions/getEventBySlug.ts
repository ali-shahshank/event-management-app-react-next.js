import { cacheLife } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

export async function getEventBySlug(slug: string): Promise<IEvent | null> {
  'use cache';
  cacheLife('hours');

  await connectDB();

  const event = await Event.findOne({ slug }).lean();

  if (!event) {
    return null;
  }

  return {
    ...event,
    _id: String(event._id),
  } as IEvent;
}
