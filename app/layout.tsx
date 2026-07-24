import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getSite } from "../lib/content";

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL("https://samanealofts.com"),
  title: {
    default: "Samanea Lofts — jungle lofts above Las Terrenas, Samaná",
    template: "%s · Samanea Lofts",
  },
  description:
    "A small cluster of lofts on a hillside in La Barbacoa, Samaná — ten minutes from Las Terrenas. Stay with us from January 2027, or build your own on one of the last two lots.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samanealofts.com",
    siteName: "Samanea Lofts",
    title: "Samanea Lofts — jungle lofts above Las Terrenas, Samaná",
    description:
      "Between the jungle and the Atlantic on the Samaná peninsula. Opening January 2027. Two lots still available to build on.",
    images: ["/images/construction-01.jpg"],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  slogan: site.tagline,
  url: "https://samanealofts.com",
  email: site.email,
  image: "https://samanealofts.com/images/construction-01.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Barbacoa",
    addressRegion: "Samaná",
    addressCountry: "DO",
  },
  hasMap: site.mapsUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Karla:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-flor focus:px-5 focus:py-2 focus:text-papel"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
