import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { vehicles as demoVehicles, type BodyStyle, type Vehicle } from "@/lib/inventory";

export interface VehicleRow {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  body_style: string;
  transmission: string;
  fuel_type: string;
  drivetrain: string;
  engine: string;
  vin: string;
  exterior_color: string;
  interior_color: string;
  images: string[];
  highlights: string[];
  description: string;
  featured: boolean;
  sold: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1280&q=80";

export function rowToVehicle(r: VehicleRow): Vehicle {
  return {
    id: r.slug,
    year: r.year,
    make: r.make,
    model: r.model,
    trim: r.trim,
    price: r.price,
    mileage: r.mileage,
    bodyStyle: r.body_style as BodyStyle,
    transmission: r.transmission as Vehicle["transmission"],
    fuelType: r.fuel_type as Vehicle["fuelType"],
    drivetrain: r.drivetrain as Vehicle["drivetrain"],
    engine: r.engine,
    vin: r.vin,
    exteriorColor: r.exterior_color,
    interiorColor: r.interior_color,
    images: r.images.length > 0 ? r.images : [FALLBACK_IMAGE],
    featured: r.featured,
    highlights: r.highlights,
  };
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchPublicVehicles(): Promise<VehicleRow[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("sold", false)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as VehicleRow[];
}

export async function fetchAllVehicles(): Promise<VehicleRow[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as VehicleRow[];
}

/**
 * Live inventory from the database. While no vehicles have been added yet,
 * the original sample vehicles are shown so the site never looks empty.
 */
export function useInventory() {
  const query = useQuery({ queryKey: ["vehicles", "public"], queryFn: fetchPublicVehicles });
  const rows = query.data ?? [];
  const list = rows.map(rowToVehicle);
  const isSample = !query.isLoading && list.length === 0;
  return {
    vehicles: isSample ? demoVehicles : list,
    isSample,
    isLoading: query.isLoading,
  };
}

export const uniqueMakesOf = (list: Vehicle[]) =>
  Array.from(new Set(list.map((v) => v.make))).sort();

export const modelsForMakeOf = (list: Vehicle[], make: string) =>
  Array.from(
    new Set(list.filter((v) => (make === "any" ? true : v.make === make)).map((v) => v.model)),
  ).sort();

export const uniqueYearsOf = (list: Vehicle[]) =>
  Array.from(new Set(list.map((v) => v.year))).sort((a, b) => b - a);
