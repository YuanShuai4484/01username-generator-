import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

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

export const metadata: Metadata = {
  title: {
    default: "Username Generator - Free Handle Ideas | username-generator.app",
    template: "%s | username-generator.app",
  },
  description:
    "Generate unique, SEO-friendly usernames with style presets, length control, and availability hints for creators, gamers, and brands across social and domains.",
  keywords: [
    "username generator",
    "gamertag generator",
    "instagram username generator",
    "tiktok username generator",
    "brandable usernames",
    "handle checker",
    "name ideas",
  ],
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  openGraph: {
    title: "Username Generator - Free Handle Ideas | username-generator.app",
    description:
      "Generate unique usernames with style presets, filters, and availability hints for social platforms and domains.",
    url: siteConfig.url,
    siteName: "Username Generator",
    images: siteConfig.ogImage
      ? [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Username Generator" }]
      : undefined,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Username Generator - Free Handle Ideas | username-generator.app",
    description:
      "Generate unique usernames with style presets, filters, and availability hints for social platforms and domains.",
    images: siteConfig.ogImage ? [siteConfig.ogImage] : undefined,
    creator: siteConfig.twitter,
  },
  alternates: {
    canonical: siteConfig.url || "https://username-generator.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Dr6PGoew-ib9xRZkI-664ACu-q_Ai6pKV4r-Hgo-zzw"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
