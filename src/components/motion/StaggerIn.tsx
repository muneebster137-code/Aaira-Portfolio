"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Fades + lifts direct children with a stagger when the group enters the viewport. */
export default function StaggerIn({
  children,
  className = "",
  y = 60,
  stagger = 0.08,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        y,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Horizontal rule that draws itself from left to right on scroll. */
export function DrawRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 95%", once: true } }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={`h-px w-full origin-left bg-[var(--line)] ${className}`} />;
}
