import { cacheLife } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

export async function getEvents(): Promise<IEvent[]> {
  'use cache';
  cacheLife('hours');

  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return events.map((e) => ({
    ...e,
    _id: String(e._id),
  })) as IEvent[];
}
