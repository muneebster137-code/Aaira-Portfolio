"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { CityClock, SocialPills, Wordmark } from "@/components/common/Bits";
import { projects } from "@/data/projectsData";
import { media } from "@/data/media";

const NAV = [
  {
    num: "01",
    label: "Work",
    href: "/work",
    tagline: "Brands I've built",
    count: `0${projects.length}`,
    image: media.menu.work,
  },
  {
    num: "02",
    label: "About",
    href: "/about",
    tagline: "Who I am & how I think",
    count: "SZABIST",
    image: media.menu.about,
  },
  {
    num: "03",
    label: "Services",
    href: "/services",
    tagline: "What I can do for you",
    count: "09 Pillars",
    image: media.menu.services,
  },
  {
    num: "04",
    label: "Contact",
    href: "/contact",
    tagline: "Tell me about your project",
    count: "Open",
    image: media.menu.contact,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { lenis } = useSmoothScroll();

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    if (!lenis) return;
    return lenis.on("scroll", (l: { scroll: number; direction: number }) => {
      if (l.scroll < 120) setHidden(false);
      else if (l.direction === 1) setHidden(true);
      else if (l.direction === -1) setHidden(false);
    });
  }, [lenis]);

  // Handle open / close animation smoothly with GSAP
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    if (open) {
      lenis?.stop();
      gsap.killTweensOf([curtain, "[data-menu-item]", "[data-menu-fade]"]);
      gsap.set(curtain, { display: "flex", autoAlpha: 1 });

      const tl = gsap.timeline();
      tl.fromTo(
        curtain,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power4.inOut" }
      )
        .fromTo(
          "[data-menu-item]",
          { y: 60, rotate: 2, opacity: 0 },
          { y: 0, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.6)", stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(
          "[data-menu-fade]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.05 },
          "-=0.4"
        );
    } else {
      lenis?.start();
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(curtain, { display: "none", autoAlpha: 0 });
        },
      });

      tl.to("[data-menu-item]", {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.03,
      })
        .to("[data-menu-fade]", { opacity: 0, duration: 0.2 }, 0)
        .to(
          curtain,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "power4.inOut" },
          "-=0.1"
        );
    }
  }, [open, lenis]);

  // Close when pathname changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape key handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const quick = (href: string, label: string) => (
    <Link
      href={href}
      className={`group btn btn-solid !border-black !text-[0.8125rem] ${
        pathname === href || (href !== "/" && pathname.startsWith(href))
          ? "!bg-lime !text-black !border-lime"
          : ""
      }`}
    >
      <span className="roll">
        <span className="roll-front">{label}</span>
        <span className="roll-back">{label}</span>
      </span>
    </Link>
  );

  return (
    <>
      {/* Persistent Floating Navbar Header */}
      <header
        className={`fixed inset-x-0 top-0 z-[80] flex items-start justify-between p-[var(--gutter)] transition-transform duration-700 ease-expo ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="text-white mix-blend-difference">
          <Wordmark />
        </div>

        <nav className="flex items-center gap-2" aria-label="Quick navigation">
          <div className="hidden items-center gap-2 sm:flex">
            {quick("/work", `Work (${String(projects.length).padStart(2, "0")})`)}
            {quick("/about", "About")}
          </div>

          <button
            type="button"
            id="menu-toggle"
            onClick={() => setOpen(true)}
            className="group btn btn-solid !border-black"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span className="roll">
              <span className="roll-front">Menu</span>
              <span className="roll-back">Menu</span>
            </span>
            <span className="flex flex-col gap-[3.5px] ml-1" aria-hidden="true">
              <span className="block h-[1.5px] w-4 bg-current" />
              <span className="block h-[1.5px] w-4 bg-current" />
            </span>
          </button>
        </nav>
      </header>

      {/* Fullscreen Silky Dropdown Menu Veil */}
      <div
        ref={curtainRef}
        id="site-menu"
        className="fixed inset-0 z-[95] hidden flex-col justify-between bg-[#060606] text-white p-[var(--gutter)] overflow-hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* Top Header Row Inside Menu */}
        <div className="flex items-start justify-between w-full">
          <div data-menu-fade>
            <Wordmark />
          </div>

          <div data-menu-fade className="t-label hidden md:flex items-center gap-3 text-white/50">
            <span>ISLAMABAD · GLOBAL REMOTE</span>
            <span>✺</span>
            <span className="text-lime">CREATIVE DIRECTOR</span>
          </div>

          <button
            data-menu-fade
            type="button"
            onClick={() => setOpen(false)}
            className="group btn !border-white/20 !px-4 hover:!border-lime"
            aria-label="Close menu"
          >
            <span className="t-label">Close</span>
            <X className="w-4 h-4 ml-1 text-white group-hover:text-lime transition-colors" />
          </button>
        </div>

        {/* Center Navigation List */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
          <ul className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {NAV.map((item, idx) => (
              <li
                key={item.href}
                data-menu-item
                className="group relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 sm:py-7 transition-all duration-300 group-hover:px-4"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs sm:text-sm text-lime font-bold">
                      {item.num}
                    </span>
                    <span className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter uppercase text-white group-hover:text-lime transition-colors">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline-block t-label text-white/40 group-hover:text-white/80 transition-colors">
                      {item.tagline}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-lime group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Floating Image Preview on Hover */}
          <div className="hidden lg:block lg:col-span-4" data-menu-fade>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/15 bg-white/[0.03]">
              {NAV.map((item, idx) => (
                <div
                  key={item.href}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    hoveredIdx === idx
                      ? "opacity-100 scale-100"
                      : hoveredIdx === null && idx === 0
                      ? "opacity-40 scale-100"
                      : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="t-label text-lime font-mono">{item.tagline}</span>
                    <span className="t-label text-white/60 font-mono">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Status Bar Inside Menu */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10 w-full">
          <div data-menu-fade>
            <CityClock />
          </div>

          <a
            data-menu-fade
            href="mailto:aaira.basit80@gmail.com"
            className="t-label text-white/70 hover:text-lime transition-colors self-start sm:self-auto font-mono"
          >
            aaira.basit80@gmail.com
          </a>

          <div data-menu-fade>
            <SocialPills />
          </div>
        </div>
      </div>
    </>
  );
}
