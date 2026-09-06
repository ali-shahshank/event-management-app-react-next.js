const shimmer = 'animate-pulse bg-white/10 rounded-lg';

export default function EventDetailsLoading() {
  return (
    <main className="animate-in fade-in duration-300">
      <p className="text-sm text-white/60 mb-4">
        🎟️ Grabbing your seat at the table...
      </p>

      <div className={`h-6 w-2/3 mb-2 ${shimmer}`} />
      <div className={`h-4 w-full mb-1 ${shimmer}`} />
      <div className={`h-4 w-5/6 mb-8 ${shimmer}`} />

      <section className="flex gap-4">
        <div className={`h-[460px] w-[560px] ${shimmer}`} />
        <div className="flex-1 space-y-3">
          <div className={`h-10 w-full ${shimmer}`} />
          <div className={`h-10 w-full ${shimmer}`} />
        </div>
      </section>

      <div className="mt-8 space-y-6">
        <div className={`h-5 w-40 ${shimmer}`} />
        <div className={`h-4 w-full ${shimmer}`} />

        <div className={`h-5 w-32 ${shimmer}`} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-6 w-3/4 ${shimmer}`}
          />
        ))}
      </div>
    </main>
  );
}
