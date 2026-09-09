import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Schibsted_Grotesk, Martian_Mono, Geist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import GlobalFallback from '@/components/GlobalFallback';
import { WebVitals } from '@/components/WebVitals';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const schibstedGorotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-sans',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  variable: '--martian-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevEvent',
  description: 'Event Manager app for developer events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        schibstedGorotesk.variable,
        martianMono.variable,
        'font-sans',
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <WebVitals />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.01}
            noiseAmount={0}
            distortion={0.01}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <Navbar />
        <main>
          <Suspense fallback={<GlobalFallback />}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
