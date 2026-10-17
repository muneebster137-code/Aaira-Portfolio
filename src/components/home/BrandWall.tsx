"use client";

import React, { useState } from "react";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import RevealLines from "@/components/motion/RevealLines";

interface BrandItem {
  name: string;
  category: string;
  market: string;
}

export default function BrandWall() {
  const [hoveredBrand, setHoveredBrand] = useState<BrandItem | null>(null);

  const row1: BrandItem[] = [
    { name: "AMIGOS OVERSEAS", category: "Global Higher Education & Visa Consultancy", market: "Worldwide" },
    { name: "BUDA FASHION", category: "High-Fashion Streetwear & Runway Brand", market: "Budapest, Hungary" },
    { name: "MANAAQ CREATIVE STUDIOS", category: "Multi-Brand Creative Studio", market: "Hybrid" },
    { name: "ELLIE JUNIOR", category: "Sustainable Scandinavian Toddler Apparel", market: "Global E-Commerce" },
  ];

  const row2: BrandItem[] = [
    { name: "OOPSIES", category: "Vibrant Youth Lifestyle Goods & Ceramics", market: "Consumer Goods" },
    { name: "NH CONSULTANTS", category: "Overseas Student Migration Advisory", market: "South Asia / UK" },
    { name: "ANEBOS STUDIOS", category: "Boutique Design & Strategy Agency", market: "Creative Services" },
    { name: "SZABIST INCUBATOR", category: "Startup Acceleration & Event Branding", market: "Islamabad" },
  ];

  return (
    <section className="theme-dark gutter relative py-32 border-t border-white/15 overflow-hidden select-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/15">
        <div>
          <div className="t-label text-lime mb-3">
            04 / MARQUES & CLIENTS [実績企業]
          </div>
          <RevealLines
            as="h2"
            lines={["CLIENTS &", "COLLABORATORS."]}
            className="t-section text-white font-medium tracking-tighter"
          />
        </div>
        <p className="t-label text-white/50">
          Scroll speed drives velocity · Hover to inspect details
        </p>
      </div>

      {/* Marquee Rows with Opposing Directions */}
      <div className="py-12 flex flex-col gap-6">
        <VelocityMarquee speed={75} className="py-2">
          <div className="flex items-center gap-12 pr-12">
            {row1.map((b) => (
              <button
                key={b.name}
                type="button"
                onMouseEnter={() => setHoveredBrand(b)}
                onMouseLeave={() => setHoveredBrand(null)}
                className="t-section text-white/30 hover:text-lime transition-colors duration-300 whitespace-nowrap cursor-pointer flex items-center gap-12"
              >
                <span>{b.name}</span>
                <span className="text-xl text-white/20">✺</span>
              </button>
            ))}
          </div>
        </VelocityMarquee>

        <VelocityMarquee speed={75} reverse={true} className="py-2">
          <div className="flex items-center gap-12 pr-12">
            {row2.map((b) => (
              <button
                key={b.name}
                type="button"
                onMouseEnter={() => setHoveredBrand(b)}
                onMouseLeave={() => setHoveredBrand(null)}
                className="t-section text-white/30 hover:text-lime transition-colors duration-300 whitespace-nowrap cursor-pointer flex items-center gap-12"
              >
                <span>{b.name}</span>
                <span className="text-xl text-white/20">✺</span>
              </button>
            ))}
          </div>
        </VelocityMarquee>
      </div>

      {/* Live Hover Info Strip */}
      <div className="mt-8 h-16 flex items-center justify-between px-6 border border-white/15 text-xs font-mono">
        {hoveredBrand ? (
          <div className="flex items-center justify-between w-full animate-in fade-in duration-200">
            <span className="text-lime font-bold uppercase tracking-wider">
              {hoveredBrand.name}
            </span>
            <span className="text-white/80">
              {hoveredBrand.category}
            </span>
            <span className="text-white/40 hidden sm:inline">
              {hoveredBrand.market}
            </span>
          </div>
        ) : (
          <div className="text-white/40 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            Hover any client marquee above to inspect industry jurisdiction and scope.
          </div>
        )}
      </div>
    </section>
  );
}
