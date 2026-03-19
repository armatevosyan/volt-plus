import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://Volt-plus.com"),
  title: {
    default: "Volt-plus",
    template: "%s | Volt-plus",
  },
  icons: {
    icon: "/favicon.jpg",
  },
  description:
    "Discover places, events, and real estate around you with Volt-plus.",

  keywords: ["Volt-plus", "places", "events", "real estate", "travel app"],

  authors: [{ name: "Volt-plus Team" }],

  openGraph: {
    title: "Volt-plus",
    description: "Discover places, events, and real estate around you.",
    url: "https://Volt-plus.com",
    siteName: "Volt-plus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Volt-plus",
    description: "Discover places, events, and real estate around you.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
