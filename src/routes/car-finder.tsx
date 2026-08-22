import { createFileRoute } from "@tanstack/react-router";
import { Search, Handshake, Truck } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { CarFinderForm } from "@/components/site/CarFinderForm";
import { site } from "@/lib/site";

export const Route = createFileRoute("/car-finder")({
  head: () => ({
    meta: [
      { title: `Car Finder — We'll Locate Your Next Vehicle | ${site.name}` },
      {
        name: "description",
        content: `Can't find the right used car near ${site.city}, GA? Tell 88 Auto Sales what you're looking for and we'll source it from auctions and trade networks.`,
      },
      { property: "og:title", content: `Car Finder | ${site.name}` },
      {
        property: "og:description",
        content: "Tell us the year, make, model and budget — we'll find the vehicle for you.",
      },
    ],
  }),
  component: CarFinderPage,
});

const steps = [
  { icon: Search, title: "You Tell Us", copy: "Share the vehicle you want, your budget and any must-have features." },
  { icon: Handshake, title: "We Source It", copy: "Our buyers search auctions, trade-ins and dealer networks across the Southeast." },
  { icon: Truck, title: "You Review It", copy: "We send photos, history and pricing before the vehicle ever arrives." },
];

function CarFinderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Car Finder"
        title="We Can Find It For You"
        description="Our inventory changes weekly, and we can go get what's not on the lot. There's no cost and no obligation."
      />

      <section className="bg-surface py-12">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, copy }, i) => (
            <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="font-display text-4xl font-bold text-accent">0{i + 1}</span>
              <Icon className="mt-2 h-6 w-6 text-primary" />
              <h2 className="mt-3 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <h2 className="text-2xl font-bold">Tell Us What You're Looking For</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The more detail you give us, the closer the match. We typically respond within one
              business day.
            </p>
            <div className="mt-6">
              <CarFinderForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
