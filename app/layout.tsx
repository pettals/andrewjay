import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import AnalyticsStub from "@/components/AnalyticsStub";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Andrew Joh — Portfolio",
    template: "%s — Andrew Joh",
  },
  description:
    "Creative director and designer. Video, brand strategy, and product design.",
  metadataBase: new URL("https://andrewjoh.com"),
  openGraph: {
    title: "Andrew Joh — Portfolio",
    description:
      "Creative director and designer. Video, brand strategy, and product design.",
    url: "https://andrewjoh.com",
    siteName: "Andrew Joh",
    images: [
      { url: "/og.svg", width: 1200, height: 630, alt: "Andrew Joh Portfolio" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Joh — Portfolio",
    description:
      "Creative director and designer. Video, brand strategy, and product design.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-bg text-fg`}>        
        <header className="fixed right-0 top-0 z-50">
          <Nav />
        </header>
        {children}
        <AnalyticsStub />
      </body>
    </html>
  );
}
