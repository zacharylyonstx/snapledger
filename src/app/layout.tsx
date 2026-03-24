import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SnapLedger — AI Invoice & Receipt Processor",
  description:
    "Upload a photo or PDF. Get clean, structured data in seconds. Stop doing manual data entry.",
  keywords: [
    "invoice processing",
    "receipt scanner",
    "AI data extraction",
    "bookkeeping automation",
    "OCR",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SnapLedger",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "AI-powered invoice and receipt processor. Upload a photo or PDF, get clean structured data in seconds.",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free", description: "10 documents/month" },
      { "@type": "Offer", price: "29", priceCurrency: "USD", name: "Pro", description: "200 documents/month + API access" },
      { "@type": "Offer", price: "79", priceCurrency: "USD", name: "Business", description: "Unlimited documents" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "12" },
    url: "https://recycling-fair-pill-paso.trycloudflare.com",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
