"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { entranceDelay, onLoaderDone } from "@/lib/loaderGate";
import { CityClock } from "@/components/common/Bits";
import Magnetic from "@/components/motion/Magnetic";

const REEL = [
  "/images/buda_fashion_campaign.jpg",
  "/images/amigos_overseas_hero.jpg",
  "/images/ellie_junior_brand.jpg",
  "/images/manaaq_system_design.jpg",
  "/images/oopsies_brand.jpg",
];

/**
 * K72 home: centred uppercase punchline, an inline "monitor" capsule between
 * two words, the last word circled in lime, an indented intro paragraph,
 * two thick pill CTAs and the city clock. Hovering the monitor floods the
 * background with the current reel frame.
 */
export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [frame, setFrame] = useState(0);
  const [flood, setFlood] = useState(false);

  // Monitor slideshow.
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % REEL.length), 1400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let unsubscribe = () => {};
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { y: 0, yPercent: 110 });
      gsap.set("[data-hero-monitor]", { width: 0 });
      gsap.set("[data-hero-circle]", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 30 });
    }, root);

    unsubscribe = onLoaderDone(() => {
      ctx.add(() => {
        const tl = gsap.timeline({ delay: entranceDelay() });
        tl.to("[data-hero-line]", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.09 })
          .to("[data-hero-monitor]", { width: "2.15em", duration: 1.3, ease: "expo.inOut" }, 0.35)
          .to("[data-hero-circle]", { strokeDashoffset: 0, duration: 1.2, ease: "power3.inOut" }, 0.75)
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.08 }, 0.7);
      });
    });

    // Punchline drifts up and fades as you scroll away.
    ctx.add(() => {
      gsap.to("[data-hero-punch]", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => {
      unsubscribe();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="theme-dark relative flex min-h-[100svh] flex-col overflow-hidden pt-28">
      {/* Background reel — plays continuously without needing hover, exactly as shown in screenshot */}
      <div
        className="pointer-events-none absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-expo scale-100 opacity-45"
        aria-hidden="true"
      >
        {REEL.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ${i === frame ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <div className="gutter relative z-10 flex flex-1 flex-col">
        <h1
          data-hero-punch
          className="t-display mx-auto mt-[4vh] text-center text-[clamp(3.1rem,9.4vw,11.5rem)]"
          aria-label="Design people can't forget"
        >
          <span className="line-mask">
            <span data-hero-line className="line-inner">Design</span>
          </span>

          <span className="line-mask allow-overflow">
            <span className="flex items-center justify-center gap-[0.12em]">
              <span className="line-mask">
                <span data-hero-line className="line-inner">People</span>
              </span>
              <Link
                href="/work"
                data-hero-monitor
                data-cursor-label="See work"
                onMouseEnter={() => setFlood(true)}
                onMouseLeave={() => setFlood(false)}
                className="relative inline-block h-[0.74em] shrink-0 overflow-hidden rounded-full bg-neutral-900 align-middle"
                aria-label="See selected work"
              >
                {REEL.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="20vw"
                    priority={i === 0}
                    className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-expo ${
                      i === frame ? "scale-100 opacity-100" : "scale-125 opacity-0"
                    }`}
                  />
                ))}
              </Link>
              <span className="line-mask">
                <span data-hero-line className="line-inner">can&apos;t</span>
              </span>
            </span>
          </span>

          <span className="line-mask allow-overflow">
            <span data-hero-line className="line-inner">
              <mark className="relative inline-block bg-transparent px-[0.12em] text-inherit">
                <svg
                  className="pointer-events-none absolute -inset-x-[0.06em] -inset-y-[0.12em] h-[calc(100%+0.24em)] w-[calc(100%+0.12em)] overflow-visible text-lime"
                  viewBox="0 0 300 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    data-hero-circle
                    pathLength={1}
                    d="M150 4 C 240 4, 297 22, 297 50 C 297 80, 230 96, 150 96 C 66 96, 3 80, 3 50 C 3 22, 60 6, 140 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                Forget
              </mark>
            </span>
          </span>
        </h1>

        <div className="mt-auto grid grid-cols-12 items-end gap-y-8 pb-[var(--gutter)] pt-[6vh]">
          <div data-hero-fade className="order-3 col-span-12 md:order-1 md:col-span-3">
            <CityClock />
          </div>

          <div data-hero-fade className="order-2 col-span-12 flex justify-center gap-2 md:col-span-6">
            <Magnetic>
              <Link href="/work" className="btn btn-thick">
                Work
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/about" className="btn btn-thick">
                About
              </Link>
            </Magnetic>
          </div>

          <p data-hero-fade className="t-body indent-k72 order-1 col-span-12 text-white/90 md:order-3 md:col-span-3 md:text-[0.95rem] md:indent-[4rem]">
            Aaira Basit is a creative director who builds brands from every angle — identity, campaigns, reels and the
            systems that keep them sharp. Trained in psychology, she designs for memory, not for the feed.
          </p>
        </div>
      </div>
    </section>
  );
}
