import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Car,
  CreditCard,
  HandCoins,
  Key,
  MonitorSmartphone,
  Quote,
  Search,
  ShieldCheck,
  Star,
  Tag,
  Truck,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-dealership.jpg";
import { Button } from "@/components/ui/button";
import { VehicleSearchBar } from "@/components/site/VehicleSearchBar";
import { VehicleCard } from "@/components/site/VehicleCard";
import { ComingSoon } from "@/components/site/ComingSoon";
import { CarFinderForm } from "@/components/site/CarFinderForm";
import { bodyStyles, vehicles } from "@/lib/inventory";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Used Cars for Sale in ${site.city}, GA | ${site.name}` },
      {
        name: "description",
        content: `Shop affordable used cars, SUVs and trucks near ${site.city}, GA. Quality pre-owned vehicles, easy financing and simple test drives at ${site.name}.`,
      },
      { property: "og:title", content: `Used Cars for Sale in ${site.city}, GA | ${site.name}` },
      {
        property: "og:description",
        content: `Quality pre-owned vehicles, great prices and easy financing in ${site.city}, GA.`,
      },
    ],
  }),
  component: Home,
});

const reasons = [
  { icon: BadgeCheck, title: "Quality Pre-Owned Vehicles", copy: "Every vehicle is inspected and reconditioned before it hits our lot." },
  { icon: Tag, title: "Competitive Prices", copy: "Transparent, market-based pricing with no surprise add-ons at signing." },
  { icon: CreditCard, title: "Easy Financing Options", copy: "We work with multiple lenders to find terms that fit your budget." },
  { icon: Users, title: "Friendly Customer Service", copy: "No pressure, no games — just straight answers from real people." },
  { icon: MonitorSmartphone, title: "Easy Online Shopping", copy: "Browse, apply and schedule from your phone in a few minutes." },
  { icon: Car, title: "Convenient Test Drives", copy: "Book a time that works for you and the keys will be ready." },
];

const steps = [
  { icon: Search, title: "Find Your Vehicle", copy: "Browse our inventory online or visit the lot and take your time." },
  { icon: HandCoins, title: "Get Approved", copy: "Submit a quick finance application and we handle the lender legwork." },
  { icon: Key, title: "Drive Away", copy: "Sign, grab the keys and drive off in your next vehicle the same day." },
];

const testimonials = [
  { name: "Danielle R.", text: "Straightforward from start to finish. The price online was the price I paid, and I was out the door in under two hours." },
  { name: "Marcus T.", text: "They found me a truck that wasn't even on the lot yet through their car finder. Easily the smoothest buying experience I've had." },
  { name: "Priya S.", text: "Financing was approved the same day and nobody pressured me into anything. I'll be sending my family here." },
];

function Home() {
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Pre-owned vehicles on the 88 Auto Sales lot at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-page relative py-20 text-ink-foreground md:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink-foreground/70">
            {site.city}, Georgia · Family Owned
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
            Quality Pre-Owned Vehicles. Great Prices. Easy Buying.
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-foreground/80 md:text-lg">
            Sedans, SUVs, trucks, coupes and luxury vehicles — inspected, priced honestly and ready
            to drive home today.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="hero" size="xl">
              <Link to="/inventory">Browse Inventory</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/financing" search={{ vehicle: undefined }}>Get Pre-Approved</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/test-drive" search={{ vehicle: undefined }}>Schedule a Test Drive</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-foreground/75">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Inspected & reconditioned
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" /> Trusted by local buyers
            </span>
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> New arrivals weekly
            </span>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-surface py-10">
        <div className="container-page -mt-24 md:-mt-28">
          <VehicleSearchBar />
        </div>
      </section>

      {/* Featured */}
      <section className="bg-background py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Handpicked This Week</p>
              <h2 className="mt-1 text-3xl font-bold md:text-4xl">Featured Vehicles</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/inventory">View All Inventory</Link>
            </Button>
          </div>
          {featured.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <ComingSoon />
            </div>
          )}
        </div>
      </section>

      {/* Body styles */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <p className="eyebrow">Find Your Fit</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Shop By Body Style</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {bodyStyles.map((style) => {
              const count = vehicles.filter((v) => v.bodyStyle === style).length;
              return (
                <Link
                  key={style}
                  to="/inventory"
                  search={{ body: style }}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6 text-center shadow-[var(--shadow-card)] transition-colors hover:border-primary"
                >
                  <Car className="h-7 w-7 text-primary" />
                  <span className="font-display text-lg font-bold uppercase">{style}s</span>
                  <span className="text-xs text-muted-foreground">
                    {count} available
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financing CTA */}
      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-foreground/60">
              Financing
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Need Financing?</h2>
            <p className="mt-3 text-ink-foreground/75">
              Get started with our easy online finance application. All credit situations are
              welcome and applying takes just a few minutes.
            </p>
          </div>
          <Button asChild variant="hero" size="xl">
            <Link to="/financing" search={{ vehicle: undefined }}>Get Pre-Approved</Link>
          </Button>
        </div>
      </section>

      {/* Why buy */}
      <section className="bg-background py-16">
        <div className="container-page">
          <p className="eyebrow">The 88 Difference</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Why Buy From Us?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <p className="eyebrow">Simple Process</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">How It Works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, copy }, i) => (
              <div key={title} className="relative rounded-lg border border-border bg-card p-7 shadow-[var(--shadow-card)]">
                <span className="font-display text-5xl font-bold text-accent">0{i + 1}</span>
                <Icon className="absolute right-6 top-6 h-6 w-6 text-primary" />
                <h3 className="mt-2 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car finder */}
      <section className="bg-background py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Car Finder</p>
            <h2 className="mt-1 text-3xl font-bold md:text-4xl">Can't Find It? We'll Find It.</h2>
            <p className="mt-4 text-muted-foreground">
              Our buyers source vehicles from auctions and trade networks across the Southeast every
              week. Tell us exactly what you're after and your budget, and we'll go get it.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "No cost and no obligation to buy",
                "Vehicles matched to your budget and payment target",
                "Photos and pricing sent to you before it hits the lot",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <CarFinderForm />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <p className="eyebrow">Customer Reviews</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">What Our Buyers Say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <Quote className="h-6 w-6 text-accent" />
                <blockquote className="mt-3 text-sm text-muted-foreground">"{t.text}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-2">
                  <span className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="text-sm font-semibold">{t.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Bought from us recently? Google reviews from our customers will be featured here.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready To Find Your Next Vehicle?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Stop by the lot in {site.city} or start online — either way, we'll make it simple.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="ink" size="xl">
              <Link to="/inventory">Browse Inventory</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
