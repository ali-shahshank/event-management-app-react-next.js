import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

// Dynamic route params are delivered as a Promise in Next.js 15+/16
type RouteContext = {
  params: Promise<{ slug: string }>;
};

// input before touching the database.
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    // Validate slug is present and non-empty
    if (!slug || slug.trim().length === 0) {
      return NextResponse.json(
        { message: 'Slug parameter is required' },
        { status: 400 },
      );
    }

    // Validate slug format before querying the database
    if (!SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        { message: 'Invalid slug format' },
        { status: 400 },
      );
    }

    await connectDB();

    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
