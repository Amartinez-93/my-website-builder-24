import logoAsset from "@/assets/logo.jpg.asset.json";
import { site } from "@/lib/site";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt={`${site.name} logo`}
        className="h-9 w-auto rounded-md bg-transparent object-contain"
      />
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
