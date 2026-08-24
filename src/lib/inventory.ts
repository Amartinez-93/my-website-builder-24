export type BodyStyle = "Sedan" | "SUV" | "Truck" | "Coupe" | "Hatchback" | "Van";

export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  bodyStyle: BodyStyle;
  transmission: "Automatic" | "Manual" | "CVT";
  fuelType: "Gasoline" | "Hybrid" | "Diesel" | "Electric";
  drivetrain: "FWD" | "RWD" | "AWD" | "4WD";
  engine: string;
  vin: string;
  exteriorColor: string;
  interiorColor: string;
  images: string[];
  featured?: boolean;
  highlights: string[];
}

/**
 * Live inventory is managed in the Inventory Manager. This list is empty
 * until vehicles are added there.
 */
export const vehicles: Vehicle[] = [];

export const bodyStyles: BodyStyle[] = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van"];

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id);

export const uniqueMakes = () => Array.from(new Set(vehicles.map((v) => v.make))).sort();

export const modelsForMake = (make: string) =>
  Array.from(
    new Set(vehicles.filter((v) => (make === "any" ? true : v.make === make)).map((v) => v.model)),
  ).sort();

export const uniqueYears = () =>
  Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a);

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const formatMiles = (n: number) => `${n.toLocaleString("en-US")} mi`;

export const vehicleTitle = (v: Vehicle) => `${v.year} ${v.make} ${v.model} ${v.trim}`;
