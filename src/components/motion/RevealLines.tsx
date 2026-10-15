"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { entranceDelay, onLoaderDone } from "@/lib/loaderGate";

interface RevealLinesProps {
  lines: React.ReactNode[];
  as?: React.ElementType;
  className?: string;
  lineClassName?: string;
  /** "load" waits for the loader/page wipe, "scroll" waits for the viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  /** Indices of lines that must not clip (e.g. lines with inline media). */
  overflowLines?: number[];
}

/** K72 "c-text-lines": each line slides up out of its own mask. */
export default function RevealLines({
  lines,
  as: Tag = "div",
  className = "",
  lineClassName = "",
  trigger = "scroll",
  delay = 0,
  stagger = 0.075,
  duration = 1.25,
  start = "top 88%",
  overflowLines = [],
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>("[data-line-inner]");
    let unsubscribe = () => {};

    const ctx = gsap.context(() => {
      gsap.set(inners, { y: 0, yPercent: 110 });
    }, el);

    const play = (extra = 0) =>
      ctx.add(() => {
        gsap.to(inners, {
          yPercent: 0,
          duration,
          ease: "expo.out",
          stagger,
          delay: delay + extra,
        });
      });

    if (trigger === "load") {
      unsubscribe = onLoaderDone(() => play(entranceDelay()));
    } else {
      ctx.add(() => {
        ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => play() });
      });
    }

    return () => {
      unsubscribe();
      ctx.revert();
    };
  }, [trigger, delay, stagger, duration, start]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`line-mask ${overflowLines.includes(i) ? "allow-overflow" : ""} ${lineClassName}`}
        >
          <span data-line-inner className="line-inner">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
