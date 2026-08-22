export const site = {
  name: "88 Auto Sales LLC",
  shortName: "88 Auto Sales",
  city: "Snellville",
  state: "GA",
  addressLine: "2140 McGee Rd",
  zip: "30078",
  phone: "Will 401-654-8310, Alex  706-360-5050",
  phoneHref: "tel:+14016548310",
  email: "88AutoSalesLLC@gmail.com",
  hours: [
    { day: "Monday – Friday", time: "BY Appointment" },
    { day: "Saturday", time: "BY Appointment" },
    { day: "Sunday", time: "BY Appointment" },
  ],
} as const;

export const fullAddress = `${site.addressLine}, ${site.city}, ${site.state} ${site.zip}`;

export const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);
export const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
