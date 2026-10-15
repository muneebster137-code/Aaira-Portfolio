import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/common/CustomCursor";
import CinematicLoader from "@/components/common/CinematicLoader";
import Navbar from "@/components/common/Navbar";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aaira Basit — Creative Director & Visual Designer",
  description:
    "Creative Director & Visual Designer building brands, campaigns and visual systems that people remember. Brand identity, print, social reels and AI-assisted creative. Based in Islamabad.",
  openGraph: {
    title: "Aaira Basit — Creative Director & Visual Designer",
    description: "Design people can't forget. Brand identity, campaigns, reels and visual systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden bg-black text-white">
        <SmoothScrollProvider>
          <CinematicLoader />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
