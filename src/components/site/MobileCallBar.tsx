import { Link } from "@tanstack/react-router";
import { Car, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function MobileCallBar() {
  return (
    <div className="sticky bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 bg-primary py-3.5 font-display text-base font-bold uppercase text-primary-foreground"
      >
        <Phone className="h-4 w-4" /> Call Now
      </a>
      <Link
        to="/inventory"
        className="flex items-center justify-center gap-2 py-3.5 font-display text-base font-bold uppercase text-foreground"
      >
        <Car className="h-4 w-4" /> Inventory
      </Link>
    </div>
  );
}
