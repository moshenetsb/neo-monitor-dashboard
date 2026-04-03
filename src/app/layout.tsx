import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEO Monitoring Dashboard",
  description:
    "Interactive dashboard monitoring Near-Earth Objects (asteroids) using NASA's NeoWs API. Track distances, velocities, and potential hazards in real-time.",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
  keywords: [
    "Near‑Earth Objects",
    "NEO",
    "Monitoring",
    "Dashboard",
    "Space",
    "Asteroids",
    "Comets",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning={true}
    >
      <body className="flex flex-col antialiased m-0 min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
