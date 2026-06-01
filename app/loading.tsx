export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" aria-busy aria-live="polite">
      <div className="relative">
        <div className="size-10 animate-spin rounded-full border-2 border-border border-t-foreground" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
