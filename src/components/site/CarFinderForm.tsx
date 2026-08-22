import { Button } from "@/components/ui/button";
import { Field, TextField } from "@/components/site/Field";
import { submitLead } from "@/lib/lead";

export function CarFinderForm() {
  return (
    <form onSubmit={(e) => submitLead("car-finder", e)} className="grid gap-4 sm:grid-cols-2">
      <Field label="Full Name" name="name" required placeholder="Jordan Smith" />
      <Field label="Phone" name="phone" type="tel" required placeholder="(770) 555-0123" />
      <Field label="Email" name="email" type="email" required placeholder="you@email.com" />
      <Field label="Desired Year" name="desiredYear" placeholder="2020 or newer" />
      <Field label="Make" name="make" placeholder="Any make" />
      <Field label="Model" name="model" placeholder="Any model" />
      <Field label="Maximum Budget" name="budget" placeholder="$25,000" className="sm:col-span-2" />
      <TextField
        label="Additional Comments"
        name="comments"
        placeholder="Color preference, mileage limit, must-have features…"
        className="sm:col-span-2"
      />
      <Button type="submit" variant="hero" size="xl" className="sm:col-span-2">
        Submit Vehicle Request
      </Button>
    </form>
  );
}
