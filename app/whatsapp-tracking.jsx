import { whatsapp } from "./data";

const storageKey = "villanueva.whatsappClicks";

export function trackWhatsApp(origin, { service = null, destination = null } = {}) {
  const event = {
    event: "whatsapp_click",
    origen: origin,
    servicio: service,
    destino: destination,
  };

  try {
    (window.dataLayer ??= []).push(event);
  } catch {
    // A tag collector must not block contact with the agency.
  }

  try {
    const key = [origin, service, destination].filter(Boolean).join(" · ");
    const counts = JSON.parse(sessionStorage.getItem(storageKey) ?? "{}");
    const previous = Number.isSafeInteger(counts[key]) ? counts[key] : 0;
    counts[key] = previous + 1;
    sessionStorage.setItem(storageKey, JSON.stringify(counts));
  } catch {
    // Some browsers disable storage, so keep the contact action available.
  }
}

export function WhatsAppLink({ origin, service, href = whatsapp, ...props }) {
  return (
    <a {...props} href={href} onClick={() => trackWhatsApp(origin, { service })} />
  );
}
