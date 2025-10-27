import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Extract and validate slug parameter
    const { slug } = await params;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Slug parameter is required and must be a valid string' },
        { status: 400 }
      );
    }

    // Normalize slug (lowercase, trimmed)
    const normalizedSlug = slug.toLowerCase().trim();

    // Query event by slug
    const event: IEvent | null = await Event.findOne({ slug: normalizedSlug });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${normalizedSlug}' not found` },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching event by slug:', error);

    // Return generic error response
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
