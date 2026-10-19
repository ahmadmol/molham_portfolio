import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";
import { publicUrl, siteOrigin } from "@/lib/url";
import MotionProvider from "@/components/ui/MotionProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const origin = siteOrigin();
const canonical = origin + publicUrl("/");
const image = origin + publicUrl("og-image.png");
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: portfolio.metaTitle,
  description: portfolio.metaDescription,
  authors: [{ name: portfolio.title }],
  alternates: { canonical },
  openGraph: {
    type: "website",
    title: portfolio.metaTitle,
    description: portfolio.metaDescription,
    url: canonical,
    siteName: portfolio.title,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Molham Alnaeb — Mobile Developer. Kotlin, Jetpack Compose & Flutter.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.metaTitle,
    description: portfolio.metaDescription,
    images: [image],
  },
  robots: { index: true, follow: true },
  icons: { icon: publicUrl("brand-mark.svg") },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
