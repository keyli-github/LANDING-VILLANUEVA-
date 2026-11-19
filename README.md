# Inversiones Villanueva

Landing en Next.js con App Router. Requiere Node.js 22 o 24 y npm.

## Ejecutar en desarrollo

```sh
npm ci
npm run dev
```

Abre http://localhost:3000.

## Producción

```sh
npm run build
```

Publica el contenido de `out/` en un alojamiento estático. Los textos, testimonios y el número de WhatsApp se editan en `app/data.js`. Las fotografías WebP y los iconos están en `public/media/`. Los contadores de la franja empiezan a animarse al cargar la página.

## Datos de la agencia

- En `exchangeRates`, escribe las tasas de compra y venta presencial en soles por dólar y el momento de actualización en `updatedAt` con formato ISO y zona horaria. Los valores `null` muestran el enlace para consultar esa operación.
- En `storefrontPhoto`, indica la ruta pública de una foto de la fachada, por ejemplo `/media/fachada.webp`. La miniatura aparece junto a **Cómo llegar**.
- Los clics a WhatsApp generan el evento `whatsapp_click` en `window.dataLayer` con `origen`, `servicio` y `destino`. Los conteos de la pestaña se pueden revisar con `sessionStorage.getItem("villanueva.whatsappClicks")`. Para reunir clics de distintos visitantes, conecta ese evento a un recolector de analítica.
