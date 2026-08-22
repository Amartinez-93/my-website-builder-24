import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Field, SelectField, TextField } from "@/components/site/Field";
import { submitLead } from "@/lib/lead";
import { vehicles, vehicleTitle } from "@/lib/inventory";
import { site } from "@/lib/site";

export const Route = createFileRoute("/test-drive")({
  validateSearch: (search: Record<string, unknown>): { vehicle: string | undefined } => ({
    vehicle: typeof search["vehicle"] === "string" ? search["vehicle"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Schedule a Test Drive in ${site.city}, GA | ${site.name}` },
      {
        name: "description",
        content: `Book a test drive at ${site.name} in ${site.city}, GA. Pick your vehicle, date and time — we'll have the keys ready when you arrive.`,
      },
      { property: "og:title", content: `Schedule a Test Drive | ${site.name}` },
      {
        property: "og:description",
        content: "Reserve a time to drive any vehicle in our pre-owned inventory.",
      },
    ],
  }),
  component: TestDrivePage,
});

const times = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

function TestDrivePage() {
  const { vehicle } = Route.useSearch();
  const options = ["Not sure yet — help me choose", ...vehicles.map(vehicleTitle)];

  return (
    <>
      <PageHeader
        eyebrow="Test Drive"
        title="Schedule Your Test Drive"
        description="Tell us which vehicle you'd like to drive and when works best. We'll confirm your appointment by phone or email."
      />

      <section className="bg-surface py-12">
        <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => submitLead("test-drive", e)}
            className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
          >
            <h2 className="text-2xl font-bold">Appointment Request</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Vehicle"
                name="vehicle"
                required
                options={vehicle ? [vehicle, ...options] : options}
                defaultValue={vehicle}
                className="sm:col-span-2"
              />
              <Field label="Preferred Date" name="date" type="date" required />
              <SelectField label="Preferred Time" name="time" required options={times} />
              <Field label="Full Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
              <TextField label="Notes" name="notes" className="sm:col-span-2" />
            </div>
            <Button type="submit" variant="hero" size="xl" className="mt-6 w-full sm:w-auto sm:px-14">
              Request Test Drive
            </Button>
          </form>

          <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-2xl font-bold">What To Bring</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• A valid driver's license</li>
              <li>• Proof of insurance</li>
              <li>• Trade-in keys and title, if applicable</li>
            </ul>
            <h3 className="mt-7 text-xl font-bold">Showroom Hours</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="ink" className="mt-6 w-full">
              <a href={site.phoneHref}>Call {site.phone}</a>
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
