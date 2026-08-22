import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { site } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${site.name}` },
      {
        name: "description",
        content: `How ${site.name} collects, uses and protects the information you submit through our website forms.`,
      },
      { property: "og:title", content: `Privacy Policy | ${site.name}` },
      { property: "og:description", content: "Our website privacy practices." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Information We Collect",
    body: `We collect the information you voluntarily provide through our contact, car finder, test drive, vehicle inquiry and finance application forms. This may include your name, phone number, email address, mailing address, employment and income details, and vehicle preferences.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your information to respond to your inquiry, schedule appointments, locate vehicles on your behalf, and, where you have applied for financing, to submit your application to participating lenders for review.`,
  },
  {
    title: "Sharing",
    body: `We do not sell your personal information. Finance application information is shared only with lenders and service providers involved in processing your application, or where required by law.`,
  },
  {
    title: "Credit Inquiries",
    body: `Submitting a finance application authorizes us and participating lenders to obtain your credit report as part of the approval process.`,
  },
  {
    title: "Your Choices",
    body: `You may request that we correct or delete the information you have submitted, or that we stop contacting you, at any time by calling or emailing the dealership.`,
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-background py-14">
        <div className="container-page max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-primary hover:underline">
              {site.email}
            </a>{" "}
            or {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
