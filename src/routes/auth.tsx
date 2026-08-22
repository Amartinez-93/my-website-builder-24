import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/site/Field";
import { PageHeader } from "@/components/site/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: `Staff Sign In | ${site.name}` },
      {
        name: "description",
        content: `Private sign-in page for ${site.name} staff to manage vehicle inventory.`,
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Staff Sign In | ${site.name}` },
      { property: "og:description", content: "Inventory management sign in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/admin" });
  }, [session, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created — you can sign in now.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Staff Only"
        title="Inventory Sign In"
        description="Sign in to add, edit and remove vehicles from the website."
      />
      <section className="bg-surface py-12">
        <div className="container-page max-w-md">
          <form
            onSubmit={onSubmit}
            className="grid gap-4 rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <Field label="Email" name="email" type="email" required />
            <Field label="Password" name="password" type="password" required />
            <Button type="submit" variant="hero" size="xl" disabled={busy}>
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin"
                ? "First time here? Create your staff account"
                : "Already have an account? Sign in"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
