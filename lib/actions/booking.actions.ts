'use server';

import { Booking } from '@/database';
import connectDB from '../mongodb';

// Type guard for MongoDB duplicate key errors (E11000) — triggered by the
// unique { eventId, email } compound index on the Booking schema.
function isDuplicateKeyError(
  error: unknown,
): error is { code: number; keyValue: Record<string, unknown> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: unknown }).code === 11000
  );
}

type CreateBookingResult =
  | { success: true; booking: { _id: string; eventId: string; email: string } }
  | { success: false; error: string };

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}): Promise<CreateBookingResult> => {
  if (!eventId || !email) {
    return { success: false, error: 'Event and email are required.' };
  }

  try {
    await connectDB();

    const created = await Booking.create({ eventId, email });
    const booking = created.toObject();

    return {
      success: true,
      booking: {
        _id: String(booking._id),
        eventId: String(booking.eventId),
        email: booking.email,
      },
    };
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return {
        success: false,
        error: "You've already registered for this event with this email.",
      };
    }

    console.error('Booking failed:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Booking failed. Please try again.',
    };
  }
};
