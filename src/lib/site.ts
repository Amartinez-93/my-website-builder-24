export const site = {
  name: "88 Auto Sales LLC",
  shortName: "88 Auto Sales",
  city: "Norcross",
  state: "GA",
  addressLine: "1288 Peachtree Industrial Blvd",
  zip: "30093",
  phone: "(770) 555-0188",
  phoneHref: "tel:+17705550188",
  email: "sales@88autosalesllc.com",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
} as const;

export const fullAddress = `${site.addressLine}, ${site.city}, ${site.state} ${site.zip}`;

export const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);
export const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
