import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Field, TextField } from "@/components/site/Field";
import { submitLead } from "@/lib/lead";
import { fullAddress, mapsDirectionsUrl, mapsEmbedSrc, site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${site.name} | Used Car Dealer in ${site.city}, GA` },
      {
        name: "description",
        content: `Visit or call ${site.name} at ${fullAddress}. Get directions, business hours, phone number and send us a message about any vehicle.`,
      },
      { property: "og:title", content: `Contact ${site.name}` },
      {
        property: "og:description",
        content: `Address, hours, directions and phone number for our ${site.city}, GA dealership.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Come See Us"
        description="Questions about a vehicle, financing or a trade-in? Call, email or stop by the lot — we're happy to help."
      />

      <section className="bg-surface py-12">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold">Dealership Info</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{fullAddress}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a href={site.phoneHref} className="font-semibold hover:text-primary">
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a href={`mailto:${site.email}`} className="hover:text-primary">
                    {site.email}
                  </a>
                </li>
              </ul>

              <h3 className="mt-7 text-xl font-bold">Business Hours</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 border-b border-border pb-2">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button asChild variant="hero" size="lg">
                  <a href={site.phoneHref}>
                    <Phone /> Call Now
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer">
                    <Navigation /> Get Directions
                  </a>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border shadow-[var(--shadow-card)]">
              <iframe
                title={`Map to ${site.name}`}
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => submitLead("contact", e)}
            className="h-fit rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
          >
            <h2 className="text-2xl font-bold">Send Us A Message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We usually respond within one business day.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
              <Field label="Subject" name="subject" placeholder="Vehicle question" className="sm:col-span-2" />
              <TextField label="Message" name="message" rows={6} className="sm:col-span-2" />
            </div>
            <Button type="submit" variant="hero" size="xl" className="mt-6 w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
