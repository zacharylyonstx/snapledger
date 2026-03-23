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
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
