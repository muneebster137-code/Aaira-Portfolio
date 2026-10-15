"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesData, ServicePillar } from "@/data/servicesData";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";

export default function ExpertiseMatrix() {
  const [hovered, setHovered] = useState<ServicePillar | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="theme-dark gutter relative py-32 border-t border-white/15"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/15">
        <div>
          <div className="t-label text-lime mb-3">
            05 / CAPABILITIES & DISCIPLINES [専門分野]
          </div>
          <RevealLines
            as="h2"
            lines={["NINE DISCIPLINES.", "ZERO FLUFF."]}
            className="t-section text-white font-medium tracking-tighter"
          />
        </div>
        <p className="t-body max-w-md text-white/60">
          From brand systems and key visuals to 9:16 playable motion reels, AI creative workflows, and high-velocity social templates.
        </p>
      </div>

      {/* 9 Rows */}
      <div className="divide-y divide-white/15 border-b border-white/15">
        {servicesData.map((item) => (
          <div
            key={item.number}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            className="group relative py-8 transition-colors hover:bg-white/[0.02]"
            data-cursor-label="Details"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-baseline gap-6 transition-transform duration-500 ease-expo group-hover:translate-x-3">
                <span className="font-mono text-xs text-lime font-bold">
                  {item.number}
                </span>
                <h3 className="t-row text-white/90 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-6 md:text-right">
                <p className="t-body text-sm md:text-base text-white/50 group-hover:text-white/80 max-w-md transition-colors font-light">
                  {item.tagline}
                </p>
                <div className="h-10 w-10 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:border-lime group-hover:text-lime transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor Image Preview (Desktop Only) */}
      {hovered && (
        <div
          className="pointer-events-none absolute hidden md:block z-30 w-72 h-44 overflow-hidden border border-white/20 shadow-2xl transition-transform duration-150 ease-out"
          style={{
            left: `${pos.x + 24}px`,
            top: `${pos.y - 88}px`,
          }}
        >
          <div className="relative h-full w-full bg-black">
            <Image
              src={hovered.previewImage}
              alt={hovered.title}
              fill
              sizes="288px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
              <span>{hovered.title}</span>
              <span className="text-lime">{hovered.tools[0]}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Menu Link */}
      <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="t-label text-white/50">
          Available for ongoing retainer directorships and focused sprint packages.
        </span>
        <Magnetic>
          <Link href="/services" className="btn btn-thick">
            Services Menu (09)
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
