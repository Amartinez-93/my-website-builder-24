import { Link } from "@tanstack/react-router";
import comingSoon from "@/assets/coming-soon-inventory.jpg";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export function ComingSoon({
  title = "New Inventory Coming Soon",
  description = "We're photographing and inspecting our latest arrivals right now. Tell us what you're looking for and we'll call you the moment it lands on the lot.",
}: ComingSoonProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
      <img
        src={comingSoon}
        alt="88 Auto Sales showroom preparing for new vehicle arrivals"
        loading="lazy"
        width={1600}
        height={900}
        className="h-64 w-full object-cover md:h-80"
      />
      <div className="p-8 text-center">
        <p className="eyebrow">Coming Soon</p>
        <h3 className="mt-1 text-2xl font-bold md:text-3xl">{title}</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero">
            <Link to="/car-finder">Use Our Car Finder</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
