"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isLoaderDone } from "@/lib/loaderGate";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import ScrollFX from "@/components/motion/ScrollFX";

/**
 * Remounts on every navigation (Next.js template semantics). On client
 * navigations the five K72 columns start covering the new page and lift
 * away in sequence; on the very first load the intro loader handles it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenis?.scrollTo(0, { immediate: true, force: true });

    const el = ref.current;
    if (!el) return;
    const cols = el.querySelectorAll("[data-wipe-col]");
    const ctx = gsap.context(() => {
      if (!isLoaderDone()) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.fromTo(
        cols,
        { yPercent: 0 },
        {
          yPercent: -100,
          duration: 0.95,
          ease: "expo.inOut",
          stagger: 0.06,
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
          },
        }
      );
    }, el);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={ref} className="pointer-events-none fixed inset-0 z-[85] flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} data-wipe-col className="h-full flex-1 bg-black" style={{ marginLeft: i ? -1 : 0 }} />
        ))}
      </div>
      {children}
      <ScrollFX />
    </>
  );
}
