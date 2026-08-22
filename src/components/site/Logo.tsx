import { site } from "@/lib/site";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-xl font-bold leading-none text-primary-foreground">
        88
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold uppercase tracking-tight ${
            onDark ? "text-ink-foreground" : "text-foreground"
          }`}
        >
          Auto Sales
        </span>
        <span
          className={`text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
            onDark ? "text-ink-foreground/60" : "text-muted-foreground"
          }`}
        >
          {site.city}, {site.state}
        </span>
      </span>
    </span>
  );
}
