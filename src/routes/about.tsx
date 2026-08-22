import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, HeartHandshake, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-dealership.jpg";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${site.name} | Used Car Dealership in ${site.city}, GA` },
      {
        name: "description",
        content: `Learn about ${site.name}, a locally owned used car dealership in ${site.city}, GA offering affordable pre-owned sedans, SUVs, trucks and luxury vehicles.`,
      },
      { property: "og:title", content: `About ${site.name}` },
      {
        property: "og:description",
        content: `A locally owned pre-owned dealership serving ${site.city} and metro Atlanta.`,
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: BadgeCheck, title: "Honest Pricing", copy: "The price you see online is the price we sell for — no bait listings, no hidden fees." },
  { icon: Wrench, title: "Real Reconditioning", copy: "Every vehicle gets a multi-point inspection and service before it's listed for sale." },
  { icon: HeartHandshake, title: "Long-Term Customers", copy: "Most of our business comes from repeat buyers and referrals from their families." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={`Your Neighborhood Dealership in ${site.city}`}
        description="We built 88 Auto Sales around a simple idea: buying a used vehicle should be straightforward, fairly priced and free of pressure."
      />

      <section className="bg-background py-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-1 text-3xl font-bold md:text-4xl">Built On Repeat Customers</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                {site.name} is a locally owned pre-owned dealership serving {site.city} and the
                greater Atlanta area. We stock a rotating selection of sedans, SUVs, trucks, coupes,
                hatchbacks, vans and luxury vehicles at prices that make sense for real budgets.
              </p>
              <p>
                Every vehicle we list is hand-selected, inspected and reconditioned by our service
                partners before it's photographed. If something isn't right, we don't sell it — we
                fix it or we pass on it.
              </p>
              <p>
                Our sales team is paid to help you buy the right vehicle, not the most expensive
                one. Take your time, ask hard questions, and drive anything on the lot.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/inventory">Browse Inventory</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Visit The Lot</Link>
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt={`The ${site.name} dealership lot in ${site.city}, GA`}
            loading="lazy"
            width={1920}
            height={1088}
            className="w-full rounded-lg object-cover shadow-[var(--shadow-card)]"
          />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <p className="eyebrow">What We Stand For</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">How We Do Business</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
