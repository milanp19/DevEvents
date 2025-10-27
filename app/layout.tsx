import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

const schibsted_grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martian_mono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Must'nt Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${schibsted_grotesk.variable} ${martian_mono.variable} antialiased min-h-screen`}>
        <Navbar />
        <div className="absolute inset-0 z-[-1] top-0 min-h-screen">
            <LightRays
                raysOrigin="top-center-offset"
                raysColor="#5dfeca"
                raysSpeed={0.5}
                lightSpread={0.9}
                rayLength={1.4}
                followMouse={true}
                mouseInfluence={0.02}
                noiseAmount={0.0}
                distortion={0.01}
            />
        </div>
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
