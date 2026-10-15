"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Restrained cursor: a small dot that becomes a lime label pill over
 * elements with data-cursor-label (e.g. project cards → "See project").
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-label]");
      setLabel(t?.dataset.cursorLabel ?? "");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[9998]" aria-hidden="true">
      <div
        className={`flex items-center justify-center overflow-hidden rounded-full bg-lime text-black transition-all duration-500 ease-expo ${
          label ? "h-24 w-24 opacity-100" : "h-2.5 w-2.5 opacity-100"
        }`}
      >
        <span
          className={`t-label whitespace-nowrap text-center transition-opacity duration-300 ${label ? "opacity-100 delay-100" : "opacity-0"}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
