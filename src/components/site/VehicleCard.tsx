import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMiles, formatPrice, type Vehicle } from "@/lib/inventory";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1">
      <Link
        to="/inventory/$vehicleId"
        params={{ vehicleId: vehicle.id }}
        className="relative block overflow-hidden bg-secondary"
      >
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} for sale`}
          loading="lazy"
          width={1280}
          height={853}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-ink/85 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-ink-foreground">
          {vehicle.bodyStyle}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xl font-bold leading-tight">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-muted-foreground">{vehicle.trim}</p>

        <p className="mt-3 font-display text-3xl font-bold text-primary">
          {formatPrice(vehicle.price)}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-xs text-muted-foreground">
          <div className="flex flex-col items-center gap-1 text-center">
            <Gauge className="h-4 w-4 text-steel" />
            <dt className="sr-only">Mileage</dt>
            <dd className="font-semibold text-foreground">{formatMiles(vehicle.mileage)}</dd>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Settings2 className="h-4 w-4 text-steel" />
            <dt className="sr-only">Transmission</dt>
            <dd className="font-semibold text-foreground">{vehicle.transmission}</dd>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Fuel className="h-4 w-4 text-steel" />
            <dt className="sr-only">Fuel type</dt>
            <dd className="font-semibold text-foreground">{vehicle.fuelType}</dd>
          </div>
        </dl>

        <Button asChild variant="hero" className="mt-4 w-full">
          <Link to="/inventory/$vehicleId" params={{ vehicleId: vehicle.id }}>
            View Details
          </Link>
        </Button>
      </div>
    </article>
  );
}
