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
  /** Indices of lines drawn as outlined type (Amanation "THE NEXT GENERATION"). */
  outlineLines?: number[];
  /**
   * "chars" (default): K72 line masks, but letters pop up one after another with
   * Amanation's springy overshoot. "lines": the plain K72 slide per line.
   */
  split?: "chars" | "lines";
}

/** Splits a string into nowrap words of inline-block letters, so wrapping still happens between words. */
function splitChars(text: string) {
  const words = text.split(" ");
  return words.map((word, wi) => (
    <React.Fragment key={wi}>
      <span className="char-word">
        {Array.from(word).map((ch, ci) => (
          <span key={ci} data-char className="char">
            {ch}
          </span>
        ))}
      </span>
      {wi < words.length - 1 ? " " : null}
    </React.Fragment>
  ));
}

/** K72 "c-text-lines" mixed with Amanation's bouncing letters. */
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
  outlineLines = [],
  split = "chars",
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const label = lines.every((l) => typeof l === "string") ? (lines as string[]).join(" ") : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>("[data-line-inner]");
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let unsubscribe = () => {};

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(inners, { yPercent: 0 });
        return;
      }
      gsap.set(inners, { y: 0, yPercent: 110 });
      if (chars.length) gsap.set(chars, { yPercent: 105, rotate: 9 });
    }, el);

    const play = (extra = 0) =>
      ctx.add(() => {
        if (reduced) return;
        const d = delay + extra;
        // K72: each line rises out of its mask.
        gsap.to(inners, { yPercent: 0, duration, ease: "expo.out", stagger, delay: d });
        // Amanation: letters follow with a springy, slightly rotated cascade.
        if (chars.length) {
          gsap.to(chars, {
            yPercent: 0,
            rotate: 0,
            duration: 0.95,
            ease: "back.out(1.9)",
            stagger: Math.min(0.028, 0.9 / chars.length),
            delay: d + 0.05,
          });
        }
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
  }, [trigger, delay, stagger, duration, start, split]);

  return (
    <Tag ref={ref} className={className} aria-label={label}>
      {lines.map((line, i) => {
        const chars = split === "chars" && typeof line === "string";
        return (
          <span
            key={i}
            aria-hidden={label ? true : undefined}
            className={`line-mask ${chars ? "is-chars" : ""} ${overflowLines.includes(i) ? "allow-overflow" : ""} ${lineClassName}`}
          >
            <span data-line-inner className={`line-inner ${outlineLines.includes(i) ? "t-outline" : ""}`}>
              {chars ? splitChars(line as string) : line}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
