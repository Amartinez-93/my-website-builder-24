import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bodyStyles, modelsForMake, uniqueMakes, uniqueYears } from "@/lib/inventory";

const priceOptions = ["Any price", "15000", "20000", "25000", "30000", "40000"];
const mileageOptions = ["Any mileage", "30000", "50000", "75000", "100000"];

const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function VehicleSearchBar() {
  const navigate = useNavigate();
  const [make, setMake] = useState("Any make");
  const [model, setModel] = useState("Any model");
  const [year, setYear] = useState("Any year");
  const [body, setBody] = useState("Any body style");
  const [maxPrice, setMaxPrice] = useState("Any price");
  const [maxMileage, setMaxMileage] = useState("Any mileage");

  const clean = (v: string, prefix: string) => (v.startsWith("Any") ? undefined : v.replace("", prefix));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          to: "/inventory",
          search: {
            make: clean(make, ""),
            model: clean(model, ""),
            year: clean(year, ""),
            body: clean(body, ""),
            maxPrice: clean(maxPrice, ""),
            maxMileage: clean(maxMileage, ""),
          },
        });
      }}
      className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)] md:p-6"
    >
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-primary" />
        <h2 className="text-xl font-bold">Search Our Inventory</h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-6">
        <select
          aria-label="Make"
          className={selectClass}
          value={make}
          onChange={(e) => {
            setMake(e.target.value);
            setModel("Any model");
          }}
        >
          {["Any make", ...uniqueMakes()].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <select
          aria-label="Model"
          className={selectClass}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {["Any model", ...modelsForMake(make === "Any make" ? "any" : make)].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <select
          aria-label="Year"
          className={selectClass}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {["Any year", ...uniqueYears().map(String)].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <select
          aria-label="Maximum price"
          className={selectClass}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        >
          {priceOptions.map((o) => (
            <option key={o} value={o}>
              {o === "Any price" ? o : `Under $${Number(o).toLocaleString()}`}
            </option>
          ))}
        </select>

        <select
          aria-label="Maximum mileage"
          className={selectClass}
          value={maxMileage}
          onChange={(e) => setMaxMileage(e.target.value)}
        >
          {mileageOptions.map((o) => (
            <option key={o} value={o}>
              {o === "Any mileage" ? o : `Under ${Number(o).toLocaleString()} mi`}
            </option>
          ))}
        </select>

        <select
          aria-label="Body style"
          className={selectClass}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        >
          {["Any body style", ...bodyStyles].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <Button type="submit" variant="hero" size="xl" className="mt-4 w-full lg:w-auto lg:px-12">
        Search Vehicles
      </Button>
    </form>
  );
}
