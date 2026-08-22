import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { site } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms of Use | ${site.name}` },
      {
        name: "description",
        content: `Terms governing the use of the ${site.name} website, vehicle listings and online forms.`,
      },
      { property: "og:title", content: `Terms of Use | ${site.name}` },
      { property: "og:description", content: "Website terms of use." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Website Use",
    body: `This website is provided for informational purposes to help you shop our pre-owned inventory. By using the site you agree not to misuse it or submit false information through our forms.`,
  },
  {
    title: "Vehicle Listings & Pricing",
    body: `Vehicle information, photographs, availability and pricing are believed accurate but are not guaranteed and may change without notice. Listings do not constitute an offer of sale. Advertised prices exclude tax, tag, title and dealer fees unless stated otherwise. Please confirm details with the dealership before purchase.`,
  },
  {
    title: "Financing",
    body: `Any pre-qualification or estimated payment shown on this site is illustrative only. All financing is subject to lender approval, credit review and final dealership and lender terms.`,
  },
  {
    title: "Third-Party Links",
    body: `Our site may link to third-party services such as maps or lender portals. We are not responsible for the content or practices of those services.`,
  },
  {
    title: "Limitation of Liability",
    body: `${site.name} is not liable for indirect or incidental damages arising from use of this website or reliance on information published here.`,
  },
];

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" />
      <section className="bg-background py-14">
        <div className="container-page max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
