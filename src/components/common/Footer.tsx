"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { CityClock, SocialPills, Wordmark } from "@/components/common/Bits";
import RevealLines from "@/components/motion/RevealLines";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="theme-dark gutter relative pt-32 pb-16 border-t border-white/15 select-none">
      <div className="flex flex-col gap-20">
        {/* Top Punchline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-16 border-b border-white/15">
          <div className="max-w-3xl">
            <RevealLines
              as="h2"
              lines={["TODAY,", "TOMORROW,", "YEARS FROM NOW."]}
              className="t-section text-white font-medium tracking-tighter"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="mailto:aaira.basit80@gmail.com"
              className="t-lead u-draw text-lime font-mono"
            >
              aaira.basit80@gmail.com
            </a>
          </div>
        </div>

        {/* Navigation & Clocks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 text-xs uppercase tracking-wider">
          <div className="col-span-2 md:col-span-3 flex flex-col gap-4">
            <Wordmark />
            <p className="text-white/40 normal-case leading-relaxed font-light text-xs max-w-xs mt-2">
              Creative Director & Visual Designer building brands people can&apos;t forget.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 flex flex-col gap-3">
            <span className="text-white/40 mb-1">Index</span>
            <Link href="/work" className="text-white/80 hover:text-lime transition-colors">Work (04)</Link>
            <Link href="/about" className="text-white/80 hover:text-lime transition-colors">About</Link>
            <Link href="/services" className="text-white/80 hover:text-lime transition-colors">Services</Link>
            <Link href="/contact" className="text-white/80 hover:text-lime transition-colors">Contact</Link>
          </div>

          <div className="col-span-1 md:col-span-3 flex flex-col gap-3">
            <span className="text-white/40 mb-1">Socials</span>
            <SocialPills />
          </div>

          <div className="col-span-2 md:col-span-3 flex flex-col justify-between items-start md:items-end gap-6">
            <CityClock />
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="btn btn-solid flex items-center gap-2 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Giant Cropped Monumental Wordmark */}
        <div className="overflow-hidden pointer-events-none select-none border-t border-white/10 pt-12">
          <div className="t-display text-[20vw] leading-[0.75] font-semibold tracking-[-0.07em] text-white/[0.04] text-center">
            AAIRA<span className="text-lime/20">.</span>
          </div>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40 border-t border-white/10 pt-6">
          <span>©2026 Aaira Basit. All Rights Reserved.</span>
          <span>Islamabad · Tokyo · Budapest</span>
        </div>
      </div>
    </footer>
  );
}
