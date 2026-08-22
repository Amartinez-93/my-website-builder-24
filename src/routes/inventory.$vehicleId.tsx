import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CreditCard, MessageSquare, Phone, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, TextField } from "@/components/site/Field";
import { submitLead } from "@/lib/lead";
import { formatMiles, formatPrice, getVehicle, vehicleTitle } from "@/lib/inventory";
import { site } from "@/lib/site";

export const Route = createFileRoute("/inventory/$vehicleId")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.vehicleId);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Vehicle unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const v = loaderData.vehicle;
    const title = `${vehicleTitle(v)} for Sale in ${site.city}, GA | ${site.shortName}`;
    const description = `${vehicleTitle(v)} — ${formatPrice(v.price)}, ${formatMiles(v.mileage)}, ${v.transmission}, ${v.fuelType}. Available now at ${site.name} in ${site.city}, GA.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: VehicleDetail,
});

function VehicleDetail() {
  const { vehicle } = Route.useLoaderData();
  const [active, setActive] = useState(0);

  const specs: [string, string][] = [
    ["Year", String(vehicle.year)],
    ["Make", vehicle.make],
    ["Model", vehicle.model],
    ["Trim", vehicle.trim],
    ["Mileage", formatMiles(vehicle.mileage)],
    ["VIN", vehicle.vin],
    ["Engine", vehicle.engine],
    ["Transmission", vehicle.transmission],
    ["Drivetrain", vehicle.drivetrain],
    ["Fuel Type", vehicle.fuelType],
    ["Body Style", vehicle.bodyStyle],
    ["Exterior Color", vehicle.exteriorColor],
    ["Interior Color", vehicle.interiorColor],
  ];

  return (
    <section className="bg-surface py-8">
      <div className="container-page">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/inventory" className="hover:text-primary">
            Inventory
          </Link>{" "}
          / <span className="text-foreground">{vehicleTitle(vehicle)}</span>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
              <img
                src={vehicle.images[active]}
                alt={`${vehicleTitle(vehicle)} — photo ${active + 1}`}
                width={1280}
                height={853}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {vehicle.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`overflow-hidden rounded-md border-2 ${
                    i === active ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${vehicleTitle(vehicle)} thumbnail ${i + 1}`}
                    loading="lazy"
                    width={1280}
                    height={853}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <p className="eyebrow">{vehicle.bodyStyle}</p>
              <h1 className="mt-1 text-3xl font-bold leading-tight">{vehicleTitle(vehicle)}</h1>
              <p className="mt-3 font-display text-4xl font-bold text-primary">
                {formatPrice(vehicle.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatMiles(vehicle.mileage)} · {vehicle.transmission} · {vehicle.drivetrain}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {vehicle.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/financing" search={{ vehicle: vehicleTitle(vehicle) }}>
                    <CreditCard /> Apply for Financing
                  </Link>
                </Button>
                <Button asChild variant="ink" size="xl">
                  <Link to="/test-drive" search={{ vehicle: vehicleTitle(vehicle) }}>
                    <CalendarClock /> Schedule Test Drive
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">
                      <MessageSquare /> Contact
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={site.phoneHref}>
                      <Phone /> Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-2xl font-bold">Vehicle Details</h2>
            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-muted-foreground">
              Vehicle information is believed accurate but is not guaranteed. Please verify options
              and equipment with the dealership before purchase.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-2xl font-bold">Ask About This Vehicle</h2>
            <form onSubmit={(e) => submitLead("vehicle-inquiry", e)} className="mt-5 grid gap-4">
              <input type="hidden" name="vehicle" value={vehicleTitle(vehicle)} />
              <Field label="Full Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required />
              <TextField
                label="Your Question"
                name="message"
                defaultValue={`I'm interested in the ${vehicleTitle(vehicle)}. Is it still available?`}
              />
              <Button type="submit" variant="hero" size="xl">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
