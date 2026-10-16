"use client";

import React from "react";
import Link from "next/link";
import RevealLines from "@/components/motion/RevealLines";
import RevealImage from "@/components/motion/RevealImage";
import ScrollWords from "@/components/motion/ScrollWords";
import Magnetic from "@/components/motion/Magnetic";

export default function PhilosophySection() {
  return (
    <section data-fx="sheet" className="fx-sheet theme-light gutter relative py-24 md:py-32">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Headline & Manifesto */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="t-label text-black/60">
            02 / AGENCY PHILOSOPHY [理念]
          </div>

          <RevealLines
            as="h2"
            lines={["Trained in", "Psychology.", "Executed in", "Design."]}
            outlineLines={[2]}
            className="t-section text-black font-medium tracking-tighter"
          />

          <ScrollWords
            text="I don't believe in graphic decoration that vanishes the moment a user scrolls past. When comfort zones get left behind and psychological behavioral triggers infuse visual systems, brands become impossible to forget. I structure cognitive load, balance institutional weight, and direct chromatic tension so that every identity converts attention into enduring authority."
            className="t-lead text-black/90 font-normal leading-relaxed"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-black/15 text-xs uppercase tracking-wider">
            <div>
              <span className="block text-black/40 mb-1">01 / Degree</span>
              <span className="font-semibold text-black">BSc Social Sciences</span>
              <span className="block text-black/60 lowercase tracking-normal">psychology at szabist</span>
            </div>
            <div>
              <span className="block text-black/40 mb-1">02 / Studio</span>
              <span className="font-semibold text-black">Islamabad, PK</span>
              <span className="block text-black/60 lowercase tracking-normal">remote worldwide</span>
            </div>
            <div>
              <span className="block text-black/40 mb-1">03 / Accreditations</span>
              <span className="font-semibold text-black">10+ Certifications</span>
              <span className="block text-black/60 lowercase tracking-normal">google, colorado, london</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Magnetic>
              <Link href="/about" className="btn btn-solid !bg-black !text-white !border-black">
                Agency Story & CV
              </Link>
            </Magnetic>
            <Link href="/contact" className="t-label u-draw text-black">
              Start an engagement →
            </Link>
          </div>
        </div>

        {/* Right Column: Editorial Portrait with RevealImage */}
        <div className="lg:col-span-5 w-full">
          <div data-fx="rise" className="rounded-media relative aspect-[3/4] w-full bg-neutral-200">
            <RevealImage
              src="/images/aaira_portrait.jpg"
              alt="Aaira Basit — Creative Director"
              className="h-full w-full"
              imgClassName="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-full px-5 py-3 bg-white/90 backdrop-blur-md flex items-center justify-between text-xs uppercase tracking-wider text-black">
              <span className="font-semibold">Aaira Basit</span>
              <span className="text-black/60 font-mono">Creative Director</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
