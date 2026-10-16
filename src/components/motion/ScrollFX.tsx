"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Amanation-style scroll motion, opted into with data attributes so pages keep
 * their K72 markup. Rendered after the page in app/template.tsx, so it runs once
 * the page has mounted and is torn down on every navigation.
 *
 * data-fx="sheet"  rounded panel that scales up and settles over the section before it
 * data-fx="rise"   media card that glides up into place with a soft de-zoom
 * data-fx="pop"    direct children bounce in one after another
 */
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {});

    // Page segments hydrate after this template effect; touching their inline
    // styles earlier causes hydration mismatches. The loader / page wipe still
    // covers the screen at this point, so the short wait is never visible.
    const id = window.setTimeout(() => ctx.add(() => {
      gsap.utils.toArray<HTMLElement>('[data-fx="sheet"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: small ? 0.94 : 0.9, y: small ? 40 : 80 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.8 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="rise"]').forEach((el) => {
        // Plays once with an eased settle, so it never wobbles while scrolling.
        gsap.from(el, {
          y: small ? 50 : 90,
          scale: 0.96,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="pop"]').forEach((el) => {
        gsap.from(el.children, {
          y: 70,
          scale: 0.96,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.6)",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      ScrollTrigger.refresh();
    }), 250);

    return () => {
      window.clearTimeout(id);
      ctx.revert();
    };
  }, []);

  return null;
}
