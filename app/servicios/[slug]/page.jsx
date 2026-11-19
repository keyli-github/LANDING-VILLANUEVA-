import { notFound } from "next/navigation";
import { servicePath, services } from "../../data";
import Landing from "../../page";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

function findServiceIndex(slug) {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) notFound();
  return index;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { name, description } = services[findServiceIndex(slug)];
  const title = name + " | Inversiones Villanueva";
  const url = servicePath(slug);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "es_PE",
      siteName: "Inversiones Villanueva",
      images: [{
        url: `/vistas-previas/${slug}.jpg`,
        width: 720,
        height: 480,
        type: "image/jpeg",
        alt: name,
      }],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  return <Landing initialService={findServiceIndex(slug)} />;
}
