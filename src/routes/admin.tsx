import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextField } from "@/components/site/Field";
import { PageHeader } from "@/components/site/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import { fetchAllVehicles, slugify, type VehicleRow } from "@/lib/vehicles";
import { formatMiles, formatPrice } from "@/lib/inventory";
import { site } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Inventory Manager | ${site.name}` },
      {
        name: "description",
        content: `Private dashboard for ${site.name} staff to add, edit and remove vehicles listed on the website.`,
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Inventory Manager | ${site.name}` },
      { property: "og:description", content: "Manage the vehicles shown on the website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const bodyOptions = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van"] as const;
const transOptions = ["Automatic", "Manual", "CVT"] as const;
const fuelOptions = ["Gasoline", "Hybrid", "Diesel", "Electric"] as const;
const driveOptions = ["FWD", "RWD", "AWD", "4WD"] as const;

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user, isAdmin, loading, checkingRole } = useAuth();
  const [editing, setEditing] = useState<VehicleRow | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const list = useQuery({
    queryKey: ["vehicles", "admin"],
    queryFn: fetchAllVehicles,
    enabled: Boolean(user) && isAdmin,
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["vehicles"] });
  };

  const save = useMutation({
    mutationFn: async (payload: TablesInsert<"vehicles">) => {
      if (payload.id) {
        const { id, ...rest } = payload;
        const { error } = await supabase.from("vehicles").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("vehicles").insert(payload as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Vehicle saved");
      setShowForm(false);
      setEditing(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Vehicle removed");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const claim = async () => {
    const { data, error } = await supabase.rpc("claim_first_admin");
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      toast.success("You now have admin access.");
      window.location.reload();
    } else {
      toast.error("An admin already exists for this site.");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const year = Number(f.get("year"));
    const make = String(f.get("make"));
    const model = String(f.get("model"));
    const trim = String(f.get("trim") ?? "");
    const payload = {
      ...(editing ? { id: editing.id } : {}),
      slug: editing?.slug ?? slugify(`${year} ${make} ${model} ${trim}`),
      year,
      make,
      model,
      trim,
      price: Number(f.get("price")),
      mileage: Number(f.get("mileage")),
      body_style: String(f.get("body_style")),
      transmission: String(f.get("transmission")),
      fuel_type: String(f.get("fuel_type")),
      drivetrain: String(f.get("drivetrain")),
      engine: String(f.get("engine") ?? ""),
      vin: String(f.get("vin") ?? ""),
      exterior_color: String(f.get("exterior_color") ?? ""),
      interior_color: String(f.get("interior_color") ?? ""),
      images: lines(f.get("images")),
      highlights: lines(f.get("highlights")),
      description: String(f.get("description") ?? ""),
      featured: f.get("featured") === "on",
      sold: f.get("sold") === "on",
    };
    save.mutate(payload);
  };

  if (loading || checkingRole) {
    return (
      <div className="container-page py-24 text-center text-muted-foreground">Loading…</div>
    );
  }

  if (user && !isAdmin) {
    return (
      <>
        <PageHeader eyebrow="Staff" title="Admin Access Needed" description="" />
        <section className="bg-surface py-14">
          <div className="container-page max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-semibold text-foreground">{user.email}</span>. If
              you are the owner setting this up for the first time, claim admin access below.
            </p>
            <Button variant="hero" size="xl" className="mt-6 w-full" onClick={claim}>
              Claim Admin Access
            </Button>
            <button
              className="mt-4 text-sm text-muted-foreground hover:text-primary"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              Sign out
            </button>
          </div>
        </section>
      </>
    );
  }

  const vehicles = list.data ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Staff Only"
        title="Inventory Manager"
        description="Add your real vehicles here. Everything you save shows up on the website instantly."
      />

      <section className="bg-surface py-10">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{vehicles.length}</span> vehicles in the
              system
            </p>
            <div className="flex gap-3">
              <Button
                variant="hero"
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
              >
                <Plus /> Add Vehicle
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate({ to: "/auth" });
                }}
              >
                <LogOut /> Sign Out
              </Button>
            </div>
          </div>

          {showForm && (
            <form
              onSubmit={onSubmit}
              className="mt-6 grid gap-4 rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h2 className="text-2xl font-bold">{editing ? "Edit Vehicle" : "New Vehicle"}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Year" name="year" type="number" required defaultValue={editing ? String(editing.year) : ""} />
                <Field label="Make" name="make" required defaultValue={editing?.make ?? ""} />
                <Field label="Model" name="model" required defaultValue={editing?.model ?? ""} />
                <Field label="Trim" name="trim" defaultValue={editing?.trim ?? ""} />
                <Field label="Price (USD)" name="price" type="number" required defaultValue={editing ? String(editing.price) : ""} />
                <Field label="Mileage" name="mileage" type="number" required defaultValue={editing ? String(editing.mileage) : ""} />
                <SelectField label="Body Style" name="body_style" options={bodyOptions} defaultValue={editing?.body_style ?? "Sedan"} />
                <SelectField label="Transmission" name="transmission" options={transOptions} defaultValue={editing?.transmission ?? "Automatic"} />
                <SelectField label="Fuel Type" name="fuel_type" options={fuelOptions} defaultValue={editing?.fuel_type ?? "Gasoline"} />
                <SelectField label="Drivetrain" name="drivetrain" options={driveOptions} defaultValue={editing?.drivetrain ?? "FWD"} />
                <Field label="Engine" name="engine" defaultValue={editing?.engine ?? ""} />
                <Field label="VIN" name="vin" defaultValue={editing?.vin ?? ""} />
                <Field label="Exterior Color" name="exterior_color" defaultValue={editing?.exterior_color ?? ""} />
                <Field label="Interior Color" name="interior_color" defaultValue={editing?.interior_color ?? ""} />
              </div>

              <TextField
                label="Photo links (one per line — first one is the main photo)"
                name="images"
                rows={4}
                placeholder="https://…/front.jpg"
                defaultValue={(editing?.images ?? []).join("\n")}
              />
              <TextField
                label="Highlights (one per line)"
                name="highlights"
                rows={3}
                placeholder="One owner"
                defaultValue={(editing?.highlights ?? []).join("\n")}
              />
              <TextField label="Description" name="description" defaultValue={editing?.description ?? ""} />

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" name="featured" defaultChecked={editing?.featured ?? false} /> Feature on homepage
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" name="sold" defaultChecked={editing?.sold ?? false} /> Sold (hide from site)
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="hero" size="xl" disabled={save.isPending}>
                  {save.isPending ? "Saving…" : "Save Vehicle"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="xl"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 grid gap-4">
            {list.isLoading && <p className="text-sm text-muted-foreground">Loading inventory…</p>}
            {!list.isLoading && vehicles.length === 0 && (
              <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
                <h3 className="text-xl font-bold">No vehicles yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sample cars are showing on the website until you add your first real vehicle.
                </p>
              </div>
            )}
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <img
                  src={v.images[0] ?? ""}
                  alt={`${v.year} ${v.make} ${v.model}`}
                  loading="lazy"
                  className="h-20 w-28 rounded object-cover"
                />
                <div className="min-w-[12rem] flex-1">
                  <h3 className="font-bold">
                    {v.year} {v.make} {v.model} {v.trim}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(v.price)} · {formatMiles(v.mileage)}
                    {v.featured ? " · Featured" : ""}
                    {v.sold ? " · Sold" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditing(v);
                      setShowForm(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Pencil /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("Remove this vehicle from the website?")) remove.mutate(v.id);
                    }}
                  >
                    <Trash2 /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
