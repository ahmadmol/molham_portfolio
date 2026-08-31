import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

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

const repoName = "molham_portfolio";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  `https://${repoName}.github.io`;

const getSiteUrl = () => {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
};

const fullName = portfolio.title;
const pageTitle = `${fullName} — ${portfolio.subtitle}`;
const description = portfolio.metaDescription;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: pageTitle,
    template: `%s — ${fullName}`,
  },
  description,
  applicationName: `${fullName} — Portfolio`,
  authors: [{ name: fullName }],
  keywords: [
    "Android Developer",
    "Kotlin",
    "Jetpack Compose",
    "Mobile Developer",
    "Portfolio",
    "Syria",
    "Aleppo",
    fullName,
  ],
  openGraph: {
    type: "website",
    title: pageTitle,
    description,
    siteName: `${fullName} — Portfolio`,
    url: `/${repoName}/`,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${fullName} — Android Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
