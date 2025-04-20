import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Vibe Kit";
const siteDescription = "Curated components perfect for building modern React apps";
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kit.vibehaus.xyz"; // Default to production URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`, // For nested pages if any
  },
  description: siteDescription,
  // Add icons metadata
  icons: {
    icon: "/favicon.svg", // Path to your new SVG favicon
    // You can also add apple-touch-icon, etc. here if needed
  },
  // Add Open Graph metadata
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [
      {
        url: '/og', // Relative path to the OG image route
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Optional: Add Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    // images: ['/og'], // You can reuse the relative path
    // creator: '@your_twitter_handle', // Add if you have one
  },
  // Optional: Add robots meta tag (useful for production)
  robots: {
     index: true,
     follow: true,
     googleBot: {
       index: true,
       follow: true,
       'max-video-preview': -1,
       'max-image-preview': 'large',
       'max-snippet': -1,
     },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0d0d0d]`}
      >
        {children}
      </body>
    </html>
  );
}
