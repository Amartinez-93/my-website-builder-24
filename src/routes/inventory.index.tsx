import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { VehicleCard } from "@/components/site/VehicleCard";
import { ComingSoon } from "@/components/site/ComingSoon";
import { bodyStyles, modelsForMake, uniqueMakes, uniqueYears, vehicles } from "@/lib/inventory";
import { site } from "@/lib/site";

export interface InventorySearch {
  make?: string | undefined;
  model?: string | undefined;
  year?: string | undefined;
  body?: string | undefined;
  transmission?: string | undefined;
  fuel?: string | undefined;
  maxPrice?: string | undefined;
  maxMileage?: string | undefined;
}

const str = (v: unknown) => (typeof v === "string" && v.length > 0 ? v : undefined);

export const Route = createFileRoute("/inventory/")({
  validateSearch: (search: Record<string, unknown>): InventorySearch => {
    const clean = (val: unknown): string | undefined => 
      typeof val === "string" && val.length > 0 ? val : undefined;
    return {
      make: clean(search["make"]),
      model: clean(search["model"]),
      year: clean(search["year"]),
      body: clean(search["body"]),
      transmission: clean(search["transmission"]),
      fuel: clean(search["fuel"]),
      maxPrice: clean(search["maxPrice"]),
      maxMileage: clean(search["maxMileage"]),
    } as InventorySearch;
  },
  head: () => ({
    meta: [
      { title: `Used Cars, SUVs & Trucks for Sale in ${site.city}, GA | ${site.name}` },
      {
        name: "description",
        content: `Browse our full inventory of affordable used cars, SUVs, trucks and luxury vehicles near ${site.city}, GA. Filter by make, model, year, price and mileage.`,
      },
      { property: "og:title", content: `Used Car Inventory in ${site.city}, GA` },
      {
        property: "og:description",
        content: "Filter our full pre-owned inventory by make, model, price, mileage and body style.",
      },
    ],
  }),
  component: InventoryPage,
});

const ANY = "Any";
const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        className={`mt-1.5 ${selectClass}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {[ANY, ...options].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function InventoryPage() {
  const search = Route.useSearch();
  const [make, setMake] = useState(search.make ?? ANY);
  const [model, setModel] = useState(search.model ?? ANY);
  const [year, setYear] = useState(search.year ?? ANY);
  const [body, setBody] = useState(search.body ?? ANY);
  const [transmission, setTransmission] = useState(search.transmission ?? ANY);
  const [fuel, setFuel] = useState(search.fuel ?? ANY);
  const [maxPrice, setMaxPrice] = useState(search.maxPrice ?? ANY);
  const [maxMileage, setMaxMileage] = useState(search.maxMileage ?? ANY);
  const [sort, setSort] = useState("Newest");

  const reset = () => {
    setMake(ANY);
    setModel(ANY);
    setYear(ANY);
    setBody(ANY);
    setTransmission(ANY);
    setFuel(ANY);
    setMaxPrice(ANY);
    setMaxMileage(ANY);
  };

  let results = vehicles.filter((v) => {
    if (make !== ANY && v.make !== make) return false;
    if (model !== ANY && v.model !== model) return false;
    if (year !== ANY && String(v.year) !== year) return false;
    if (body !== ANY && v.bodyStyle !== body) return false;
    if (transmission !== ANY && v.transmission !== transmission) return false;
    if (fuel !== ANY && v.fuelType !== fuel) return false;
    if (maxPrice !== ANY && v.price > Number(maxPrice)) return false;
    if (maxMileage !== ANY && v.mileage > Number(maxMileage)) return false;
    return true;
  });

  results = [...results].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Lowest Mileage") return a.mileage - b.mileage;
    return b.year - a.year;
  });

  return (
    <>
      <PageHeader
        eyebrow={`${site.city}, GA`}
        title="Our Pre-Owned Inventory"
        description="Every vehicle is inspected, reconditioned and priced to move. Filter below to narrow the lot to exactly what you're shopping for."
      />

      <section className="bg-surface py-10">
        <div className="container-page grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
              </h2>
              <button
                type="button"
                onClick={reset}
                className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Filter
                label="Make"
                value={make}
                options={uniqueMakes()}
                onChange={(v) => {
                  setMake(v);
                  setModel(ANY);
                }}
              />
              <Filter
                label="Model"
                value={model}
                options={modelsForMake(make === ANY ? "any" : make)}
                onChange={setModel}
              />
              <Filter label="Year" value={year} options={uniqueYears().map(String)} onChange={setYear} />
              <Filter label="Body Style" value={body} options={[...bodyStyles]} onChange={setBody} />
              <Filter
                label="Max Price"
                value={maxPrice}
                options={["15000", "20000", "25000", "30000", "40000"]}
                onChange={setMaxPrice}
              />
              <Filter
                label="Max Mileage"
                value={maxMileage}
                options={["30000", "50000", "75000", "100000"]}
                onChange={setMaxMileage}
              />
              <Filter
                label="Transmission"
                value={transmission}
                options={["Automatic", "Manual", "CVT"]}
                onChange={setTransmission}
              />
              <Filter
                label="Fuel Type"
                value={fuel}
                options={["Gasoline", "Hybrid", "Diesel", "Electric"]}
                onChange={setFuel}
              />
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{results.length}</span> of{" "}
                {vehicles.length} vehicles
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort</span>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {["Newest", "Price: Low to High", "Price: High to Low", "Lowest Mileage"].map(
                    (o) => (
                      <option key={o}>{o}</option>
                    ),
                  )}
                </select>
              </label>
            </div>

            {results.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <ComingSoon
                  title={vehicles.length === 0 ? "New Inventory Coming Soon" : "No matches right now"}
                  description={
                    vehicles.length === 0
                      ? "Our next round of inspected pre-owned vehicles is on the way. Tell us what you're after and we'll source it for you."
                      : "Our stock changes weekly. Let us source the exact vehicle you want."
                  }
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
