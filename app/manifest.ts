import type { MetadataRoute } from "next";
import { getSiteUrl, SITE_NAME } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  const base = getSiteUrl();

  return {
    name: SITE_NAME,
    short_name: "VoltPlus",
    description:
      "Volt Plus — construction, renovation, and engineering in Armenia (Yerevan).",
    start_url: `${base}/`,
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#2b2d4a",
    icons: [
      {
        src: "/favicon.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
