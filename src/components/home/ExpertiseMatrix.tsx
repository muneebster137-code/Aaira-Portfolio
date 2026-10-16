"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesData, ServicePillar } from "@/data/servicesData";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import { gsap } from "@/lib/gsap";

export default function ExpertiseMatrix() {
  const [hovered, setHovered] = useState<ServicePillar | null>(null);
  // Last hovered pillar stays rendered while the preview scales out.
  const [shown, setShown] = useState<ServicePillar | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const follow = useRef<{ x: (v: number) => void; y: (v: number) => void; r: (v: number) => void } | null>(null);
  const lastX = useRef(0);

  // Preview trails the cursor with a little lag and leans into the direction of travel.
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, rotate: 0 });
    follow.current = {
      x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
      r: gsap.quickTo(el, "rotate", { duration: 0.9, ease: "power3.out" }),
    };
  }, []);

  useEffect(() => {
    gsap.to(previewRef.current, {
      scale: hovered ? 1 : 0,
      duration: hovered ? 0.7 : 0.4,
      ease: hovered ? "back.out(1.8)" : "power3.in",
      overwrite: "auto",
    });
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current || !follow.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    follow.current.x(x + 170);
    follow.current.y(e.clientY - r.top);
    follow.current.r(gsap.utils.clamp(-12, 12, (x - lastX.current) * 0.6));
    lastX.current = x;
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="theme-dark gutter relative overflow-x-clip py-24 md:py-32 border-t border-white/15"
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
            onMouseEnter={() => {
              setHovered(item);
              setShown(item);
            }}
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
      <div
        ref={previewRef}
        className="rounded-media pointer-events-none absolute left-0 top-0 z-30 hidden h-48 w-72 shadow-2xl md:block"
        aria-hidden="true"
      >
        {shown && (
          <div className="relative h-full w-full bg-black">
            <Image
              src={shown.previewImage}
              alt=""
              fill
              sizes="288px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
              <span>{shown.title}</span>
              <span className="text-lime">{shown.tools[0]}</span>
            </div>
          </div>
        )}
      </div>

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
