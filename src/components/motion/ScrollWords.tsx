"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ScrollWordsProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrollWords({ text, className = "", as: Tag = "p" }: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} data-word className="inline-block whitespace-pre">
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
}
