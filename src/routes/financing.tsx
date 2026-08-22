import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Field, SelectField, TextField } from "@/components/site/Field";
import { submitLead } from "@/lib/lead";
import { site } from "@/lib/site";

export const Route = createFileRoute("/financing")({
  validateSearch: (search: Record<string, unknown>) => ({
    vehicle: typeof search["vehicle"] === "string" ? search["vehicle"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Used Car Financing in ${site.city}, GA | ${site.name}` },
      {
        name: "description",
        content: `Apply online for used car financing near ${site.city}, GA. All credit situations welcome — fast pre-approval decisions from multiple lenders.`,
      },
      { property: "og:title", content: `Used Car Financing in ${site.city}, GA` },
      {
        property: "og:description",
        content: "Submit a secure online finance application and get pre-approved fast.",
      },
    ],
  }),
  component: FinancingPage,
});

const perks = [
  { icon: Clock, title: "Fast Decisions", copy: "Most applications get a lender response the same business day." },
  { icon: Users, title: "All Credit Welcome", copy: "First-time buyers, rebuilt credit and strong credit all considered." },
  { icon: ShieldCheck, title: "No Obligation", copy: "Applying does not commit you to buying a vehicle from us." },
];

function FinancingPage() {
  const { vehicle } = Route.useSearch();

  return (
    <>
      <PageHeader
        eyebrow="Financing"
        title="Get Pre-Approved Online"
        description="Fill out the secure application below and our finance team will match you with a lender program that fits your budget."
      />

      <section className="bg-surface py-12">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {perks.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <Icon className="h-6 w-6 text-primary" />
              <h2 className="mt-3 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="container-page">
          <form
            onSubmit={(e) => submitLead("finance-application", e)}
            className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
          >
            <h2 className="text-2xl font-bold">Finance Application</h2>

            <h3 className="mt-7 text-lg font-bold text-primary">Applicant Information</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Date of Birth" name="dob" type="date" />
              <Field label="Street Address" name="address" required className="sm:col-span-2" />
              <Field label="City" name="city" required />
              <Field label="State / ZIP" name="stateZip" required />
              <SelectField
                label="Housing Status"
                name="housing"
                options={["Rent", "Own", "Live with family", "Other"]}
              />
              <Field label="Monthly Housing Payment" name="housingPayment" placeholder="$1,200" />
            </div>

            <h3 className="mt-8 text-lg font-bold text-primary">Employment & Income</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Employer" name="employer" required />
              <Field label="Job Title" name="jobTitle" />
              <Field label="Time at Employer" name="timeEmployed" placeholder="2 years 6 months" />
              <Field label="Gross Monthly Income" name="income" required placeholder="$4,500" />
              <SelectField
                label="Income Type"
                name="incomeType"
                options={["W-2 Employment", "Self-Employed", "Fixed Income", "Other"]}
              />
              <Field label="Additional Income (optional)" name="otherIncome" />
            </div>

            <h3 className="mt-8 text-lg font-bold text-primary">Vehicle & Credit</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Desired Vehicle"
                name="vehicle"
                defaultValue={vehicle}
                placeholder="2022 Brightline Summit Touring"
              />
              <Field label="Down Payment" name="downPayment" placeholder="$2,000" />
              <SelectField
                label="Credit Situation"
                name="credit"
                options={[
                  "Excellent (720+)",
                  "Good (660-719)",
                  "Fair (600-659)",
                  "Rebuilding (below 600)",
                  "No credit history",
                ]}
              />
              <Field label="Target Monthly Payment" name="targetPayment" placeholder="$400" />
              <TextField label="Comments" name="comments" className="sm:col-span-2" />
            </div>

            <p className="mt-6 rounded-md border border-border bg-muted p-4 text-xs text-muted-foreground">
              <strong className="text-foreground">Disclaimer:</strong> Submitting this application
              does not guarantee credit approval. All financing is subject to lender approval, and
              final terms, rates, and down payment requirements are determined by the lender and by{" "}
              {site.name} dealership terms. Submitting this form authorizes us to share your
              information with participating lenders for the purpose of evaluating your application,
              which may include a credit inquiry.
            </p>

            <Button type="submit" variant="hero" size="xl" className="mt-6 w-full sm:w-auto sm:px-14">
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
