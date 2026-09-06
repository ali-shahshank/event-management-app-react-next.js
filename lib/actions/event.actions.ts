'use server';

import connectDB from '../mongodb';
import Event, { IEvent } from '@/database/event.model';

// Returns an empty array on any failure.
export const getSimilarEventsBySlug = async (
  slug: string,
): Promise<IEvent[]> => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) {
      return [];
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    // .lean() returns plain objects, but _id is still a BSON ObjectId
    return similarEvents.map((e) => ({
      ...e,
      _id: String(e._id),
    })) as IEvent[];
  } catch (error) {
    console.error('Failed to fetch similar events:', error);
    return [];
  }
};
