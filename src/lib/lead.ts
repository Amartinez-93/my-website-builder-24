import { toast } from "sonner";

/**
 * Placeholder lead handler. All dealership forms funnel through here so a real
 * CRM / email backend can be wired up in one place later.
 */
export function submitLead(type: string, event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  console.info(`[lead:${type}]`, data);
  toast.success("Request received", {
    description: "A member of our team will reach out shortly. For faster service, give us a call.",
  });
  form.reset();
}
