"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface VelocityMarqueeProps {
  children: React.ReactNode;
  /** Base speed in px/second. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/** Infinite marquee that accelerates with scroll velocity and flips with scroll direction. */
export default function VelocityMarquee({ children, speed = 70, reverse = false, className = "" }: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let dir = reverse ? 1 : -1;
    let boost = 0;
    const setX = gsap.quickSetter(track, "x", "px");

    const unsubscribe = lenis
      ? lenis.on("scroll", (l: { velocity: number; direction: number }) => {
          boost = Math.min(Math.abs(l.velocity) * 0.35, 9);
          if (l.direction !== 0) dir = (l.direction === 1 ? -1 : 1) * (reverse ? -1 : 1);
        })
      : () => {};

    const tick = (_time: number, deltaTime: number) => {
      const half = track.scrollWidth / 2;
      if (!half) return;
      x += dir * speed * (1 + boost) * (deltaTime / 1000);
      boost *= 0.94;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      setX(x);
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      unsubscribe();
    };
  }, [lenis, speed, reverse]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
