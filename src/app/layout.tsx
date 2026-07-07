import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getSiteUrl = () => {
  // Recommended: set NEXT_PUBLIC_SITE_URL in your environment.
  // Example: https://your-domain.com
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw && raw.trim()) return new URL(raw.trim());
  // Fallback to local dev
  return new URL("http://localhost:3000");
};

export const metadata: Metadata = {
  title: portfolio.metaTitle,
  description: portfolio.metaDescription,
  metadataBase: getSiteUrl(),
  openGraph: {
    type: "website",
    title: portfolio.metaTitle,
    description: portfolio.metaDescription,
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Molham Alnaeb portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.metaTitle,
    description: portfolio.metaDescription,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
