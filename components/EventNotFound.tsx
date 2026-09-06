import Link from 'next/link';

export default function EventNotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-4">
      <p className="text-6xl">🎪</p>
      <h1 className="text-2xl font-semibold">
        This event packed up and left town.
      </h1>
      <p className="text-white/60 max-w-md">
        We looked everywhere — under the stage, behind the merch table — but
        couldn&apos;t find an event at this link. It may have been removed,
        renamed, or never existed.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-white/10 hover:bg-white/20 px-5 py-2 transition-colors"
      >
        Back to all events
      </Link>
    </main>
  );
}
