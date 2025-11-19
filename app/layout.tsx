import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PaintPower - Professional Painting & Remodeling NYC | Since 2007",
  description: "NYC's most reliable painting and interior remodeling company. Professional services for residential and commercial properties since 2007. BBB A+ rated.",
  keywords: ["painting NYC", "interior remodeling", "house painting", "commercial painting", "paintpower", "renovation NYC"],
  authors: [{ name: "PaintPower" }],
  creator: "PaintPower",
  publisher: "PaintPower",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paintpower.net",
    siteName: "PaintPower",
    title: "PaintPower - Professional Painting & Remodeling NYC",
    description: "NYC's most reliable painting and interior remodeling company. Professional services since 2007.",
    images: [
      {
        url: "https://paintpower.net/Img/paint.jpg",
        width: 1200,
        height: 630,
        alt: "PaintPower Professional Painting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PaintPower - Professional Painting & Remodeling NYC",
    description: "NYC's most reliable painting and remodeling company since 2007",
    images: ["https://paintpower.net/Img/paint.jpg"],
  },
  alternates: { canonical: "https://paintpower.net" },
  generator: "paint.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/icon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "Paint Power Painting & Remodeling",
              description: "Professional bathroom renovation and remodeling services in NYC & Hudson Valley - Licensed contractor since 2007",
              url: "https://paintpower.net",
              logo: "https://paintpower.net/Img/paint.jpg",
              image: "https://paintpower.net/Img/paint.jpg",
              telephone: "+1-800-351-4820",
              email: "info@paintpower.net",
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2 Woodland Way N",
                addressLocality: "Ellenville",
                addressRegion: "NY",
                postalCode: "12428",
                addressCountry: "US"
              },
              areaServed: [
                { "@type": "City", name: "Manhattan", containedInPlace: { "@type": "State", name: "New York" } },
                { "@type": "City", name: "Queens", containedInPlace: { "@type": "State", name: "New York" } },
                { "@type": "City", name: "Brooklyn", containedInPlace: { "@type": "State", name: "New York" } },
                { "@type": "City", name: "Bronx", containedInPlace: { "@type": "State", name: "New York" } },
                { "@type": "AdministrativeArea", name: "Westchester County" },
                { "@type": "AdministrativeArea", name: "Nassau County" },
                { "@type": "AdministrativeArea", name: "Suffolk County" },
                { "@type": "AdministrativeArea", name: "Orange County" },
                { "@type": "AdministrativeArea", name: "Ulster County" },
                { "@type": "AdministrativeArea", name: "Sullivan County" }
              ],
              serviceType: [
                "Bathroom Renovation",
                "Bathroom Remodeling",
                "Kitchen Remodeling",
                "Interior Painting",
                "Exterior Painting",
                "Home Improvement"
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "100+",
                bestRating: "5",
                worstRating: "1"
              },
              foundingDate: "2007",
              slogan: "Professional Painting & Remodeling in New York",
              sameAs: ["https://paintpower.net"],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
