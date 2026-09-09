import { ImageResponse } from 'next/og';
import { getEventBySlug } from '@/lib/actions/getEventBySlug';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Event banner';

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  const title = event?.title ?? 'Event';
  const date = event?.date ?? '';
  const location = event?.location ?? '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '64px',
        backgroundColor: '#0a0a0a',
        backgroundImage: event?.image
          ? `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3)), url(${event.image})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 28, opacity: 0.8, marginBottom: 16 }}>
        DevEvent
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 24,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 32, opacity: 0.9 }}>
        {date} {location ? `· ${location}` : ''}
      </div>
    </div>,
    { ...size },
  );
}
