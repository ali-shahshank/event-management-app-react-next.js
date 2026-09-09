'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center text-center gap-4 px-4 max-w-md">
          <p className="text-5xl">⚠️</p>
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground">
            An unexpected error occurred. You can try again, or head back to the
            homepage.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => reset()}
              className="min-h-11 rounded-lg bg-primary text-primary-foreground px-5 font-medium transition-colors duration-200 ease-out hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Try again
            </button>
            <a
              href="/"
              className="min-h-11 flex items-center rounded-lg border border-border px-5 font-medium transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
