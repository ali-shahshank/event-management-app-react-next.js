export default function GlobalFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-center">
      <p className="text-4xl animate-bounce motion-reduce:animate-none">⚡</p>
      <p className="text-muted-foreground">Warming up the stage...</p>
    </div>
  );
}
