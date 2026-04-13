import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://voltplus.com"),
  title: {
    default: "Volt Plus",
    template: "%s | Volt Plus",
  },
  icons: {
    icon: "/favicon.jpg",
  },
  description:
    "Volt Plus՝ շինարարություն, վերանորոգում և ինժեներական աջակցություն Հայաստանում։",

  keywords: [
    "Volt Plus",
    "շինարարություն",
    "վերանորոգում",
    "նախագծեր",
    "Երևան",
  ],

  authors: [{ name: "Volt Plus" }],

  openGraph: {
    title: "Volt Plus",
    description:
      "Շինարարություն, վերանորոգում և որակյալ իրականացում Հայաստանում։",
    url: "https://voltplus.com",
    siteName: "Volt Plus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hy_AM",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Volt Plus",
    description:
      "Շինարարություն, վերանորոգում և որակյալ իրականացում Հայաստանում։",
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
    <html lang="hy">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
