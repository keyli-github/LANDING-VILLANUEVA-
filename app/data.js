export const whatsapp = "https://wa.me/51963403290";
export const consultMessage = (subject) =>
  "Hola, Inversiones Villanueva. Quisiera información sobre " + subject + ".";
export const consult = (subject) =>
  whatsapp + "?text=" + encodeURIComponent(consultMessage(subject));
export const mail = "franklinvillanuevarobles29@gmail.com";
export const phone = "+51 963 403 290";
export const address = "Calle San Pedro S/N, Pataz, La Libertad, Perú";
export const businessHours = "Lun. a dom. · 6:30 a. m. – 7:30 p. m.";
export const shortBusinessHours = "Lun.–dom. 6:30–19:30";
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
export const services = [
  [
    "Envío nacional",
    "Transfiere dinero a cualquier parte del Perú. Elige depósito en cuenta bancaria o retiro en efectivo en agencia.",
  ],
  [
    "Remesas internacionales",
    "Envía dinero a Chile, Ecuador, Colombia y Venezuela con tipos de cambio competitivos y entrega garantizada.",
  ],
  [
    "Cambio de divisas",
    "Compra y vende dólares, euros y otras divisas con tasas competitivas y sin comisiones ocultas.",
  ],
  [
    "Pago de servicios",
    "Paga tus recibos de agua, luz, teléfono y otros servicios desde nuestra agencia.",
  ],
  [
    "Giros bancarios",
    "Realizamos depósitos y transferencias directamente a cuentas bancarias.",
  ],
  [
    "Pagos en efectivo",
    "Recibe o entrega pagos en efectivo con atención personalizada en nuestra agencia de Pataz.",
  ],
  [
    "Recargas de videojuegos",
    "Consulta los juegos disponibles y elige el monto de tu recarga.",
  ],
  [
    "Plataformas de streaming",
    "Consulta las plataformas disponibles y el plazo de alquiler.",
  ],
];
export const destinations = [
  ["Chile", "Peso chileno", "CLP ($)", "cl"],
  ["Ecuador", "Dólar estadounidense", "USD ($)", "ec"],
  ["Colombia", "Peso colombiano", "COP ($)", "co"],
  ["Venezuela", "Bolívar soberano", "VES (Bs.S)", "ve"],
];
// Rates in soles per unit. Use an ISO timestamp with a timezone for updatedAt.
// A null rate offers a WhatsApp consultation for that operation.
export const exchangeRates = {
  updatedAt: null,
  USD: { compra: null, venta: null },
  EUR: { compra: null, venta: null },
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
