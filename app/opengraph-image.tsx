import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'DevEvent — Event Booking Platform';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 16 }}>
        DevEvent
      </div>
      <div style={{ fontSize: 32, opacity: 0.8 }}>
        Hackathons, meetups, and conferences — all in one place
      </div>
    </div>,
    { ...size },
  );
}
