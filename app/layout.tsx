import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "./providers";
import JsonLd from "@/components/seo/json-ld";
import { getSiteUrl, SITE_NAME } from "@/lib/site-config";

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#252641" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  title: {
    default: "Volt Plus",
    template: "%s | Volt Plus",
  },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  description:
    "Volt Plus՝ շինարարություն, վերանորոգում և ինժեներական աջակցություն Հայաստանում։ Also known as VoltPlus — construction, renovation, and engineering in Yerevan and Armenia.",

  keywords: [
    "Volt Plus",
    "շինարարություն",
    "վերանորոգում",
    "նախագծեր",
    "Երևան",
    "VoltPlus",
    "volt plus",
    "voltplus",
    "Yerevan construction",
    "Armenia construction",
    "renovation Armenia",
  ],

  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "construction",
  classification: "Construction and renovation",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  openGraph: {
    title: "Volt Plus",
    description:
      "Շինարարություն, վերանորոգում և որակյալ իրականացում Հայաստանում։ VoltPlus — construction and renovation in Armenia.",
    url: siteUrl,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volt Plus — construction and renovation in Armenia",
      },
    ],
    locale: "hy_AM",
    alternateLocale: ["en_US"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Volt Plus",
    description:
      "Volt Plus (VoltPlus) — construction, renovation, and engineering in Armenia.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hy">
      <body>
        <JsonLd />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
