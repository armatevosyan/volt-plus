import { getSiteUrl, SITE_BRAND_ALIASES, SITE_NAME } from "@/lib/site-config";

export default function JsonLd() {
  const base = getSiteUrl();
  const orgId = `${base}/#organization`;
  const siteId = `${base}/#website`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: SITE_NAME,
    alternateName: [...SITE_BRAND_ALIASES],
    url: base,
    logo: `${base}/logo.jpeg`,
    description:
      "Volt Plus (VoltPlus) — construction, renovation, and engineering support in Armenia, based in Yerevan.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shengavit, Mantashyan street 4/7",
      addressLocality: "Yerevan",
      addressCountry: "AM",
    },
    telephone: ["+37433011098", "+37477745774"],
    areaServed: {
      "@type": "Country",
      name: "Armenia",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    name: SITE_NAME,
    alternateName: [...SITE_BRAND_ALIASES],
    url: base,
    inLanguage: ["hy-AM"],
    publisher: { "@id": orgId },
    description:
      "Official site of Volt Plus (VoltPlus) — residential and industrial construction, renovation, and engineering in Yerevan and Armenia.",
  };

  const payload = [organization, website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
