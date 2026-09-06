import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

// Max image upload size
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Type guard for MongoDB duplicate key errors (E11000)
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

// Server POST request
export async function POST(req: NextRequest) {
  // Declared here so it's accessible in the catch block for cleanup
  let uploadResult: UploadApiResponse | undefined;

  try {
    await connectDB();
    const formData = await req.formData();
    const event: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );

    // agenda/tags are sent as a single JSON-stringified array field
    const agendaRaw = formData.get('agenda');
    const tagsRaw = formData.get('tags');

    if (!agendaRaw || !tagsRaw) {
      return NextResponse.json(
        { message: 'Agenda and tags are required' },
        { status: 400 },
      );
    }

    let agenda: string[];
    let tags: string[];
    try {
      agenda = JSON.parse(agendaRaw as string);
      tags = JSON.parse(tagsRaw as string);
    } catch {
      return NextResponse.json(
        { message: 'Agenda and tags must be valid JSON arrays' },
        { status: 400 },
      );
    }

    // Validate image file presence and constraints before uploading
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 },
      );
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'File must be an image' },
        { status: 400 },
      );
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { message: 'Image exceeds 5MB limit' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary via stream
    uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image', folder: 'DevEvent' },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error('Cloudinary upload returned no result'));
            }
          },
        )
        .end(buffer);
    });

    event.image = uploadResult.secure_url;

    // Create event in the database
    const createdEvent = await Event.create({
      ...event,
      agenda,
      tags,
    });

    return NextResponse.json(
      { message: 'Event Created Successfully', event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    // Clean up the uploaded image if event creation failed after upload succeeded
    if (uploadResult?.public_id) {
      await cloudinary.uploader.destroy(uploadResult.public_id).catch(() => {});
    }

    if (isDuplicateKeyError(error)) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return NextResponse.json(
        {
          message: 'Event Creation Failed',
          error: `An event with this ${duplicateField} already exists. Please use a different title.`,
        },
        { status: 409 },
      );
    }

    console.error(error);
    return NextResponse.json(
      {
        message: 'Event Creation Failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Server GET request
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Database Connection Failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
