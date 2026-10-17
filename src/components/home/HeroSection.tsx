"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { entranceDelay, onLoaderDone } from "@/lib/loaderGate";
import Magnetic from "@/components/motion/Magnetic";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { media } from "@/data/media";

const REEL = media.home.heroReel;

/**
 * Home hero, kept deliberately quiet: one still full-bleed photo (darkened), a
 * centred uppercase punchline with the inline "monitor" pill, then an editorial
 * footer row with the intro on the left and a single call to action on the right.
 */
export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [frame, setFrame] = useState(0);
  const { scrollTo } = useSmoothScroll();

  // Monitor slideshow: slow enough to read each frame.
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % REEL.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let unsubscribe = () => {};
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { y: 0, yPercent: 110 });
      gsap.set("[data-hero-monitor]", { width: 0 });
      gsap.set("[data-hero-rule]", { scaleX: 0 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-hero-bg]", { scale: 1.12 });
    }, root);

    unsubscribe = onLoaderDone(() => {
      ctx.add(() => {
        // Final pill width lives in CSS (.hero-pill); animate to it, then hand back.
        const pillWidth = window.matchMedia("(min-width: 1024px)").matches ? "2.15em" : "1.6em";
        const tl = gsap.timeline({ delay: entranceDelay() });
        tl.to("[data-hero-bg]", { scale: 1, duration: 2.6, ease: "expo.out" }, 0)
          .to("[data-hero-line]", { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.09 }, 0)
          .to("[data-hero-monitor]", { width: pillWidth, duration: 1.2, ease: "back.out(1.7)", clearProps: "width" }, 0.55)
          .to("[data-hero-rule]", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.6)
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.08 }, 0.8);
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
      {/* One still background photo, darkened so the type always reads */}
      <div data-hero-bg className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
        <Image
          src={media.home.heroBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85"
        aria-hidden="true"
      />

      <div className="gutter relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center py-[6vh]">
          <h1
            data-hero-punch
            className="t-display t-hero text-center"
            aria-label="Design people can't forget"
          >
            <span className="line-mask">
              <span data-hero-line className="line-inner">Design</span>
            </span>

            <span className="line-mask allow-overflow">
              {/* Phones & tablets: "People" gets its own line so the type can stay big */}
              <span className="flex flex-wrap items-center justify-center gap-x-[0.12em] lg:flex-nowrap">
                <span className="line-mask basis-full lg:basis-auto">
                  <span data-hero-line className="line-inner">People</span>
                </span>
                <Link
                  href="/work"
                  data-hero-monitor
                  data-cursor-label="See work"
                  className="hero-pill relative inline-block h-[0.74em] shrink-0 overflow-hidden rounded-full bg-neutral-900 align-middle"
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

            <span className="line-mask">
              <span data-hero-line className="line-inner">Forget</span>
            </span>
          </h1>
        </div>

        {/* Editorial footer row: intro on the left, one call to action on the right */}
        <div className="pb-[var(--gutter)]">
          <div data-hero-rule className="h-px w-full origin-left bg-white/25" aria-hidden="true" />
          <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-8">
            <p
              data-hero-fade
              className="max-w-[38ch] text-[clamp(1.0625rem,1.45vw,1.375rem)] font-normal leading-[1.4] tracking-[-0.01em] text-white/85"
            >
              I&apos;m Aaira Basit, a Creative Director who builds brands from every angle: identity, campaigns, reels and
              the systems that keep them sharp. Trained in psychology, I design for memory, not for the feed.
            </p>

            <div data-hero-fade className="shrink-0">
              <Magnetic className="w-full md:w-auto">
                <a
                  href="#selected-work"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#selected-work");
                  }}
                  className="btn btn-thick w-full justify-center md:w-auto"
                >
                  See my work
                  <ArrowDownRight className="h-[0.75em] w-[0.75em]" strokeWidth={2.5} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
