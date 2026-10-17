"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import { ScrollTrigger } from "@/lib/gsap";
import { media } from "@/data/media";

interface BrandPanel {
  id: string;
  num: string;
  name: string;
  tagline: string;
  descriptor: string;
  category: string;
  role: string;
  scope: string;
  image: string;
  link: string;
}

export default function ManaaqAccordion() {
  const [activeBrandId, setActiveBrandId] = useState<string>("ellie-junior");

  const brands: BrandPanel[] = [
    {
      id: "manaaq",
      num: "01",
      name: "Manaaq Creative Studios",
      tagline: "The Parent Creative Studio",
      descriptor: "Minimalist corporate architecture, luxury brand guidelines, and multi-brand creative governance across every brand in the studio.",
      category: "Creative Direction & Brand Architecture",
      role: "Creative Director",
      scope: "Brand Identity · Guidelines · Pitch Decks · Production Oversight",
      image: media.home.brands.manaaq,
      link: "/work/manaaq-creatives",
    },
    {
      id: "ellie-junior",
      num: "02",
      name: "Ellie Junior",
      tagline: "Sustainable Toddler & Baby Lifestyle",
      descriptor: "Soft, trustworthy Scandinavian visuals engineered for parents scrolling high-velocity digital feeds.",
      category: "Infant Apparel & E-Commerce",
      role: "Creative Director",
      scope: "Social Campaigns · Editorial Lookbooks · Packaging · Reels",
      image: media.home.brands.ellieJunior,
      link: "/work/ellie-junior",
    },
    {
      id: "oopsies",
      num: "03",
      name: "Oopsies",
      tagline: "Vibrant Youth & Lifestyle Goods",
      descriptor: "Playful ceramic accessories, skincare packaging, and joyful stationery with a bold subcultural voice.",
      category: "Lifestyle Consumer Goods",
      role: "Creative Director",
      scope: "Packaging Design · Social Systems · Merchandising",
      image: media.home.brands.oopsies,
      link: "/work/oopsies",
    },
    {
      id: "nh-consultants",
      num: "04",
      name: "NH Consultants",
      tagline: "Global Academic Advisory",
      descriptor: "Clear, credible, authoritative visual design for students and families making major life decisions.",
      category: "Educational Consultancy",
      role: "Creative Director",
      scope: "Corporate Profiles · Presentation Decks · Social Media",
      image: media.home.brands.nhConsultants,
      link: "/work/nh-consultants",
    },
  ];

  return (
    <section className="theme-dark gutter relative py-32 border-t border-white/15">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Sticky Title & Strategy Statement */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col gap-6">
          <div className="t-label text-lime">
            03 / THE MANAAQ BRANDS [傘下企業]
          </div>

          <RevealLines
            as="h2"
            lines={["MANAAQ", "CREATIVE", "STUDIOS."]}
            className="t-section text-white font-medium tracking-tighter t-narrow"
          />

          <p className="t-body text-white/70 leading-relaxed">
            One creative studio. Three brands under it. I&apos;m the one creative lead behind all of them, handling visual identity, social media systems, packaging and day-to-day brand management.
          </p>

          <div className="rounded-2xl p-6 border border-white/15 text-xs flex flex-col gap-2">
            <span className="t-label text-lime">The Systems Advantage</span>
            <p className="text-white/60 leading-relaxed">
              I run all four brands on one production system: shared templates, type rules and asset libraries. That&apos;s how they launch campaigns at the same time and still look nothing alike.
            </p>
          </div>

          <div>
            <Magnetic>
              <Link href="/work/manaaq-creatives" className="btn btn-thick">
                Explore Hub (04)
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Architectural Accordion Panels */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-white/15 border-y border-white/15">
          {brands.map((b) => {
            const isOpen = activeBrandId === b.id;

            return (
              <div
                key={b.id}
                onClick={() => setActiveBrandId(isOpen ? "" : b.id)}
                className="group py-6 cursor-pointer transition-colors"
                data-cursor-label={isOpen ? "Close" : "Open"}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-lime font-bold">
                      {b.num}
                    </span>
                    <div>
                      <h3 className="t-row text-white group-hover:text-lime transition-colors">
                        {b.name}
                      </h3>
                      <span className="t-label text-white/50 block mt-1">
                        {b.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="h-10 w-10 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-lime group-hover:text-lime transition-colors">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </div>

                {/* Expanded Body — grid-rows trick gives a smooth height tween */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-expo ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  onTransitionEnd={(e) => e.propertyName === "grid-template-rows" && ScrollTrigger.refresh()}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pt-8 pb-4 flex flex-col gap-6">
                      <p className="t-body text-white/70 max-w-2xl">
                        {b.descriptor}
                      </p>

                      <div className="rounded-media relative aspect-[16/9] w-full bg-neutral-900">
                        <Image
                          src={b.image}
                          alt={b.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute bottom-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[11px] font-mono text-white/80">
                          {b.category}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-white/10 text-white/60">
                        <div>
                          <span className="text-white/40 block uppercase mb-1">Directorship Role:</span>
                          <span className="text-white">{b.role}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block uppercase mb-1">Scope of Execution:</span>
                          <span className="text-white">{b.scope}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={b.link}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-solid inline-flex items-center gap-2"
                        >
                          <span>Open Portfolio</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
