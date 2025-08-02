import AnimatedBackground from "@/components/AnimatedBackground";
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

export const metadata: Metadata = {
  title: "Vr-Ai Portfolio | Projets Innovants en Réalité Virtuelle et Intelligence Artificielle",
  description: "Découvrez les projets innovants de Vr-Ai, spécialisée dans le développement de solutions en réalité virtuelle et intelligence artificielle.",
  keywords: ["VR", "AI", "Réalité Virtuelle", "Intelligence Artificielle", "Portfolio", "Innovation"],
  authors: [{ name: "Vr-Ai" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950`}
      >
        <AnimatedBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
