import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-ink py-14 text-ink-foreground">
      <div className="container-page">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-foreground/60">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-ink-foreground/70">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
