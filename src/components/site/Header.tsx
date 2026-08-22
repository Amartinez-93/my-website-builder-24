import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { Logo } from "@/components/site/Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Inventory" },
  { to: "/financing", label: "Financing" },
  { to: "/car-finder", label: "Car Finder" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="text-ink-foreground/70">
            {site.addressLine}, {site.city}, {site.state}
          </p>
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="font-semibold hover:text-primary-foreground">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="text-ink-foreground/70 hover:text-ink-foreground">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="font-display text-base font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="sm:hidden" aria-label="Call us">
              <a href={site.phoneHref}>
                <Phone />
              </a>
            </Button>
            <Button asChild variant="hero" className="hidden sm:inline-flex">
              <Link to="/inventory">Browse Inventory</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="container-page flex flex-col py-2">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="border-b border-border py-3 font-display text-lg font-semibold uppercase last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="hero" size="lg" className="my-3">
                <a href={site.phoneHref}>Call {site.phone}</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
