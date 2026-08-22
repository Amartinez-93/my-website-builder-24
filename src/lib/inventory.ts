import sedanWhite from "@/assets/vehicle-sedan-white.jpg";
import suvGrey from "@/assets/vehicle-suv-grey.jpg";
import truckBlack from "@/assets/vehicle-truck-black.jpg";
import coupeRed from "@/assets/vehicle-coupe-red.jpg";
import hatchbackBlue from "@/assets/vehicle-hatchback-blue.jpg";
import vanSilver from "@/assets/vehicle-van-silver.jpg";
import luxuryBlack from "@/assets/vehicle-luxury-black.jpg";

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
 * Placeholder inventory. To update the live lot, edit this array:
 * add, remove, or change entries and the homepage, inventory page,
 * filters and detail pages all update automatically.
 */
export const vehicles: Vehicle[] = [
  {
    id: "2021-madison-stratus-se",
    year: 2021,
    make: "Madison",
    model: "Stratus",
    trim: "SE",
    price: 18995,
    mileage: 41230,
    bodyStyle: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    engine: "2.5L 4-Cylinder",
    vin: "1M8ST21XKMA004188",
    exteriorColor: "Snowfall White",
    interiorColor: "Black Cloth",
    images: [sedanWhite, suvGrey, luxuryBlack],
    featured: true,
    highlights: ["One owner", "Clean history report", "Backup camera"],
  },
  {
    id: "2022-brightline-summit-touring",
    year: 2022,
    make: "Brightline",
    model: "Summit",
    trim: "Touring AWD",
    price: 27450,
    mileage: 33870,
    bodyStyle: "SUV",
    transmission: "Automatic",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    engine: "3.5L V6",
    vin: "5BL7SM22NC118842",
    exteriorColor: "Graphite Metallic",
    interiorColor: "Charcoal Leather",
    images: [suvGrey, sedanWhite, truckBlack],
    featured: true,
    highlights: ["Third-row seating", "Heated seats", "Apple CarPlay"],
  },
  {
    id: "2020-ironclad-ranger-crew",
    year: 2020,
    make: "Ironclad",
    model: "Ranger 1500",
    trim: "Crew Cab LT",
    price: 31990,
    mileage: 58410,
    bodyStyle: "Truck",
    transmission: "Automatic",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    engine: "5.3L V8",
    vin: "3IC15R20LG774510",
    exteriorColor: "Midnight Black",
    interiorColor: "Jet Black Cloth",
    images: [truckBlack, suvGrey, vanSilver],
    featured: true,
    highlights: ["Tow package", "Bed liner", "4x4 tested"],
  },
  {
    id: "2019-velo-arc-gt",
    year: 2019,
    make: "Velo",
    model: "Arc",
    trim: "GT Coupe",
    price: 24500,
    mileage: 46220,
    bodyStyle: "Coupe",
    transmission: "Manual",
    fuelType: "Gasoline",
    drivetrain: "RWD",
    engine: "2.0L Turbo 4-Cylinder",
    vin: "9VL0ARC19KP330271",
    exteriorColor: "Signal Red",
    interiorColor: "Black Sport Leather",
    images: [coupeRed, luxuryBlack, sedanWhite],
    featured: true,
    highlights: ["6-speed manual", "Sport suspension", "New tires"],
  },
  {
    id: "2021-nimbus-dart-eco",
    year: 2021,
    make: "Nimbus",
    model: "Dart",
    trim: "Eco Hatch",
    price: 15250,
    mileage: 39880,
    bodyStyle: "Hatchback",
    transmission: "CVT",
    fuelType: "Hybrid",
    drivetrain: "FWD",
    engine: "1.8L Hybrid",
    vin: "7NB1DRT21MH559013",
    exteriorColor: "Electric Blue",
    interiorColor: "Grey Cloth",
    images: [hatchbackBlue, sedanWhite, coupeRed],
    featured: true,
    highlights: ["48 MPG combined", "Great commuter", "Low miles"],
  },
  {
    id: "2020-havenline-transit-xl",
    year: 2020,
    make: "Havenline",
    model: "Transit XL",
    trim: "Passenger Van",
    price: 26900,
    mileage: 72400,
    bodyStyle: "Van",
    transmission: "Automatic",
    fuelType: "Diesel",
    drivetrain: "RWD",
    engine: "3.0L Turbo Diesel",
    vin: "4HV3TXL20LB201664",
    exteriorColor: "Brilliant Silver",
    interiorColor: "Grey Vinyl",
    images: [vanSilver, truckBlack, suvGrey],
    highlights: ["Seats 12", "Fleet maintained", "Rear A/C"],
  },
  {
    id: "2022-regalia-crown-executive",
    year: 2022,
    make: "Regalia",
    model: "Crown",
    trim: "Executive",
    price: 34750,
    mileage: 28150,
    bodyStyle: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    engine: "3.3L V6 Twin-Turbo",
    vin: "2RG3CRN22NE887420",
    exteriorColor: "Obsidian Black",
    interiorColor: "Saddle Leather",
    images: [luxuryBlack, sedanWhite, suvGrey],
    featured: true,
    highlights: ["Panoramic roof", "Premium audio", "Ventilated seats"],
  },
  {
    id: "2018-brightline-summit-base",
    year: 2018,
    make: "Brightline",
    model: "Summit",
    trim: "Base FWD",
    price: 16400,
    mileage: 88900,
    bodyStyle: "SUV",
    transmission: "Automatic",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    engine: "2.4L 4-Cylinder",
    vin: "5BL7SM18JC442210",
    exteriorColor: "Steel Grey",
    interiorColor: "Black Cloth",
    images: [suvGrey, hatchbackBlue, sedanWhite],
    highlights: ["Budget friendly", "Serviced on site", "Bluetooth"],
  },
];

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
