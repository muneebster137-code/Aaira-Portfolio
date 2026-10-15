"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markLoaderDone } from "@/lib/loaderGate";
import { useIslamabadClock } from "@/lib/useClock";

/**
 * K72 "c-loader": five black columns over the page, a progress monitor in the
 * middle, then the columns lift away one after another to reveal the site.
 * Full counter on first visit of the session, a quick wipe afterwards.
 */
export default function CinematicLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const seenRef = useRef<boolean | null>(null);
  const time = useIslamabadClock();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (seenRef.current === null) {
      seenRef.current = sessionStorage.getItem("ab_seen") === "1";
      sessionStorage.setItem("ab_seen", "1");
    }
    const seen = seenRef.current;

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setGone(true) });

      if (seen) {
        gsap.set("[data-loader-ui]", { autoAlpha: 0 });
      } else {
        tl.from("[data-loader-ui]", { yPercent: 120, duration: 1, stagger: 0.06, ease: "expo.out" })
          .to(counter, {
            v: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: () => setCount(Math.round(counter.v)),
          }, "<0.1")
          .to("[data-loader-fill]", { scaleX: 1, duration: 2.1, ease: "power2.inOut" }, "<")
          .to("[data-loader-ui]", { yPercent: -120, duration: 0.7, stagger: 0.04, ease: "expo.in" }, "+=0.15");
      }

      tl.add(() => markLoaderDone())
        .to("[data-loader-col]", {
          yPercent: -100,
          duration: 1.05,
          ease: "expo.inOut",
          stagger: 0.07,
        }, seen ? 0.05 : ">-0.05");
    }, root);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} data-loader-col className="h-full flex-1 bg-black" style={{ marginLeft: i ? -1 : 0 }} />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-[var(--gutter)] text-white">
        <div className="flex items-start justify-between overflow-hidden">
          <span data-loader-ui className="t-label block">Aaira Basit — Portfolio</span>
          <span data-loader-ui className="t-label block">©2026</span>
        </div>

        <div className="flex items-center justify-center overflow-hidden">
          <div data-loader-ui className="flex items-center gap-5">
            <div className="relative h-[clamp(2.5rem,6vw,5rem)] w-[clamp(9rem,26vw,22rem)] overflow-hidden rounded-full border-[3px] border-white">
              <div data-loader-fill className="absolute inset-0 origin-left scale-x-0 bg-lime" />
            </div>
            <span className="w-[3.2ch] text-right text-[clamp(2.5rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
              {count}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between overflow-hidden">
          <span data-loader-ui className="t-label block tabular-nums">ISLAMABAD_{time}</span>
          <span data-loader-ui className="t-label block">Brands people remember</span>
        </div>
      </div>
    </div>
  );
}
