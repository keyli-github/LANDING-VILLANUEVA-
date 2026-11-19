export const whatsapp = "https://wa.me/51963403290";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://landingvillanueva.vercel.app";
const consultMessage = (subject) =>
  "Hola, Inversiones Villanueva. Quisiera información sobre " + subject + ".";
export const consult = (subject, link) => {
  const message = consultMessage(subject);
  return whatsapp + "?text=" + encodeURIComponent(link ? message + "\n\n" + link : message);
};
export const mail = "franklinvillanuevarobles29@gmail.com";
export const phone = "+51 963 403 290";
export const address = "Calle San Pedro S/N, Pataz, La Libertad, Perú";
export const businessHours = "Lun. a dom. · 6:30 a. m. – 7:30 p. m.";
export const shortBusinessHours = "Lun.–dom. 6:30–19:30";
export const dollarExchangeSubject = "el cambio presencial de dólares en Pataz";
// Use a local image of the actual storefront when it is available.
export const storefrontPhoto = null;
// Street-area viewport between the INEI locality and the municipal office.
const mapCenter = encodeURIComponent("-7.78637,-77.59439");
const mapZoom = 16;
export const mapEmbed =
  "https://www.google.com/maps?hl=es&output=embed&t=h&z=" +
  mapZoom +
  "&ll=" +
  mapCenter;
export const directionsLink =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);

const locationMap = (query) =>
  "https://www.google.com/maps?hl=es&output=embed&t=h&z=17&q=" + encodeURIComponent(query);
const llacuabambaCoordinates = "-8.034366,-77.45514179999999";
const tayabambaCoordinates = "-8.275803,-77.2952117";
const chilliaLocality = "Chillia, Pataz, La Libertad, Perú";

export const branches = [
  {
    id: "pataz",
    name: "Pataz",
    address,
    hours: businessHours,
    shortHours: shortBusinessHours,
    photo: storefrontPhoto,
    directions: directionsLink,
    map: mapEmbed,
  },
  {
    id: "llacuabamba",
    name: "Llacuabamba",
    address: "Llacuabamba, Parcoy, La Libertad",
    directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(llacuabambaCoordinates),
    map: locationMap(llacuabambaCoordinates),
  },
  {
    id: "tayabamba",
    name: "Tayabamba",
    address: "Tayabamba, Pataz, La Libertad",
    directions: "https://www.google.com/maps?q=" + tayabambaCoordinates + "&z=17&hl=es",
    map: locationMap(tayabambaCoordinates),
  },
  {
    id: "chillia",
    name: "Chillia",
    address: "Chillia, Pataz, La Libertad",
    directions: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(chilliaLocality),
    map: locationMap(chilliaLocality),
    mapArea: true,
  },
];

export const services = [
  {
    slug: "envio-nacional",
    name: "Envío nacional",
    description: "Transfiere dinero a cualquier parte del Perú. Elige depósito en cuenta bancaria o retiro en efectivo en agencia.",
    subject: "el envío nacional",
  },
  {
    slug: "remesas-internacionales",
    name: "Remesas internacionales",
    description: "Envía dinero a Chile, Ecuador, Colombia y Venezuela con tipos de cambio competitivos y entrega garantizada.",
  },
  {
    slug: "cambio-de-dolares",
    name: "Cambio de dólares",
    description: "Compra y vende dólares de manera presencial en nuestra agencia de Pataz.",
    subject: dollarExchangeSubject,
    images: ["cambio-dolares", "s2b"],
  },
  {
    slug: "pago-de-servicios",
    name: "Pago de servicios",
    description: "Paga tus recibos de agua, luz, teléfono y otros servicios desde nuestra agencia.",
  },
  {
    slug: "giros-bancarios",
    name: "Giros bancarios",
    description: "Realizamos depósitos y transferencias directamente a cuentas bancarias.",
  },
  {
    slug: "pagos-en-efectivo",
    name: "Pagos en efectivo",
    description: "Recibe o entrega pagos en efectivo con atención personalizada en nuestra agencia de Pataz.",
  },
  {
    slug: "recargas-de-videojuegos",
    name: "Recargas de videojuegos",
    description: "Consulta los juegos disponibles y elige el monto de tu recarga.",
  },
  {
    slug: "plataformas-de-streaming",
    name: "Plataformas de streaming",
    description: "Consulta las plataformas disponibles y el plazo de alquiler.",
  },
];

export const serviceImages = (idx) => services[idx].images ?? [`s${idx}a`, `s${idx}b`];
export const servicePath = (slug) => "/servicios/" + slug;
export const consultService = ({ name, slug, subject = name.toLowerCase() }) =>
  consult(subject, new URL(servicePath(slug), siteUrl).href);

export const destinations = [
  ["Chile", "Peso chileno", "CLP ($)", "cl"],
  ["Ecuador", "Dólar estadounidense", "USD ($)", "ec"],
  ["Colombia", "Peso colombiano", "COP ($)", "co"],
  ["Venezuela", "Bolívar soberano", "VES (Bs.S)", "ve"],
];
// Rates in soles per U.S. dollar. Use an ISO timestamp with a timezone for updatedAt.
// A null rate offers a WhatsApp consultation for that operation.
export const exchangeRates = {
  updatedAt: null,
  USD: { compra: null, venta: null },
};
export const reviews = [
  [
    "Jorge Casana",
    "2022 · La Libertad",
    "La rapidez con la que atienden es lo que otras agencias no tienen. Mis transferencias llegan el mismo día y siempre me informan de cada paso.",
  ],
  [
    "Rosmery Castillo",
    "2021 · Pataz",
    "Siempre tienen la disponibilidad de efectivo para los movimientos que se requieren. Nunca me han fallado, incluso en montos grandes.",
  ],
];
