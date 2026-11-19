import "./global.css";
import { siteUrl } from "./data";

const title = "Inversiones Villanueva | Remesas desde Pataz";
const description =
  "Envíos de dinero, cambio presencial de dólares, pagos, videojuegos y streaming desde Pataz, La Libertad, Perú.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    locale: "es_PE",
    siteName: "Inversiones Villanueva",
    images: [{
      url: "/vistas-previas/inversiones-villanueva.jpg",
      width: 720,
      height: 720,
      type: "image/jpeg",
      alt: "Logo de Inversiones Villanueva",
    }],
  },
};
export default function Layout({ children }) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <head>
        <script src="/opening.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
