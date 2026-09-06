export default function GlobalFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-center">
      <p className="text-4xl animate-bounce">⚡</p>
      <p className="text-white/60">Warming up the stage...</p>
    </div>
  );
}
