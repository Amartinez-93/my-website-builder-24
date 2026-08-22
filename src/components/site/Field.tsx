import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide">
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1.5 h-11"
      />
    </div>
  );
}

export function TextField({
  label,
  name,
  rows = 4,
  placeholder,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1.5"
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  defaultValue?: string | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide">
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FormShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
