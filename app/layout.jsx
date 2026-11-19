import "./global.css";
export const metadata = {
  title: "Inversiones Villanueva | Remesas desde Pataz",
  description:
    "Envíos de dinero, cambio de divisas, pagos, videojuegos y streaming desde Pataz, La Libertad, Perú.",
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
