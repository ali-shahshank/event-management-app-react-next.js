import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-[70vh] gap-4 px-4">
      <p className="text-6xl">🧭</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-4 min-h-11 flex items-center rounded-full bg-white/10 hover:bg-white/20 px-5 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        Back to home
      </Link>
    </main>
  );
}
